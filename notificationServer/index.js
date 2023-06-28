var nodemailer = require('nodemailer');
const express = require('express');
const amqp = require('amqplib');

const app = express()

var connection, channel;
const notificationServiceQueue = 'notification-service-queue';

async function connectToRabbitMQ(){
    const amqpServer = "amqp://guest:guest@localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue(notificationServiceQueue);
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testmails835@gmail.com',
        pass: 'xszsftigzzfuetou'
    }
});

connectToRabbitMQ().then(()=>{
    channel.consume(notificationServiceQueue, (data)=>{
        var mailOptions = {
            from: 'testmails835@gmail.com',
            to: 'atae02elazhari@gmail.com',
            subject: `you have a new borrow request` ,
            text:  data.content.toString()
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        channel.ack(data)
    })
})

app.listen(5001, () => {
    console.log("server started ...");
})