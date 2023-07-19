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

ownerHandler.get('/all?', async (req, res) => {
    console.log(req.query)
    const email = req.query.email
    HOUSE.find({ user: email }).then((result) => {
        res.status(200).json({ message: 'OK', success: true, result })
    }).catch(err => {
        res.status(500).json({ message: 'Not Okay', success: false })
    })
})

ownerHandler.delete('/:id', async (req, res) => {
    const id = req.params.id
    HOUSE.deleteOne({ _id: id }).then(() => {
        res.status(200).json({ message: 'OK', success: true })
    }).catch(err => {
        res.status(500).json({ message: 'Not OK', success: false })
    })
    console.log(id)
})

module.exports = ownerHandler;