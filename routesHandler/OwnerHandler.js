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
})

ownerHandler.put('/edit/:id', async (req, res) => {
    HOUSE.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }).then(() => {
        res.status(200).json({ message: 'Update successful', success: true })
    }).catch(err => {
        res.status(500).json({ message: 'Something went wrong', success: false })
    })
})

ownerHandler.get('/allhouses', async (req, res) => {
    HOUSE.find({}).select({

    }).then((result) => {
        console.log(result)
        res.status(200).json({ message: 'SUCCESS', result })
    }).catch(err => {
        res.status(500).json({ message: 'Something went wrong', result })
    })
})
ownerHandler.get('/:id', async (req, res) => {
    HOUSE.findOne({ _id: req.params.id }).select({

    }).then((result) => {
        console.log(result)
        res.status(200).json({ message: 'SUCCESS', result })
    }).catch(err => {
        res.status(500).json({ message: 'Something went wrong', result })
    })
})

module.exports = ownerHandler;