const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Note = require('../models/notes')

router.get('/',auth, async(req,res)=>{
    const myNotes = await Note.find({userId:req.user.id})
    res.json(myNotes)
})

router.post('/',auth,async(req,res)=>{
    const {title,content} = req.body
    const newNote = new Note({title,content,userId:req.user.id})
    await newNote.save()
    res.json(newNote) 
})

router.put('/:id',auth,async(req,res)=>{
    const id = req.params.id
    const note = await Note.findById(id)
    if(!note){
        return res.status(404).send('Note not found')
    } 
    const isMatch = note.userId.toString() === req.user.id.toString()
    if(!isMatch){
        return res.status(403).send("Not allowed")
    }
    const {title,content} = req.body
    note.title = title
    note.content = content
    await note.save()
    res.json(note) 
})
router.delete('/:id',auth,async(req,res)=>{
    const note = await Note.findById(req.params.id)
    if(!note){
        return res.status(404).send('Note not found')
    }
    const isMatch = note.userId.toString() === req.user.id.toString()
    if(!isMatch){
        return res.status(403).send("Not allowed")
    }
    await Note.findByIdAndDelete(req.params.id)
    res.send('Note deleted successfully')
})
module.exports = router