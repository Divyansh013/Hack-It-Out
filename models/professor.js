const mongoose = require('mongoose');
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
    pclasses:{
        type:[String]
    }
});

module.exports= mongoose.model('Professor',ProfessorSchema);