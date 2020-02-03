const functions = require('firebase-functions');
var express =require('express');
var nodemailer = require('nodemailer');
const app=express();


app.post("/ajax/email",function(request,response){

    const transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
          user: 'evoting84897@gmail.com',
          pass: 'Votingmail@123'
        }
        });
        var email = `${request.body.email}`;
        var code=`${request.body.code}`;
        var mailOptions = {
            from: 'evoting84897@gmail.com',
            to: email,
            subject: 'Verification Email',
            html:'<html>Your verification code is:<br><h3>'+code+'</h3></html>'
            };
          
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
               response.json({ message: "An error occured."});
            } 
            else {
              response.json({ message: 'Verification code sent.' });
            }
            });
            return code;
});

exports.app = functions.https.onRequest(app);