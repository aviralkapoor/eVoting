var express =require('express');
var nodemailer = require('nodemailer');
var path= require('path');
var $ = require('jquery');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(path.join(__dirname,"")));

app.post("/ajax/email",function(request,response){

    const transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
          user: 'evoting84897@gmail.com',
          pass: 'Votingmail@123'
        }
        });
        var email = `${request.body.email}`;
        var mailOptions = {
            from: 'evoting84897@gmail.com',
            to: email,
            subject: 'Verification Email',
            html: '<html><h4>Under Maintenance</h4></html>'
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