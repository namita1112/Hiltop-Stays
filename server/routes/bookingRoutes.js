const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/confirm/:receiptId", bookingController.confirmBooking);

module.exports = router;
