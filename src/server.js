const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes')
const expressLayouts = require('express-ejs-layouts')
const cors = require('cors')

require('dotenv').config({path: __dirname + '/.env'})

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(expressLayouts)
app.use(routes)

app.set('view engine', 'ejs')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Database connected'))

app.listen(process.env.PORT, () => {
    console.log('The server is running')
})