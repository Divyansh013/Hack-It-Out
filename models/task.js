const mongoose = require('mongoose');
const Class = require('../models/class.js')

const Schema = mongoose.Schema;

const TaskSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
           
    },
    parentClass:{
        type:Schema.Types.ObjectId,
        ref:'Class'
    },
    key:{
        type:Number,
        required:true
    }
});

module.exports= mongoose.model('Task',TaskSchema);