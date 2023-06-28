const express = require('express');
const router = express.Router();
const postModel = require('../Models/postModel');
const userModel = require('../Models/userModel');
const uuid = require('uuid');

//------------------- add post -------------------
router.post('/addpost',(req,res)=>{
    const post = postModel({
        id : uuid.v1(),
        post_content : req.body.post_content,
        poster : req.body.poster,
    })
    post
    .save()
    .then((result)=>{
        res.status(201).send({
            message : "post add successfully",
            
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "post can't be added",
            error
        })
    })
})
//---------------- get all posts ---------------
router.get('/all',(req,res)=>{
    postModel.find({})
    .then((result)=>{
        res.status(201).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "there is no posts",
            error
        })
    })
})
//----------------- get an user posts ------------
router.get('/userPosts/:id',(req,res)=>{
    const user = req.params.id;
    postModel.find({poster : user})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "there is no posts in your database",
            error
        })
    })
})
//---------------- add comment ----------------
router.put("/addComment/:id",(req,res)=>{
    const post = req.params.id;
    postModel.updateOne({id : post},{$push : {comments : req.body}})
    .then((result)=>{
        res.status(201).send({
            message : "comment added successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "comment can't be added",
            error
        })
    })
})
//----------------- add like ----------------
router.put('/addLike/:id',(req,res)=>{
    const post = req.params.id;
    postModel.updateOne({id : post},{$push : {likes : req.body}})
    .then((result)=>{
        res.status(201).send({
            message : "like added successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "like can't be added",
            error
        })
    })
})
//------------------unlike post -------------------
router.put('/unlike/:id',(req,res)=>{
    const post = req.params.id;
    postModel.updateOne({id :post},{$pull : {likes : {liker : req.body.userId}}})
    .then((result)=>{
        res.status(201).send({
            message : "post unliked successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "post can't be unliked",
            error
        })
    })
})
//----------------- save post ------------------
router.put('/savePost/:id',(req,res)=>{
    const user = req.params.id;
    userModel.updateOne({userId : user},{$push : {savedPosts : req.body.id}})
    .then((result)=>{
        res.status(201).send({
            message : "post saved successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "post can't be saved",
            error
        })
    })
})
//--------------- unsave post ------------
router.put('/unsavePost/:id',(req,res)=>{
    const user = req.params.id;
    userModel.updateOne({userId : user},{$pull : {savedPosts : req.body.id}})
    .then((result)=>{
        res.status(201).send({
            message : "post unsaved successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "post can't be unsaved",
            error
        })
    })
})
module.exports = router;