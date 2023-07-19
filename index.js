const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authenticationHandler = require('./routesHandler/authenticationHandler')
const ownerHandler = require('./routesHandler/OwnerHandler')
const app = express()
app.use(express.json())
app.use(cors())
const port = process.env.PORT || 4600
require('dotenv').config()
mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to database')
}).catch(err => console.log(err))

app.use('/authentication', authenticationHandler)
app.use('/owner', ownerHandler)

app.listen(port, () => {
    console.log('Listining from port ' + port);
})