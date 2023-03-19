const mongoose = require('mongoose');
const Class = require('../models/class.js')
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
    password:{
        type:String,
        required:true
    },
    semester:{
        type:String   
    },
    mail:{
        type:String
    },
    classes:[{
        type:Schema.Types.ObjectId,
        ref:'Class'
    }],
   /* tasks:{
        type:[

        {
          task:{
            type:String,
            required:true
          },
          eval:{
            type:Number,
            required:true,
            min:-1,
            max:10
          }
        }
        // type:Map,
        // of:Number//-1 means due , 0 to 10 means score/gradefor that task
    //tasks is now an array of string number pairs
    ],
    default:[{task:"sample",eval:10}]
}*/
    tasks:{
        type:Map,
        of:Number,
        required:true,
        default:new Map([["sample1",10],["sample2",10]])
    }
});

module.exports= mongoose.model('Student',StudentSchema);