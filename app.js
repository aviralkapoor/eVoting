var express =require('express');
var nodemailer = require('nodemailer');
var path= require('path');
var $ = require('jquery');
var mysql=require('mysql');
const app=express();
var otp=require('./js/otp');

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(path.join(__dirname,"")));


var con=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'behappyalways',
  database:'account'

});
con.connect(function(err) {
 if(err){
   throw err;
 }
 else
 {
 console.log("Database Connected.");
 } 
});
//Database
app.post("/signup",function(request,response){
con.query("insert into acc values('"+request.body.name+"','"+request.body.phn_num+"','"+request.body.pass+"','"+request.body.email+"','"+request.body.gen+"','"+request.body.day+"/"+request.body.month+"/"+request.body.year+"')",function (error) {
  if (error) {
    console.log(error);
    if(error.errno==1062)
    response.json({ message: "Email already in use."});
    else
    response.json({ message: "An error occured."});
  } 
  else {
    response.json({ message: "Account Created." });
  }
});
});

//Verification Email
app.post("/ajax/email",function(request,response){

    const transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
          user: 'evoting84897@gmail.com',
          pass: 'Votingmail@123'
        }
        });
        var email = `${request.body.email}`;
        var code=otp.generateOTP();
        var mailOptions = {
            from: 'evoting84897@gmail.com',
            to: email,
            subject: 'Verification Email',
            html:'<html>Your verification code is:<br><h3>'+code+'</h3>'
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

app.listen(3000, ()=> console.log("Listening at 3000, Connected."));