const express = require('express');
const router = express.Router();
const bookModel = require('../Models/bookModel');
const userModel = require('../Models/userModel')
const uuid = require('uuid');
const fs = require('fs');
const upload = require('../Middleware/fileUploadMiddleware');

// -------------- addBook ------------------
router.post('/addBook', upload.single('image'), (req,res)=>{
    const url = req.protocol + '://' + req.get('host')
    const book = bookModel({
        id : uuid.v1(),
        title : req.query.title,
        author : req.query.author,
        ISBN : req.query.ISBN,
        publisher : req.query.publisher,
        genre : req.query.genre,
        description : req.query.description,
        rating : req.query.rating,
        add_at : req.query.add_at,
        book_owner : req.query.book_owner,
        image : url + '/public/' + req.file.filename
    })
    book
    .save()
    .then((result)=>{
        res.status(201).send({
            message : "book created successfully",
            result
        })
        userModel.updateOne({userId : book.book_owner},{$push : {booksCollecion : book.id}})
        .then((updatedUser)=>{
            res.status(201)
        })
        .catch((err)=>{
            res.status(500)
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "book can't be created",
            error
        })
    })
    
})
//----------------------- get all books -----------------------
router.get('/all',(req,res)=>{
    bookModel.find({})
    .then((books)=>{
        res.status(201).json(books)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "there is no books",
            error
        })
    })
})
//----------------------- get specified book -------------
router.get('/spBook/:id',(req,res)=>{
    const id = req.params.id;
    bookModel.findOne({id : id})
    .then((book)=>{
        res.status(201).json(book)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "book not found",
            error
        })
    })
})
//--------------- get user books collection -----------------
router.get('/userCollection/:id',(req,res)=>{
    const user = req.params.id
    bookModel.find({book_owner : user})
    .then((result)=>{
        res.status(201).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "you don't have any books in your collection",
            error
        })
    })
})
module.exports = router;

