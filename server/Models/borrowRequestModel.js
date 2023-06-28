const mongoose = require('mongoose');
const {Schema} = mongoose;

const borrowRequestSchema = new Schema({
    id : {type : String,unique : true,required : true},
    borrowed_book : {type : String,required : true},
    borrower_adress : {type : String,required : true},
    borrower_emeil : {type : String,required : true},
    borrower_phone : {type : String,required : true},
    send_at : {type : String,required : true},
    period : {type : Number,required : true},
    borrower_notes : {type : String},
    borrower : {type : String,required : true},
    lender : {type : String,required : true},
    request_state : {type : String,required : true,default : "pending"},
})

module.exports = mongoose.model("borrowRequests",borrowRequestSchema,"borrowRequests");