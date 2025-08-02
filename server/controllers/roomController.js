const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const twilio = require('twilio');
const fs = require("fs");
const storage = multer.memoryStorage();
const streamifier = require("streamifier");

const upload = multer({ storage: storage });

exports.uploadMiddleware = upload.array("images", 30);
exports.addRoom = async (req, res) => {
    try {
        const hotelExists = await Hotel.findById(req.body.hotel);
        if (!hotelExists) {
          return res.status(400).json({ error: "Hotel ID is invalid" });
        }

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
        const room = new Room({
            hotel: req.body.hotel,
            bedType: req.body.bedType,
            description: req.body.description,
            BasePrice: req.body.BasePrice,
            pricePerNight: req.body.pricePerNight,
            maxOccupancy: req.body.maxOccupancy,
            count: req.body.count,
            images: imageUrls,
            amenities: JSON.parse(req.body.amenities),
        });

        await room.save();
        res.status(201).json(room);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// exports.addRoom = async (req, res) => {
//   try {
//     const room = new Room(req.body);
//     await room.save();
//     res.status(201).json(room);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.editRoom = async (req, res) => {
  try {
    // Only try to parse amenities if it exists and is a string
    if (req.body?.amenities && typeof req.body.amenities === 'string') {
      try {
        req.body.amenities = JSON.parse(req.body.amenities);
      } catch (error) {
        return res.status(400).json({ error: 'Invalid amenities format' });
      }
    }

    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// exports.editRoom = async (req, res) => {
//   try {
//     if (req.body.amenities && typeof req.body.amenities === 'string') {
//       try {
//         req.body.amenities = JSON.parse(req.body.amenities);
//       } catch (error) {
//         return res.status(400).json({ error: 'Invalid amenities format' });
//       }
//     }
//     const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(room);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


