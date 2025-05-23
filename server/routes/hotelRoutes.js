const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

router.post("/hotels", hotelController.uploadMiddleware, hotelController.createHotel);
router.get("/hotels", hotelController.getHotels);
router.put("/hotels/:id", hotelController.updateHotel);
router.delete("/hotels/:id", hotelController.deleteHotel);

module.exports = router;
