const mongoose = require('mongoose');
const Class = require('../models/class.js')
const Schema = mongoose.Schema;

const ProfessorSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    uid:{
        type:Number,
        required:true
    },   
    pclasses:[{
        type:Schema.Types.ObjectId,
        ref:'Class'
    }]
}); 

module.exports= mongoose.model('Professor',ProfessorSchema);