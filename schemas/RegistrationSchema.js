const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    name: {
        type: String, required: true,
    },
    role: {
        type: String,
        enum: ['house-owner', 'house-renter'],
    },
    email: {
        type: String, required: true,
    },
    mobile: {
        type: String, required: true,
    },
    password: {
        type: String, required: true,
    },

})

module.exports = registrationSchema;