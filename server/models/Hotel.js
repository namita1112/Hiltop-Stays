const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    description: [{
        title: { type: String },
        desc: { type: String }
    }],
    hotelRule:[{
        title: { type: String },
        desc: { type: String }
    }],
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    owner: {
        type : String,
    },
    ownerContact:{
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    location: {
       type: String,
    },
    distance: {
       type: String,
    },
    images:{
        type: [String],
    },
    amenities:{
        type: [String],
    },
    latitude:{
        type: Number,
    },
    longitude:{
        type: Number,
    },
    rating: {
        type: Number,
    },
    status: {
        type:Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    hotelType: {
        type: String, // e.g., "Hotel", "Villa", "Homestay"
        required: true
    },
    isEntireProperty: {
        type: Boolean,
        default: false // true for villas/mansions
    },
    availableDates: [{
        from: Date,
        to: Date
    }],
    bookedDates: [{
        from: Date,
        to: Date
    }],
    checkIn:{
        type: String
    },
    checkOut:{
        type: String
    },
    maxAdults:{
        type: Number
    },
    entirePropertyBasePrice: {
        type: Number,
        required: function () { return this.isEntireProperty === true; }
    },
    entirePropertyPrice: {
        type: Number,
        required: function () { return this.isEntireProperty === true; }
    }
});

module.exports = mongoose.model("Hotel", hotelSchema);