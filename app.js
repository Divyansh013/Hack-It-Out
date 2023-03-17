const express = require('express');
const path= require('path');   
const mongoose = require('mongoose'); 
const methodOverride = require('method-override');
const app =express();
const morgan= require('morgan');
const Student = require('./models/student.js');
const Professor = require('./models/professor.js')
const ejsMate =require('ejs-mate');
const Joi = require('joi');



//app.use(morgan('tiny'));//logs details of every http request made to the server onto the terminal

app.use(morgan('tiny'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',ejsMate);

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));

// const validateCampground((req,res,next)=>{
    
// })

// mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/hout',{
    useNewUrlParser:true,
    //useCreateIndex:true,//unsupported
    useUnifiedTopology:true
})



const db = mongoose.connection;
db.on("error",console.error.bind((console,"Connection error:")));
db.once("open",()=>{
    console.log("Database Connected");
})

app.get('/',(req,res)=>{
    res.render('home.ejs'); 
})


app.get('/professor/new',(req,res,next)=>{
    res.render('professor/new.ejs');    
})

app.post('/professor/new',async (req,res,next)=>{
    console.dir(req.body);
    const {name, uid} = req.body;

    //prevent duplicate uid

    const prof = new Professor({name:name, uid:uid});
    await prof.save();
   
    
    res.redirect(`/professor/:${prof._id}`) ;   
    // res.send("POST HIT");
    //    ('professor/professorHome.ejs',{prof})

})


app.get('/professor/enter',(req,res,next)=>{
   res.render('professor/login.ejs')
})

app.post('/professor/enter',async (req,res,next)=>{
    const {name ,uid}=req.body.professor;
    const prof=await Professor.find({name:name,uid:uid});
    if(prof)
    return res.redirect(`professor/${prof._id}`,{prof});
    else res.send('iNCORRECT Creds')
 })
// app.use((err,req,res,next)=>{
//     res.send("Something went wrong !!")
// })

app.get('/professor/:id',async (req,res)=>{
    console.log(req.params);
    let {id} = req.params;
    id=id.substring(1);
    id = new mongoose.Types.ObjectId(id+"");
    const prof = await Professor.findOne({_id:id});
    console.log(prof);
    return res.render('professor/professorHome.ejs',{prof})

})

//student routes below

// Renders form for registering
app.get('/student/new',(req,res)=>{
    res.render('student/new');
  });
  
  // Post for registering
  app.post('/student/new',async (req,res,next)=>{
    console.log(req.body);
    const {name,roll,password}= req.body;
    
    const student = new Student({name:name,roll:roll,password:password});
    await student.save();
    // const newStudent = new Student({
  
    // })
    res.redirect(`/student/${student._id}`);
  });
  
  // Renders form for login
  app.get('/student/enter',(req,res)=>{
    res.render('student/login');
  })
  
  app.post('/student',(req,res)=>{
    const {rollNo,password}=req.body;
    res.redirect('/studentHome');
  });
  
//   app.get('/studentHome',(req,res)=>{
//     res.render('student/studentHome');
//   })

  app.get('/student/:id',async (req,res)=>{
    console.log(req.params);
    let {id} = req.params;
    //id=id.substring(1);
    id = new mongoose.Types.ObjectId(id+"");
    const stud = await Student.findOne({_id:id});
    console.log(stud);
    return res.render('student/studentHome.ejs',{stud})

})



app.listen(3000,()=>{
    console.log("Serving on Port 3000");
})



