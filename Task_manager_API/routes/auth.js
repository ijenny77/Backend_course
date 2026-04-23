const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const users = []
const jwt = require('jsonwebtoken')

router.post('/register',async(req,res) => {
    const {name,email,password} = req.body

    if (users.find(user => user.email === email)){
       return res.status(400).send('User already exists')
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = {
        id:Date.now(),
        name:name,
        email:email,
        password:hashedPassword
    }
    users.push(newUser)
    res.status(201).send('User registered successfully')
})
router.post('/login',async(req,res) => {
    const {name,email,password} = req.body
    const isUser = users.find(user => user.email === email)
    if(!isUser){
        return res.status(400).send('User not found')
    }else{
        const isMatch = await bcrypt.compare(password,isUser.password)
        if(!isMatch){
            return res.status(400).send("Incorrect password!")
        }
        const token = jwt.sign(
            { id:isUser.id },
            'secretkey',
            {expiresIn:'1d'}
        )
        res.send({token})
    }
})
module.exports = router