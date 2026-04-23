const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
let tasks = []


router.get('/', auth,(req,res)=>{
    const myTasks = tasks.filter(task => task.userId === req.user.id)
    res.json(myTasks)
})

router.post('/', auth,(req,res)=>{
    const {description} = req.body
    const newTask = {
        id:tasks.length + 1,
        description:description,
        completed : false,
        userId : req.user.id
    }
    tasks.push(newTask)
    res.json(newTask)
})

router.put('/:id', auth,(req,res)=>{
    const id = req.params.id
    const task = tasks.find(task => task.id === id)
    if(!task){
        return res.status(404).send('Task not found')
    }
    const isMatch = task.userId === req.user.id
    if(!isMatch){
        return res.status(403).send('Not allowed')
    }
    const {description,completed} = req.body
    task.description = description
    task.completed = completed
    res.json(task)
})

router.delete('/:id', auth,(req,res)=>{
    const id = req.params.id 
    const task = tasks.find(task => task.id === id)
    if(!task){
        return res.status(404).send('Task not found')
    }
    const isMatch = task.userId ===  req.user.id 
    if(!isMatch){
        return res.status(403).send('Not allowed')
    }
    tasks = tasks.filter(task => task.id !== id)
    res.send('Task deleted successfully')
})



module.exports = router