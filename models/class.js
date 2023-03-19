const mongoose = require('mongoose');
const Student = require('../models/student.js');

const Schema = mongoose.Schema;

const ClassSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    semester:{
        type:String
           
    },
    students:[{
        type:Schema.Types.ObjectId,
        ref:'Student'
    }],
    tasks:{
        type:[String]
    },
    key:{
        type:Number,
        required:true
    }
});

module.exports= mongoose.model('Class',ClassSchema);