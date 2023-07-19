const express = require('express');
const authenticationHandler = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const registrationSchema = require('../schemas/RegistrationSchema');

const USER = new mongoose.model("USER", registrationSchema);

authenticationHandler.post('/signup', async (req, res) => {
    const { name, email, password, role, mobile } = req.body;
    USER.find({ email }).then(async (user) => {
        if (user.length > 0) { res.status(409).json({ success: false, message: 'User already exists' }) }
        else {
            const hash = await bcrypt.hash(password, 15)
            const newUser = new USER({ name, email, password: hash, role, mobile });
            newUser.save().then(() => { res.status(200).json({ success: true, message: "Account Created successfully" }) }).catch(err => { res.status(500).json({ success: false, message: 'Server Side Error, try again later ' + err }) })
        }
    })
})

authenticationHandler.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    USER.findOne({ email }).then(async (user) => {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(200).json({ success: true, token: token, user: email, message: "Login Successful" })
        }
        else {
            res.status(401).json({ success: false, message: "Email or Password not found" })
        }
    }).catch(err => {
        res.status(401).json({ success: false, message: "Email or Password not found" })
        console.log(err)
    })
})

module.exports = authenticationHandler
