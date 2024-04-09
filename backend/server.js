const express = require('express')
const colors = require('colors')
require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const cors = require('cors')

connectDB()

const app = express()

app.use(cors({
    origin: "*",
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/subGreddiit', require('./routes/subGreddiitRoutes'))
app.use('/api/post', require('./routes/postRoutes'))

app.listen(port, () => console.log(`Server started on ${port}`))