const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema= new Schema({
    name:{
        type:String,
        required:true
    },
    roll:{
        type:Number,
        required:true
    },
    semester:{
        type:String
           
    },
    mail:{
        type:String
    },
    classes:{
        type:[String]
    },
    password:{
        type:String,
        required:true
    }
});

module.exports= mongoose.model('Student',StudentSchema);