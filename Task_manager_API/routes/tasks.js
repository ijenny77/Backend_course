const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/Task')

router.get('/', auth,async(req,res)=>{
    const myTasks =await Task.find({ userId: req.user.id })
    res.json(myTasks)
})

router.post('/', auth,async(req,res)=>{
    const {description} = req.body
   const newTask = new Task({description, userId:req.user.id})
   await newTask.save()
    res.json(newTask)
})

router.put('/:id', auth,async(req,res)=>{
    const id = req.params.id
    const task = await Task.findById(req.params.id)
    if(!task){
        return res.status(404).send('Task not found')
    }
    const isMatch = task.userId.toString() === req.user.id.toString()
    if(!isMatch){
        return res.status(403).send('Not allowed')
    }
    const {description,completed} = req.body
    task.description = description
    task.completed = completed
    await task.save()
    res.json(task)
})

router.delete('/:id', auth,async(req,res)=>{
    const task = await Task.findById(req.params.id)
    if(!task){ 
        return res.status(404).send('Task not found')
    }
    const isMatch = task.userId.toString() ===  req.user.id.toString()
    if(!isMatch){
        return res.status(403).send('Not allowed')
    }
    tasks = await Task.findByIdAndDelete(req.params.id)
    res.send('Task deleted successfully')
})



module.exports = router