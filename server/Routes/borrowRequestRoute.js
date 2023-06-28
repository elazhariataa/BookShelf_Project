const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const amqp = require('amqplib');
const borrowRequestModel = require('../Models/borrowRequestModel');

//----------------------
const notificationServiceQueue = 'notification-service-queue';
const borrowRequestService = 'borrowRequest-service-queue';
var connection, channel;

async function connectToRabbitMQ(){
    const amqpServer = "amqp://guest:guest@localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue(borrowRequestService);
    await channel.assertQueue(notificationServiceQueue);
}
connectToRabbitMQ();

//---------------- add request ----------------
router.post('/addRequest',(req,res)=>{
    const borrowRequest = borrowRequestModel({
        id : uuid.v1(),
        borrowed_book : req.body.borrowed_book,
        borrower_adress : req.body.borrower_adress,
        borrower_emeil : req.body.borrower_emeil,
        borrower_phone : req.body.borrower_phone,
        send_at : req.body.send_at,
        period : req.body.period,
        borrower_notes : req.body.borrower_notes,
        borrower : req.body.borrower,
        lender : req.body.lender,
    })
    borrowRequest
    .save()
    .then((result)=>{
        channel.sendToQueue(notificationServiceQueue, Buffer.from(JSON.stringify(result)));
        res.status(200).send({
            message : "request cretaed successfully",
            result
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "request can' be created",
            error
        })
    })
})
//------------------- get all requests -----------------
router.get('/all',(req,res)=>{
    borrowRequestModel.find({})
    .then((requests)=>{
        res.status(200).json(requests)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "there is no requests",
            error
        })
    })
})
//------------------ edite request state -----------
router.put('/decesion/:id',(req,res)=>{
    const id = req.params.id;
    borrowRequestModel.updateOne({id : id},{request_state : req.body.desecion})
    .then((result)=>{
        res.status(200).send({
            message : "updated successfully",
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "the request State can't be updated",
            error
        })
    })
})

module.exports = router;