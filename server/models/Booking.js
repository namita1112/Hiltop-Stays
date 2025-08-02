const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userFirstName:{
        type: String,
        required: true,
    },
    userLastName:{
        type: String,
        required: true,
    },
    userEmail:{
        type: String,
        required: true,
    },
    userPhone: {
        type: Number,
        required: true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalGuests: {
        type: Number,
        required: true
    },
    totalAmount: Number,
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    bookingStatus: {
        type: String,
        enum: ['booked', 'cancelled', 'completed'],
        default: 'booked'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
