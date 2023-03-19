const express = require('express');
const path= require('path');   
const mongoose = require('mongoose'); 
const methodOverride = require('method-override');
const app =express();
const morgan= require('morgan');
const Student = require('./models/student.js');
const Professor = require('./models/professor.js');
const Class = require('./models/class.js');
const Task = require('./models/task.js');

const ejsMate =require('ejs-mate');
const Joi = require('joi');



//app.use(morgan('tiny'));//logs details of every http request made to the server onto the terminal

app.use(morgan('tiny'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.engine('ejs',ejsMate);

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));


// mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/hout',{
    useNewUrlParser:true,
    //useCreateIndex:true,//now unsupported
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
    const dup = Professor.find({uid:uid});
    if(dup.lenght)res.send('Please try another UID/name');
    //prevent duplicate uid

    const prof = new Professor({name:name, uid:uid});
    await prof.save();
   
    
    res.redirect(`/professor/${prof._id.toString()}`) ;   
    
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

app.get('/professor/:id/class/new',async (req,res,next)=>{
    
    const {id}= req.params;
    const prof = await Professor.findById(id).populate('pclasses');
    res.render('class/new.ejs',{prof});
})

app.post('/professor/:id/class/new',async (req,res,next)=>{
    
    const {name}= req.body;
    const newClass= new Class({name:name, key:Math.floor(Math.random()*1000)+1});
    await newClass.save();

    const {id}= req.params;
    const prof=await Professor.findById(id).populate('pclasses');
    
    prof.pclasses.push(newClass._id.toString());
    await prof.save();
    
    prof.populate('pclasses');
   
    res.redirect(`/professor/${prof._id.toString()}`);

})
app.post('/professor/:id1/class/:id2/task',async(req,res,next)=>{
    // console.log("ok4");
    // return res.send("ok4");
   let {id1,id2} = req.params;
   const {name,text}= req.body;
   id1= new mongoose.Types.ObjectId(id1+"");
   id2= new mongoose.Types.ObjectId(id2+"");
   console.log(id2);
   //res.send("ok");
   const prof_= await Professor.findById(id1);
   const class_= await Class.findById(id2);
   //class_.tasks.push(task);
   const task_= new Task({name:name ,text:text,parentClass:id2,key:Math.floor(Math.random()*10000)+1});
   await task_.save();
   await class_.populate('students');
   for(x of class_.students){
    
    console.log(x);
    const tid= task_._id.toString();
    x.tasks.set(tid,-1);
    await x.save();
    console.log(x);
}

   //console.log(task);


   await class_.save();
//    class_.populate('students');
   /*for(x of class_.students){
    // class_.populate('students')
        let stud_ = await Student.findById(x);
        console.dir(stud_);
        stud_.tasks.push({task:task,eval:-1});
     
       
    // console.log(x);
    // console.log(task);
    // stud_.tasks[task]=-1;
    await stud_.save();
   }
   */
  res.redirect(`/professor/${prof_._id}/class/${class_._id}`);

   
})


app.get('/professor/:id1/class/:id2/task/new',async (req,res,next)=>{

    let {id1,id2} = req.params;
    id1= new mongoose.Types.ObjectId(id1+"");
    console.log("ok0",id1,id2);
    
    id2=id2.substring(1);
    id2= new mongoose.Types.ObjectId(id2+"");
     console.log("ok1");
    
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
    let selected_=[];
  
    let f=0;
    if(class_.students.length!=0){
        for([key,value] of class_.students[0].tasks){
        
            if(key.length!=24)continue;        
            const id =new mongoose.Types.ObjectId(key);
            
            const task_ = await Task.findById(id);
            if(task_.parentClass.toString()===class_._id.toString()){
                selected_.push({full:task_,key:task_.name,value:value,desc:task_.text});
            }
    
        }
        if(f)res.send("No student enrolled");
        let obj = {arr:selected_};
        res.render('professor/taskHome.ejs',{prof_,class_,obj});
    

    }
    else res.send("No students enrolled");
   

})

app.get('/professor/:id',async (req,res)=>{
    

    let {id} = req.params;
    id = new mongoose.Types.ObjectId(id+"");
    let prof = await Professor.findById(id).populate('pclasses');
    return res.render('professor/professorHome.ejs',{prof});
    
    

})

/*******************************************************************************************************/
/*******************************************************************************************************/


app.get('/task/:id/students',async(req,res,next)=>{
    let {id}= req.params;
    id= new mongoose.Types.ObjectId(id+"");
    
    const task_ = await Task.findById(id).populate('parentClass');
    let class_ =task_.parentClass;
    await class_.populate('students');
    let stud_= class_.students;
    const obj = {arr:stud_};
    


   
    res.render('task/status.ejs',{obj});
    
})


/*******************************************************************************************************/
/*******************************************************************************************************/
/*******************************************************************************************************/

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
  
    res.redirect(`/student/${student._id}`);
  });
  
  // Renders form for login
  app.get('/student/enter',(req,res)=>{
    res.render('student/login');
  })
  
  app.post('/student/enter',async(req,res)=>{
    const {roll,password}=req.body;
    const stud = await Student.find({roll:roll,password:password});
    console.log(stud);
    if(stud.length)res.redirect(`/student/${stud[0]._id.toString()}`);
    else res.send("Incorrect Credentials");
  });
  
  
  app.get('/student/:id/class/join',async(req,res,next)=>{
    let {id}=req.params;
    id = new mongoose.Types.ObjectId(id+"");
    const stud =await Student.findById(id);
    res.render('class/join.ejs',{stud});
})



  app.get('/student/:id1/class/:id2',async (req,res)=>{
    
    let {id1,id2}=req.params; 
    console.log(id1,"*****",id2);
    id1= new mongoose.Types.ObjectId(id1+"");
           console.log("ok3");
    id2= new mongoose.Types.ObjectId(id2+"");
    console.log("ok4");
    const stud_ = await Student.findById(id1);
    console.log("ok5");
    const taskNames =[];
    for([key,value] of stud_.tasks){
        if(key.length!=24)continue;
       const id =new mongoose.Types.ObjectId(key+"");
       const task_=await Task.findById(id).populate('parentClass');;
       taskNames.push(task_.name);
               
    }
    const obj={arr:taskNames};
    res.render('student/taskHome.ejs',{stud_,obj});

     
  })

app.post('/student/:id1/task/:id2/submit',async (req,res)=>{
    let {id1,id2}= req.params;
    id1= new mongoose.Types.ObjectId(id1+"");
    id2= new mongoose.Types.ObjectId(id2+"");
    const stud_ = await Student.findById(id1);
    stud_.tasks[id2.toString()]=0;
    await stud_.save();
    res.redirect(`/student/${id1}`);

})
app.post('/student/:id/class/join',async(req,res,next)=>{
    let {id}=req.params;
    const{key} = req.body;
    const stud =await Student.findById(id);
    const class_= await Class.findOne({key:key});
    stud.classes.push(class_);
    await stud.save();
    class_.students.push(stud);
    await class_.save();
    res.redirect(`/student/${id.toString()}`);
    
    
  })

  app.get('/student/:id',async (req,res)=>{//err
    console.log(req.params);
    let {id} = req.params;
    id = new mongoose.Types.ObjectId(id+"");
    const stud = await Student.findById(id).populate('classes');
    res.render('student/studentHome.ejs',{stud})
    

})


// app.use((err,req,res,next)=>{
//     res.send("Something went wrong !!")
// })



app.listen(3000,()=>{
    console.log("Serving on Port 3000");
})



