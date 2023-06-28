const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

//--------------------- register ---------------
router.post('/register',(req,res)=>{
    bcrypt
    .hash(req.body.password,10)
    .then((hashedPassword)=>{
        const user = userModel({
            userId : uuid.v1(),
            userName : req.body.userName,
            password : hashedPassword,
            email : req.body.email
        })
        user
        .save()
        .then((result)=>{
            res.status(201).send({
                message : "User Created Successfully",
                result
            })
        })
        .catch((err)=>{
            res.status(500).send({
                message : "Error creating user",
                err
            })
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "Password was not hashed successfully",
            error
        })
    })
})
//---------------------------- Login ------------------------------
router.post('/login',(req,res)=>{
    userModel.findOne({email : req.body.email})
    .then((user)=>{
        bcrypt.compare(req.body.password,user.password)
        .then((passwordChecked)=>{
            if(!passwordChecked){
                return res.status(400).send({
                    message : "password doesn't match"
                })
            }
            const token= jwt.sign(
                {
                    userId : user.userId,
                    userEmail : user.email
                },
                "user-token",
                {expiresIn : "24h"}
            )
            res.status(200).send({
                message : "login successfully",
                userId : user.userId,
                userName : user.userName,
                email : user.email,
                token,
            })
        })
        .catch((err)=>{
            res.status(400).send({
                message : "password doesn't match",
                err
            })
        })
    })
    .catch((error)=>{
        res.status(404).send({
            message : "email not found",
            error
        })
    })
})
// ---------------------- get all users -------------------
router.get('/all',(req,res)=>{
    userModel.find({})
    .then((users)=>{
        res.status(201).json(users)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "there is no users",
            error
        })
    })
})
//----------------- get a specified user ---------------------
router.get('/speUser/:id',(req,res)=>{
    const user = req.params.id
    userModel.findOne({userId : user})
    .then((result)=>{
        res.status(201).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "user not found",
            error
        })
    })
})
//-------------------- update user info ---------------------
router.put('/updateInfo/:id',(req,res)=>{
    const user = req.params.id;
    userModel.updateOne({userId : user},{
        userName : req.body.userName,
        email : req.body.email,
        bio : req.body.bio,
    })
    .then((result)=>{
        res.status(201).send({
            message : "user updated successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "user can't be updated",
            error
        })
    })
})
module.exports = router