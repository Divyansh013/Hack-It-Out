const express = require('express');
const path= require('path');   
const mongoose = require('mongoose'); 
const methodOverride = require('method-override');
const app =express();
const morgan= require('morgan');
const Student = require('./models/student.js');
const Professor = require('./models/professor.js');
const Class = require('./models/class.js')
const ejsMate =require('ejs-mate');
const Joi = require('joi');
const e = require('express');



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
   
    
    res.redirect(`/professor/${prof._id.toString()}`) ;   
    // res.send("POST HIT");
    //    ('professor/professorHome.ejs',{prof})

})


app.get('/professor/enter',(req,res,next)=>{
   res.render('professor/login.ejs')
})

app.post('/professor/enter',async (req,res,next)=>{
    console.log(req.body);
    const {name ,uid}=req.body;
    const prof=await Professor.find({name:name,uid:uid});
    console.log(prof,"*");
    if(prof[0])console.log(prof[0]._id);
    if(prof && prof.length)
    return res.redirect(`/professor/${(prof[0]._id).toString()}`);
    else res.send('iNCORRECT Creds')
 })
// app.use((err,req,res,next)=>{
//     res.send("Something went wrong !!")
// })


app.get('/professor/:id/class/new',async (req,res,next)=>{
    const {id}= req.params;
    const prof = await Professor.findById(id).populate('pclasses');
    res.render('class/new.ejs',{prof});
})

app.post('/professor/:id/class/new',async (req,res,next)=>{
    //console.log("Class created" ,req.body.name);
    // res.send(req.body);
    const {name} = req.body;
    const newClass= new Class({name:name, key:Math.floor(Math.random()*1000)+1});
    await newClass.save();

    const {id}= req.params;
    const prof=await Professor.findById(id).populate('pclasses');
    console.log(newClass._id);
    prof.pclasses.push(newClass._id.toString());
    await prof.save();
    console.log(prof.pclasses.length,"*");
    console.log("--");
    prof.populate('pclasses');
    console.log(prof);
    console.log("--");
    //res.send("ok");
    res.redirect(`/professor/${prof._id.toString()}`);

})
app.post('/professor/:id1/class/:id2/task',async(req,res,next)=>{
   let {id1,id2} = req.params;
   const {task}= req.body;
   id1= new mongoose.Types.ObjectId(id1+"");
   id2= new mongoose.Types.ObjectId(id2+"");
   const prof1_= await Professor.findById(id1);
   const class_= await Class.findById(id2);
   class_.tasks.push(task);
   await class_.save();
//    class_.populate('students');
   for(x of class_.students){
    // class_.populate('students')
        let stud_ = await Student.findById(x);
        console.dir(stud_);
        stud_.tasks.push({task:task,eval:-1});
     
       
    // console.log(x);
    // console.log(task);
    // stud_.tasks[task]=-1;
    await stud_.save();
   }
   res.send(task);
   
})
app.get('/professor/:id1/class/:id2/task/new',async (req,res,next)=>{
    let {id1,id2} = req.params;
    id1= new mongoose.Types.ObjectId(id1+"");
    id2= new mongoose.Types.ObjectId(id2+"");
    const prof_=await Professor.findById(id1);
    const class_=await Class.findById(id2);

    res.render('task/new.ejs',{prof_,class_})
})

app.get('/professor/:id1/class/:id2',async(req,res,next)=>{
   
    let {id1,id2}=req.params; 
    id1= new mongoose.Types.ObjectId(id1+"");
    id2= new mongoose.Types.ObjectId(id2+"");
    const prof_ = await Professor.findById(id1);
    const class_ = await Class.findById( id2).populate('students');
    res.render('class/classHome.ejs',{prof_,class_});


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
  
  app.post('/student/enter',async(req,res)=>{
    const {roll,password}=req.body;
    const stud = await Student.find({roll:roll,password:password});
    if(stud[0])res.redirect(`/student/${stud[0]._id.toString()}`);
    else res.send("Incorrect Credentials");
  });

  app.get('/student/:id1/class/:id2',async (req,res,next)=>{

    let {id1,id2}=req.params; 
    id1= new mongoose.Types.ObjectId(id1+"");
    id2= new mongoose.Types.ObjectId(id2+"");
    const stud_ = await Student.findById(id1);
     
    res.render('task/taskHome.ejs',{stud_});

     
  })

  app.get('/student/:id',async (req,res)=>{
    console.log(req.params);
    let {id} = req.params;
    //id=id.substring(1);
    id = new mongoose.Types.ObjectId(id+"");
    const stud = await Student.findOne({_id:id}).populate('classes');
    console.log(stud);
    res.render('student/studentHome.ejs',{stud})
    

})


//class routes



app.get('/student/:id/class/join',async(req,res,next)=>{
    const {id}=req.params;
    const stud =await Student.findById(id);
    res.render('class/join.ejs',{stud});
})

app.post('/student/:id/class/join',async(req,res,next)=>{
    const {id}=req.params;
    const{key} = req.body;
    const stud =await Student.findById(id);
    const class_= await Class.findOne({key:key});
    stud.classes.push(class_);
    await stud.save();
    class_.students.push(stud);
    await class_.save();
    res.redirect(`/student/${id.toString()}`);
    
    
  })


  app.get('/professor/:id',async (req,res)=>{
    // console.log(req.params);
    let {id} = req.params;
    //id=id.substring(1);
    id = new mongoose.Types.ObjectId(id+"");
    let prof = await Professor.findById(id).populate('pclasses');
    return res.render('professor/professorHome.ejs',{prof});
    /*
    console.log(prof);
    prof.populate('pclasses');
    console.log("##");
    */
    //const allclasses = await Professor.find;
    

})

// const task=id2.substring(24);
//     id2=id2.substring(0,24);


app.listen(3000,()=>{
    console.log("Serving on Port 3000");
})



