const express = require('express');
const bookingHandler = express.Router();
const mongoose = require('mongoose');
const bookingSchema = require('../schemas/BookingSchema');

const BOOKED = new mongoose.model('Booked', bookingSchema);

bookingHandler.post('/', async (req, res) => {
    const { email, name, mobile, bookedId } = req.body
    const newBooking = new BOOKED(req.body)
    BOOKED.find({ email }).then(result => {
        if (result.length < 2) {
            newBooking.save().then(() => {
                res.status(200).json({ success: true, message: 'Booking successful' })
            })
        }
        else {
            res.status(500).json({ success: false, message: `You can book max 2` })
        }
    })
})

module.exports = bookingHandler