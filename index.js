const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const registrationRouter = require('./routesHandler/registrationHandler')
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 4600
require('dotenv').config()
mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to database')
}).catch(err => console.log(err))

app.use('/register', registrationRouter)

app.listen(port, () => {
    console.log('Listining from port ' + port);
})