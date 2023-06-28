const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/public', express.static('public'));

//-------------- Routes ----------------
const userRoute = require('./Routes/userRoute');
const bookRoute = require('./Routes/bookRoute');
const borrowRequestRoute = require('./Routes/borrowRequestRoute');
const postRoute = require('./Routes/postRoute');

//------------------ get  envirement variables ------------------
const port = process.env.PORT;
const url = process.env.URL_MONGOOSE;
const dbname = process.env.DBNAME;

//-------------------- connect to database -------------------
mongoose.connect(`${url}/${dbname}`,{useNewUrlParser : true});
const db = mongoose.connection;

db.on("error",(error)=>{
    console.log("Database connection error",error);
})

db.once("open",function(){
    console.log("connected to database successfully...")
})

//-------------------- use Routes ----------------
app.use('/user',userRoute);
app.use('/book',bookRoute);
app.use('/borrowRequest',borrowRequestRoute);
app.use('/post',postRoute)

//-------------- server listening -----------------
app.listen(port,()=>{
    console.log("server started ...")
})