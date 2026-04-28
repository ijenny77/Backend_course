const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const jwt = require("jsonwebtoken")


router.get('/me',auth,async(req,res)=>{
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
})

router.post('/register',async(req,res)=>{
    const {name,email,password,confirmPassword,rememberMe} = req.body
    if(password != confirmPassword){
        return res.status(400).send("passwords.match")
    }
    if(await User.findOne({email})){
        return res.status(400).send("The user already exists!")
    }
    const hashedPassword =await bcrypt.hash(password,10)
    const newUser = new User({name,email,password:hashedPassword})
    await newUser.save()
    res.status(201).send("User registered successfully")
})

router.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const isUser = await User.findOne({email})
    if(!isUser){
        return res.status(400).send("User not Found")
    }
    const isMatch = await bcrypt.compare(password,isUser.password)
    if(!isMatch){
        return res.status(400).send("Incorrest password")
    } 
    const token = jwt.sign(
        {id:User._id},
        process.env.JWT_SECRET,
        {expiresIn:rememberMe ? "30d" : '1h'}    
    )
    res.json({token})
})

module.exports = router