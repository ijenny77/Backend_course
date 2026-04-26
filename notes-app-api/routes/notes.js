const express = reuqire('express')
const router = express.Router()
const auth = require('../middleware/auth')
const notes = require('../models/notes')

router.get('/',auth, async(req,res)=>{
    const Notes = await notes.find({userId:req.user.id})
    res.json(myTasks)
})

router.post('/',auth,async(req,res)=>{
    const {title,content} = req.body
    const newNote = new note({title,content,userId:req.user.id})
    await newNote.save()
    res.json(newNote) 
})

router.put('/:id',auth,async(req,res)=>{
    const id = req.params.id
    const note = await note.findById(id)
    if(!note){
        return res.status(404).send('Note not found')
    } 
    const isMatch = note.userId.toString() === re.user.id.toString()
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
    const note = await note.findById(re.params.id)
    if(!note){
        return res.status(404).send('Note not found')
    }
    const isMatch = note.userId.toString() === req.params.id.toString()
    if(!isMatch){
        return res.status(403).send("Not allowed")
    }
    await note.findByIdAndDelete(req.params.id)
    res.send('Note deleted successfully')
})
module.exports = router