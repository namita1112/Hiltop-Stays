const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    bedType: {
        type: String, // e.g., "Deluxe Room", "Villa", "Suite"
        required: true
    },
    description: { 
        type: String 
    },
    BasePrice:{
        type : Number,
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    maxOccupancy: { 
        type: Number //Maximum number of guests allowed in the room.
    },
    amenities: [String],
    images: [String],
    count: {
        type: Number,
        required: true // Number of such rooms available in the hotel
    },
    maxAdults: {
        type: Number, // Maximum adults allowed per room
    },
    maxChildren: {
        type: Number,
        default: 0 // Optional
    },

    // Availability ranges — for seasonal/maintenance control
    availableDates: [{
        from: {
        type: Date,
        // required: true
        },
        to: {
        type: Date,
        // required: true
        }
    }]
});

module.exports = mongoose.model('Room', roomSchema);



