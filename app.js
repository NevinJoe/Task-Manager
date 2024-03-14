const express=require('express');
const morgan=require('morgan');

const app=new express;
app.use(morgan('dev'));
app.use(express.json());

// in memory storage for task
let tasks=[];
// route to get all tasks
app.get('/',(req,res)=>{
    res.json(tasks);
})

//route to create a new task
app.post('/tasks',(req,res)=>{
    const task=req.body;
    tasks.push(task);
    res.send({message:"Task Added",tasks})
})

//route to get a task by id
app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const task=tasks.find(task=>task.id===id)
    if(!task)
    {
        res.send("Task not found");
    }
    else
    {
        res.json(task);
    }
})


app.put('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const updatedTask=req.body;
    const index=tasks.findIndex(task=>task.id===id)
    if(index===-1)
    {
        res.send("Task not found");
    }
    else
    {
        tasks.splice(index,1,updatedTask);
        res.send({message:"Task updated sucessfully",tasks})
    }    
})

app.delete('/tasks/:id',(req,res)=>
{
    const id=req.params.id;
    const index=tasks.findIndex(task=>task.id===id)
    if(index===-1)
    {
        res.send("Specified item not found");
    }
    else
    {
        tasks.splice(index,1);
        res.send({message:'Specified item is deleted',tasks});    
    }  
})






app.listen(3005,(req,res)=>{
    console.log('Server is up and running on port 3005');
})