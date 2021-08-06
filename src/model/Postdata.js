const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false  });
const Schema=mongoose.Schema;
const PostSchema=new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    PostTitle : String,
    CreatedTime : Date,
    Description : String,
    Tag : String,
    Status : String,
    Image : String ,
    Author : String,
    AuthorID : String
   
});

var Post=mongoose.model('post',PostSchema);

module.exports = Post;