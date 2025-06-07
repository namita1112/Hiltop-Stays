const Hotel = require("../models/Hotel");
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
exports.uploadMiddleware = upload.array("images", 30);

exports.createHotel = async (req, res) => {
  try {
    const imageUrls = [];

    for (let file of req.files) {
      const streamUpload = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "Hiltop_Stays" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      const result = await streamUpload(file.buffer);
      imageUrls.push(result.secure_url);
    }
    console.log(req.body);
    const hotel = new Hotel({
      hotelName: req.body.hotelName,
      title: req.body.title,
      description: JSON.parse(req.body.description),
      address: req.body.address,
      contact: req.body.contact,
      city: req.body.city,
      owner: req.body.owner,
      ownerContact: req.body.ownerContact,
      images: imageUrls,
      rating: req.body.rating,
      amenities: JSON.parse(req.body.amenities),
      roomsType: JSON.parse(req.body.roomsType),
    });

    await hotel.save();
    res.status(201).json(hotel);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.createHotel = async (req, res) => {
// //   try {
//     const imageUrls = [];

//     for (let file of req.files) {
//         const result = await cloudinary.uploader.upload(file.path);
//         imageUrls.push(result.secure_url);
//         fs.unlinkSync(file.path); // Clean up local file
//     }
//     // const result = await cloudinary.uploader.upload(req.file.path);
//     const hotel = new Hotel({
//         hotelName: req.body.hotelName,
//         address: req.body.address,
//         contact: req.body.contact,
//         city: req.body.city,
//         owner: req.body.owner,
//         images: imageUrls,
//     });
//     await hotel.save();
//     fs.unlinkSync(req.file.path);
//     res.status(201).json(hotel);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// };

exports.getHotels = async (req, res) => {
  const { location } = req.query;
  const filter = location ? { location } : {};
  const hotels = await Hotel.find(filter);
  res.json(hotels);
};

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHotel = async (req, res) => {
  const { id } = req.params;
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
  const updated = await Hotel.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteHotel = async (req, res) => {
  const { id } = req.params;
  await Hotel.findByIdAndDelete(id);
  res.json({ message: "Hotel deleted" });
};


const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = twilio(accountSid, authToken);
const adminPhoneNumber = 'whatsapp:+918097809705';

exports.sendMessage = async (req, res) => {
  const { to, message } = req.body;

  try {
    const msg = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886', // Twilio Sandbox WhatsApp number
      to: `whatsapp:${to}`, // recipient number, e.g. whatsapp:+918779861687
    });

    res.status(200).json({ sid: msg.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

