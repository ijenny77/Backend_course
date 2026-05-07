require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000


app.use(express.json())
app.use(cors())
const authRoutes = require('./routes/auth')
const recipesRoutes = require("./routes/recipe")
app.use('/recipes', recipesRoutes)
app.get("/",(req,res)=>{
    res.send("Recipe App API is running!")
})
app.use('/auth',authRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Database connected:"))
    .catch(error => {
        console.log("connecttion error:",error.message)
    })

app.listen(port,()=>{z
    console.log(`Server listening on port ${port}`)
})