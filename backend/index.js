require('dotenv').config()
const express = require('express')
const fileupload = require('express-fileupload')
const app = express()
const cors = require('cors')
const path = require('path')

app.use(cors ({
    origin:'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(fileupload())
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

// Plublic Endpoint
const auth = require('./routes/auth')
app.use('/api/auth',auth)

// Staff Endpoint

// Evaluatee Endpoint

// Committee Endpoint

// Block 404
app.use((req,res) => {
    res.status(404).json({message:'ระบบกำลังปิดปรับปรุง!'})
})

app.listen(3001, () => console.log("Server Running On Port 3001"))