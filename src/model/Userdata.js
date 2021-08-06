

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false  });
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    phone:String,
    usertype:String
});

var User=mongoose.model('user',UserSchema);

module.exports = User;