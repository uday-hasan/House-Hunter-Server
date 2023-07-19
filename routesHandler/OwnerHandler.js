const express = require('express');
const app = express();
const mongoose = require('mongoose');
const OwnerSchema = require('../schemas/OwnerSchema');
const ownerHandler = express.Router();
const HOUSE = new mongoose.model('HOUSE', OwnerSchema)

ownerHandler.post('/add', async (req, res) => {
    const newHouse = new HOUSE(req.body);
    newHouse.save().then(() => {
        res.status(200).json({ message: 'House added successfully', success: true });
    }).catch(err => {
        res.status(500).json({ message: 'Something went wrong, try again later', success: false });
    })
})

module.exports = ownerHandler;