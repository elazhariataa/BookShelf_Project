const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    id : {type : String, required : true, unique : true},
    post_content : {type : String, required : true},
    poster : {type : String, required : true},
    likes : [{liker : String,liked_at : String}],
    comments : [{content : String,commenter : String,commented_at : String}],
},
    {timestamps : true}
)

module.exports = mongoose.model("posts",postSchema,"posts");