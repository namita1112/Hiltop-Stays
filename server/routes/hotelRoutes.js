const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage })

router.post("/hotels", hotelController.uploadMiddleware, hotelController.createHotel);
router.get("/hotels", hotelController.getHotels);
router.get('/hotels/:id', hotelController.getHotelById);
router.put("/hotels/:id",upload.array("images"), hotelController.updateHotel);
router.delete("/hotels/:id", hotelController.deleteHotel);

router.post('/send-message', hotelController.sendMessage);

module.exports = router;
