const functions = require('firebase-functions');
const admin = require('firebase-admin');
let serviceAccount = require('./eVoting');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://evoting-c3aea.firebaseio.com"
});

let db = admin.firestore();
var express =require('express');
var session = require('express-session');
var path = require('path');
var nodemailer = require('nodemailer');
const app=express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.post("/ajax/email",function(request,response){

    const transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
          user: 'evoting84897',
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
});

app.post("/login/",function (request,res){
  var email=request.body.email;
  var pass=request.body.password;
  var docRef=db.collection("Users").doc(email);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            if(pass==doc.data().pass)
            {
                request.session.loggedin=true;
                request.session.email=email;
                request.session.username=doc.data().name;
                res.json({ url: "/homepage.html", name: request.session.username });
            }
            else
            {
                res.json({wp:"Wrong Password"});
            }
        } 
        else 
        {
            res.json({nu:"No such User, Please Sign Up first"});
        }
    }).catch(function(error) {
        console.log("Error getting User :", error);
    });

})

exports.app = functions.https.onRequest(app);