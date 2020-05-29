const express= require('express');
const bodyParser=require('body-parser');
const Post= require('./models/model');
const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://sohame:pAr3T6IhNN3s7LMT@cluster0-sgwbe.mongodb.net/node-angular1?retryWrites=true&w=majority")
.then(()=>{
    console.log("Boss Database has been connected, and it's running properly !")
})
.catch(()=>{
    console.log("Connection failed")
})

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
  })

  app.post('/api/posts',(req,res)=>{
  //  console.log("server is running in post1")
    let mes="post fetched succss"
    const post=new Post({
        title:req.body.title,
        content:req.body.content
    });
    post.save()
    console.log(post)
   // console.log("server is running in post2")
    res.status(201).json({
        message:mes
    })
})

app.use('/api/posts',(req,res)=>{
    console.log("boss server is running in get request")
    Post.find()
    .then(document=>{
        console.log(document)
        res.status(200).json({
            message:'posts fetched succss-fully',
           posts:document
        })
    }) 
})

app.delete("/api/posts/:id")

module.exports = app;