const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    userId : {type : String,unique:true},
    userName : {type:String,required:true,unique:true},
    password: {type:String,required:true},
    email : {type:String,required:true,unique:true},
    bio : {type:String},
    image : String,
    booksCollecion : [String],
    savedPosts : [String]
})

module.exports = mongoose.model("users",userSchema,"users");