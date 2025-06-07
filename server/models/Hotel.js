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
    images:{
        type: [String],
    },
    amenities:{
        type: [String],
    },
    roomsType:{
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
    }
});

module.exports = mongoose.model("Hotel", hotelSchema);