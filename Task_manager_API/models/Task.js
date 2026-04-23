const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema ({
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Task', TaskSchema)