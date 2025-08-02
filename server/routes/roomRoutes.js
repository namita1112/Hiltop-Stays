const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

router.post("/rooms", roomController.uploadMiddleware, roomController.addRoom);
// router.post("/rooms", roomController.addRoom);
// // router.get("/rooms", hotelController.getHotels);
router.delete('/rooms/:id', roomController.deleteRoom);
router.put("/rooms/:id", roomController.editRoom);


module.exports = router;