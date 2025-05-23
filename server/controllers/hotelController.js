const Hotel = require("../models/Hotel");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
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

    const hotel = new Hotel({
      hotelName: req.body.hotelName,
      description: req.body.description,
      address: req.body.address,
      contact: req.body.contact,
      city: req.body.city,
      owner: req.body.owner,
      ownerContact: req.body.ownerContact,
      images: imageUrls,
      rating: req.body.ownerContact,
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

exports.updateHotel = async (req, res) => {
  const { id } = req.params;
  const updated = await Hotel.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

exports.deleteHotel = async (req, res) => {
  const { id } = req.params;
  await Hotel.findByIdAndDelete(id);
  res.json({ message: "Hotel deleted" });
};
