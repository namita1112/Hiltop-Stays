const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage })

// 🆕 Hotel Search by name/location/city
// Example: GET /api/hotels/search?query=goa
router.get("/hotels/search", hotelController.searchHotels);
router.get("/hotels/getAllHotels", hotelController.getAllHotels);
router.post("/hotels", hotelController.uploadMiddleware, hotelController.createHotel);
router.get("/hotels", hotelController.getHotels);
router.get('/hotels/:id', hotelController.getHotelById);
router.put("/hotels/:id",upload.array("images"), hotelController.updateHotel);
router.delete("/hotels/:id", hotelController.deleteHotel);

router.post('/send-message', hotelController.sendMessage);



// 🆕 Filter by hotel type (villa, resort, etc.)
// Example: GET /api/hotels/filter?type=resort
router.get("/hotels/filter", hotelController.filterHotelsByType);

module.exports = router;
