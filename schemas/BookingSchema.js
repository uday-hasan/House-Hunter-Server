const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema([
    {
        name: String,
    },
    {
        email: String,
    },
    {
        mobile: {
            type: String, required: true,
        },
    },
    {
        bookedId: mongoose.ObjectId
    }
])
module.exports = bookingSchema;