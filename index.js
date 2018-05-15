var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.send("hello node");
});

app.post('/send',function(req,res){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fake@gmail.com',
      pass: 'fake'
    }
  });

  var mailOption = {
    from: 'dineshsmart101',
    to: 'dineshsmart101.dm@gmail.com',
    subject: 'Testing nodemailer',

    html: '<li>'+req.body.name+'</li>'+'<li>'+req.body.email+'</li>'+'<li>'+req.body.message+'</li>'
  };

 transporter.sendMail(mailOption,function(err, info){
   if(info){
    res.redirect('/');
   }
   else {
     console.log(err);
   }
 });
});

app.listen(8080, function(){
  console.log("server is runnning in port 8080");
});
