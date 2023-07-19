const express = require('express');
const mongoose = require('mongoose');
const OwnerSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    room_size: { type: String, required: true },
    lastdate: { type: Date, required: true },
    rent: { type: Number, required: true },
    mobile: { type: String, required: true },
    desc: { type: String, required: true },
})

module.exports = OwnerSchema;