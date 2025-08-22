const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const generateInvoicePDF = require("../utils/generateInvoicePDF");
const sendEmailWithAttachment = require("../utils/sendEmailWithAttachment");
const nodemailer = require("nodemailer");
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilio = require('twilio');
const client = twilio(accountSID, authToken)

exports.createBooking = async (req, res) => {
  try {
    const {
      userFirstName,
      userLastName,
      userEmail,
      userPhone,
      hotel,
      room,
      checkInDate,
      checkOutDate,
      totalGuests
    } = req.body;

    // Basic validation
    if (!userFirstName || !userLastName || !userEmail || !userPhone || !hotel || !room || !checkInDate || !checkOutDate || !totalGuests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn >= checkOut) {
      return res.status(400).json({ error: 'Check-out date must be after check-in date' });
    }

    const numberOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    // Validate hotel and room
    const hotelDoc = await Hotel.findById(hotel);
    const roomDoc = await Room.findById(room);

    if (!hotelDoc || !roomDoc) {
      return res.status(404).json({ error: 'Hotel or Room not found' });
    }

    if (String(roomDoc.hotel) !== String(hotelDoc._id)) {
      return res.status(400).json({ error: 'Room does not belong to the selected hotel' });
    }

    if (totalGuests > roomDoc.maxOccupancy) {
      return res.status(400).json({ error: `Max occupancy is ${roomDoc.maxOccupancy}` });
    }

    // (Optional) Check availability by overlapping dates
    const overlappingBookings = await Booking.find({
      room,
      $or: [
        {
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gt: checkIn }
        }
      ]
    });

    if (overlappingBookings.length >= roomDoc.count) {
      return res.status(400).json({ error: 'No available rooms for selected dates' });
    }

    const totalAmount = roomDoc.pricePerNight * numberOfNights;

    // Create booking
    const newBooking = new Booking({
      userFirstName,
      userLastName,
      userEmail,
      userPhone,
      hotel,
      room,
      checkInDate,
      checkOutDate,
      totalGuests,
      totalAmount,
      paymentStatus: 'pending',
      bookingStatus: 'booked'
    });

    await newBooking.save();

    res.status(201).json({
      message: 'Booking successful',
      booking: newBooking
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.confirmBooking = async (req, res) => {
  const { guestDetails, bookingDetails, payment_id } = req.body;
   try {
    // 1. Generate PDF
    const pdfBuffer = await generateInvoicePDF(guestDetails, bookingDetails);
    // console.log("Guest Details: ",guestDetails);
    // 2. Send Email with invoice PDF attached
    await sendEmailWithAttachment({
      to: guestDetails.email,
      subject: "Hiltop Stays - Hotel Booking Invoice - ",
      text: `Dear ${guestDetails.firstName} ${guestDetails.lastName}
      Thank you for booking hotel with Hiltop Stay. \n
      Hotel Booking Details For ${bookingDetails.nights} Nights. :
      Hotel Name: ${bookingDetails.hotelName}
      Address: ${bookingDetails.address}
      Check-In: ${bookingDetails.checkInDate}
      Check-Out: ${bookingDetails.checkOutDate}
      Amount Paid: ₹ ${bookingDetails.amountPaid}
      Remaining Amount : ₹ ${bookingDetails.remainingPrice} `,
      attachment: {
        filename: `Invoice-${bookingDetails.hotelName}.pdf`,
        content: pdfBuffer,
      },
    });


    const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465, // or your provider
        secure: true,
        auth: {
          user: 'no-reply@hiltopstay.com',  //process.env.EMAIL_USER, // example: yourname@gmail.com
          pass: 'Retro#Miss@2025'//process.env.EMAIL_PASS, // App password
        },
      });
    
      const mailOptions = {
        from: `"Hiltop Stays" <no-reply@hiltopstay.com>`,
        to: 'hiltopstay@gmail.com',
        subject: `Hotel Bookings - ${bookingDetails.hotelName}`,
        text: `Hotel Booking for the hotel - ${bookingDetails.hotelName}
              Check-In: ${bookingDetails.checkInDate}
              Check-Out: ${bookingDetails.checkOutDate}
              Customer Details:
              Customer Name: ${guestDetails.firstName} ${guestDetails.lastName}
              Customer Contact No.: ${guestDetails.phone}
              Amount Paid:  ₹ ${bookingDetails.amountPaid}
              Remaining Amount : ₹ ${bookingDetails.remainingPrice}`,
       
      };
    
      await transporter.sendMail(mailOptions);

    
    // client.messages.create({
    //   body: `Dear ${guestDetails.firstName} ${guestDetails.lastName}
    //         Thank you for booking hotel with Hiltop Stay. \n
    //         Hotel Booking Details For ${bookingDetails.nights} Nights. :
    //         Hotel Name: ${bookingDetails.hotelName}
    //         Address: ${bookingDetails.address}
    //         Check-In: ${bookingDetails.checkInDate}
    //         Check-Out: ${bookingDetails.checkOutDate}
    //         Amount Paid: ₹ ${bookingDetails.amountPaid}
    //         Remaining Amount : ₹ ${bookingDetails.remainingPrice} `,
    //   from: 'whatsapp:+14155238886',
    //   to: 'whatsapp:'+req.body.to
    // }).then(message => console.log("Message Sent Successfully"));

    
    

    // 3. Optionally send SMS via Twilio or similar (optional)
    // await sendSMS(guestDetails.phone, "Thank you for booking with Hiltop Stays. Invoice sent to email.");

    res.status(200).json({ message: "Invoice sent successfully" });
  } catch (err) {
      console.error("Error sending invoice:", err); // Already present
      return res.status(500).json({
        message: "Failed to send invoice",
        error: err.message || "Unknown error"
      });
    }
}