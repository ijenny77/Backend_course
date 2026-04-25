require('dotenv').config
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
const authRoutes = require("./routes/auth")
const notesRoutes = require("./routes/notes")

app.get('/',(req,res)=>{

})
app.use('/auth',authRoutes)
app.use('/notes',notesRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("Connected to MongoDB")})
    .catch(error => console.log(error))
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})