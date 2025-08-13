const Hotel = require("../models/Hotel");
const Room = require('../models/Room');
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const twilio = require('twilio');
const fs = require("fs");
const storage = multer.memoryStorage();
const streamifier = require("streamifier");
// Upload Middleware
const upload = multer({ storage: storage });
//  const upload = multer({ dest: "uploads/" });

// exports.uploadMiddleware = upload.single("image");
exports.uploadMiddleware = upload.array("images", 100);

// Add New Hotel
exports.createHotel = async (req, res) => {
  // try {
    // const imageUrls = [];

    // for (let file of req.files) {
    //   const streamUpload = (fileBuffer) => {
    //     return new Promise((resolve, reject) => {
    //       const stream = cloudinary.uploader.upload_stream(
    //         { folder: "Hiltop_Stays" },
    //         (error, result) => {
    //           if (result) {
    //             resolve(result);
    //           } else {
    //             reject(error);
    //           }
    //         }
    //       );
    //       streamifier.createReadStream(fileBuffer).pipe(stream);
    //     });
    //   };

    //   const result = await streamUpload(file.buffer);
    //   imageUrls.push(result.secure_url);
    // }

    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "Hiltop_Stays" },
          (error, result) => {
            if (result) resolve(result.secure_url);
            else reject(error);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    });

    const imageUrls = await Promise.all(uploadPromises);
    // console.log(req.body);
    // console.log("description:", req.body.description);
    // console.log("hotelRule:", req.body.hotelRule);
    // console.log("amenities:", req.body.amenities);
    // console.log("availableDates:", req.body.availableDates);
    const hotel = new Hotel({
      hotelName: req.body.hotelName,
      title: req.body.title,
      description: JSON.parse(req.body.description),
      hotelRule: JSON.parse(req.body.hotelRule),
      address: req.body.address,
      contact: req.body.contact,
      owner: req.body.owner,
      ownerContact: req.body.ownerContact,
      city: req.body.city,
      location: req.body.location,
      distance: req.body.distance,
      images: imageUrls,
      amenities: JSON.parse(req.body.amenities),
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      rating: req.body.rating,
      hotelType: req.body.hotelType,
      isEntireProperty: req.body.isEntireProperty === 'true',
      availableDates: JSON.parse(req.body.availableDates),
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      maxAdults: parseInt(req.body.maxAdults),
      entirePropertyBasePrice: parseInt(req.body.entirePropertyBasePrice),
      entirePropertyPrice: parseInt(req.body.entirePropertyPrice),
      // bookedDates: JSON.parse(req.body.availableDates),
    });

    await hotel.save();
    res.status(201).json(hotel);

  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
};

// Get All Hotels With Room with Search Filters.
exports.getAllHotels = async (req, res) => {
  try {
    const {
      destination = '',
      startDate,
      endDate,
      adult,
    } = req.query;

    // 1. Build dynamic filter
    const filter = {};

    // Destination-based search
    if (destination) {
      filter.$or = [
        { hotelName: { $regex: destination, $options: 'i' } },
        { location: { $regex: destination, $options: 'i' } },
        { city: { $regex: destination, $options: 'i' } }
      ];
    }

    // Max adults filter
    if (adult) {
      filter.maxAdults = { $gte: parseInt(adult) };
    }

    // Date range filtering (for availableDates array)
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Looser overlap check
      filter.availableDates = {
        $elemMatch: {
          from: { $lte: end },
          to: { $gte: start }
        }
      };
    }
    console.log("Filter used:", JSON.stringify(filter, null, 2));

    // 2. Find hotels
    const hotels = await Hotel.find(filter);
    console.log("hotels: ",hotels);
    const hotelIds = hotels.map(h => h._id);

    // 3. Join rooms
    const rooms = await Room.find({ hotel: { $in: hotelIds } });

    const hotelsWithRooms = hotels.map(hotel => {
      return {
        ...hotel._doc,
        rooms: rooms.filter(room => room.hotel.toString() === hotel._id.toString())
      };
    });

    res.json(hotelsWithRooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Get All Hotels With Room
exports.getHotels = async (req, res) => {
  try{
    const { location } = req.query;
    const filter = location ? { location } : {};
    const hotels = await Hotel.find(filter);
    const hotelIds = hotels.map(h => h._id);
    // res.json(hotels);
    // 3. Join rooms
    const rooms = await Room.find({ hotel: { $in: hotelIds } });

    const hotelsWithRooms = hotels.map(hotel => {
      return {
        ...hotel._doc,
        rooms: rooms.filter(room => room.hotel.toString() === hotel._id.toString())
      };
    });
    res.json(hotelsWithRooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
};

// Get Hotel By Id
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const rooms = await Room.find({ hotel: hotel._id });

    const hotelWithRooms = {
      ...hotel._doc,
      rooms: rooms,
    };

    res.json(hotelWithRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Hotel
exports.updateHotel = async (req, res) => {
  const { id } = req.params;

  // 🛡️ Safety check
  if (!req.body) {
    return res.status(400).json({ error: "No data received in request body." });
  }

  // 🛡️ Safe JSON parsing
  if (req.body.amenities && typeof req.body.amenities === 'string') {
    try {
      req.body.amenities = JSON.parse(req.body.amenities);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid amenities format' });
    }
  }

  if (req.body.roomsType && typeof req.body.roomsType === 'string') {
    try {
      req.body.roomsType = JSON.parse(req.body.roomsType);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid roomsType format' });
    }
  }

  if (req.body.description && typeof req.body.description === 'string') {
    try {
      req.body.description = JSON.parse(req.body.description);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid description format' });
    }
  }

  // Update hotel
  const updated = await Hotel.findByIdAndUpdate(id, req.body, { new: true });

  res.json(updated);
};

// Delete Hotel
exports.deleteHotel = async (req, res) => {
  const { id } = req.params;
  await Hotel.findByIdAndDelete(id);
  res.json({ message: "Hotel deleted" });
};


const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = twilio(accountSid, authToken);
const adminPhoneNumber = 'whatsapp:+918097809705';
const nodemailer = require("nodemailer");
exports.sendMessage = async (req, res) => {
  const { message, hotelName } = req.body;

  try {

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
      subject: `Hotel enquiry - ${hotelName}`,
      text: `${message}`,
      
    };
        
    await transporter.sendMail(mailOptions);
    // const msg = await client.messages.create({
    //   body: message,
    //   from: 'whatsapp:+14155238886', // Twilio Sandbox WhatsApp number
    //   to: `whatsapp:${to}`, // recipient number, e.g. whatsapp:+918779861687
    // });

    res.status(200).json({ message: "Invoice sent successfully" });
  } catch (error) {
     console.error("Error sending invoice:", err); // Already present
      return res.status(500).json({
        message: "Failed to send invoice",
        error: err.message || "Unknown error"
      });
  }
};


// GET /api/hotels/search?query=goa
// exports.searchHotels = async (req, res) => {
//   const { query } = req.query;
//   try {
//     const hotels = await Hotel.find({
//       $or: [
//         { hotelName: { $regex: query, $options: 'i' } },
//         { location: { $regex: query, $options: 'i' } },
//         { city: { $regex: query, $options: 'i' } }
//       ]
//     });
//     res.json(hotels);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// controller: searchHotels.js
// exports.searchHotels = async (req, res) => {
//   try {
//     const {
//       destination = '',
//       startDate,
//       endDate,
//       adult,
//       room
//     } = req.query;

//     // Base filter (by destination input)
//     const baseFilter = {
//       $or: [
//         { hotelName: { $regex: destination, $options: 'i' } },
//         { location: { $regex: destination, $options: 'i' } },
//         { city: { $regex: destination, $options: 'i' } }
//       ]
//     };

//     // Optional filters
//     let dateFilter = {};
//     if (startDate && endDate) {
//       dateFilter = {
//         availableDates: {
//           $elemMatch: {
//             from: { $lte: new Date(startDate) },
//             to: { $gte: new Date(endDate) }
//           }
//         }
//       };
//     }

//     let guestFilter = {};
//     if (adult || room) {
//       guestFilter = {
//         maxAdults: { $gte: adult || 1 },
//         roomsAvailable: { $gte: room || 1 }
//       };
//     }

//     // Final query
//     const query = {
//       ...baseFilter,
//       ...dateFilter,
//       ...guestFilter
//     };

//     const hotels = await Hotel.find(query);
//     res.json(hotels);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// Search Hotel
exports.searchHotels = async (req, res) => {
  try {
    const { destination = '' } = req.query;

    const baseFilter = {
      $or: [
        { hotelName: { $regex: destination, $options: 'i' } },
        { location: { $regex: destination, $options: 'i' } },
        { city: { $regex: destination, $options: 'i' } }
      ]
    };

    const hotels = await Hotel.find(baseFilter);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






// GET /api/hotels/filter?type=resort
exports.filterHotelsByType = async (req, res) => {
  const { type } = req.query;
  try {
    const hotels = await Hotel.find({ hotelType: type });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

