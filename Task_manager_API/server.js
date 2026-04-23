const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
app.use(express.json())

const authRoutes = require('./routes/auth')
const tasksRoutes = require('./routes/tasks')

app.get('/',(req,res)=>{
    res.send('Hello world')
})
app.use('/auth',authRoutes)
app.use('/tasks',tasksRoutes)

mongoose.connect('mongodb://localhost:27017/taskmanager')
    .then(()=>{console.log("Connected to MongoDB")})
    .catch(error => console.log(error))

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})