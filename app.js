const express=require("express");
const app=express();
const cors=require("cors");
const jwt=require("jsonwebtoken");
const User=require("./src/model/Userdata");
const Post=require("./src/model/Postdata")

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 

email="admin@gmail.com"
password="Admin123@"

app.post('/login', (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");

      
      if(req.body.email=="admin@gmail.com" && req.body.password=="Admin123@"){
        let payload={subject:email+password}
        let token=jwt.sign(payload,'secretKey')  
        res.status(200).send({token})
        console.log("token")
      }
      else{
        User.findOne({email: req.body.email, password:req.body.password},function(err,user){

          if(!user){ 
            res.status(401).send('User not registered')
          }
          else{
           res.status(200).send({user})
           console.log("success")
          }
        })
      }
      })


      app.post('/signup', (req, res) => {
        res.header("Access-Control-Allow-Origin","*")
        res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
        console.log(req.body);
           User.findOne({email : req.body.email}).exec(function(err,user){
          console.log(user);
          if(user) {
             res.status(200).send({user})
            console.log("user exists");
          } 
    
          else{
    
           var data = {
                firstname : req.body.firstname,
                lastname: req.body.lastname,
                email : req.body.email,
                password : req.body.password,
                phone: req.body.phone,
                usertype: req.body.usertype
      }
      var data = new User(data);
      data.save();  
      }
    })
    })
    
    app.get('/users', function(req,res){
      User.find()
      .then(function(users){
          // console.log(res.body.users.name);
          res.send(users);
      })
      .catch(err => {
          console.log(err);
      });
  });


///
app.post('/createpost' ,function(req, res){
  //console.log(req.body);
  const mongoose = require('mongoose');
  var newpost = {
      _id : new mongoose.Types.ObjectId(),
     
      PostTitle : req.body.newpost.PostTitle,
      CreatedTime : req.body.newpost.CreatedTime,
      Description : req.body.newpost.Description,
      Tag : req.body.newpost.Tag,
      Image : req.body.newpost.Image,
      Author : req.body.newpost.Author,
      AuthorID : req.body.newpost.AuthorID,
      Status : req.body.newpost.Status
  };
  var newpost = new Post(newpost);
  newpost.save();
});

app.get('/posts/:id', function(req, res){
   
      res.header("Access-Control-Allow-Origin","*");
       res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
       const id =req.params.id
            Post.find({"AuthorID": id})
         .then(function(posts){
           console.log(posts)
               res.send(posts);     

   });
});

app.get('/post/:id', function(req, res){
   
  res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
   const id =req.params.id
      Post.findOne({"_id": id})
     .then(function(posts){
      
           res.send(posts);     

});
});

app.get('/user/:id', function(req, res){
   
  res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
   const id =req.params.id
      User.findOne({"_id": id})
     .then(function(user){
      
           res.send(user);     

});
});


app.post('/approvepost',function(req,res){
 
  var id=req.body._id;
 var status="approved";
  Post.findByIdAndUpdate({"_id":id},
  {
      $set: {
          "Status":status
      }
  
  })
      .then(function(){
          res.send();
      })
 
})

app.post('/editpost',function(req,res){
 
  var id=req.body._id;
  
  Post.findByIdAndUpdate({"_id":id},
  {
    $set: {
      "PostTitle" : req.body.PostTitle,
      "CreatedTime" : req.body.CreatedTime,
      "Description" : req.body.Description,
      "Tag" : req.body.Tag,
      "Image" : req.body.Image,
      "Author" : req.body.Author,
      "AuthorID" : req.body.AuthorID,
      "Status" : req.body.Status
    }
  
  })
      .then(function(){
          res.send();
      })
 
})
  
  


app.get('/posts',function(req,res){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
   Post.find()
    .then(function(posts){
      console.log()
          res.send(posts);           
      })    

    });

    app.get('/blogpost',function(req,res){
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
       Post.find({"Status":"approved"})
        .then(function(posts){
          console.log()
              res.send(posts);           
          })    
    
        });

        app.post('/blogspost',function(req,res){
          res.header("Access-Control-Allow-Origin","*");
          res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT,DELETE,OPTIONS ");
          var Tag=req.body.new
          Post.find({"Tag":Tag})
            .then(function(posts){
              console.log()
                  res.send(posts);           
              })    
        
            });


app.listen(8000,()=>{
    console.log("Server Ready at 8000");
});

