const express = require('express');
const registrationRouter = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const registrationSchema = require('../schemas/RegistrationSchema');

const USER = new mongoose.model("USER", registrationSchema);

registrationRouter.post('/', async (req, res) => {
    const { name, email, password, role, mobile } = req.body;
    const hash = await bcrypt.hash(password, 15)
    const newUser = new USER({ name, email, password: hash, role, mobile });
    newUser.save().then(() => { res.status(200).json({ success: true, message: "Account Created successfully" }) }).catch(err => { res.status(500).json({ success: false, message: 'Server Side Error, try again later ' + err }) })
})

module.exports = registrationRouter
