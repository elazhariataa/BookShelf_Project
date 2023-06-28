const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookSchema = new Schema({
    id : {type : String, unique : true},
    title : {type : String, required : true},
    author : {type : String, required : true},
    ISBN : {type : String, unique : true},
    publisher : {type : String, required : true},
    genre : {type : String, required : true},
    description : {type : String},
    rating : {type : Number,min : 1,max : 5},
    book_owner : {type : String,required:true},
    image : {type : String},

    
},
    {timestamps : true}
)

module.exports = mongoose.model("books",bookSchema,"books");