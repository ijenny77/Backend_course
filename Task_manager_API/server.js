require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
app.use(express.json())

const authRoutes = require('./routes/auth')
const tasksRoutes = require('./routes/tasks')

app.get('/',(req,res)=>{
    
})
app.use('/auth',authRoutes)
app.use('/tasks',tasksRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("Connected to MongoDB")})
    .catch(error => console.log(error))

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})