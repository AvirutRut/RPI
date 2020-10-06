const mongoose=require('mongoose');
var express=require("express");
const { strict } = require('assert');

var app=express();
mongoose.set('debug',true)
mongoose.connect('mongodb://localhost/s60030112',{useNewUrlParser: true, useUnifiedTopology: true});
const myModel=mongoose.model('Rut',new mongoose.Schema({Profile : String, name: String, surname: String, email : String, Education : String, picUrl: String}));
var query=myModel.where({email:'60030112@kmitl.ac.th'});
app.use(express.static(__dirname + '/public'));
app.get('/',(req,res)=>{
    query.findOne((err, data)=>{
        if(!err){
        //    res.json(data);  
   var html=
    "<html>"+
    "<title> My profile </title>"+
    "<head>"+
    "<link rel='stylesheet' type='text/css' href='background.css'>"+
    "</head>"+
    "<body>"+
    "<b><center>Profile</center></b>"+
    "<p><center><img class='' src='"+data.picUrl+"' ></center></p>"+
    "<h3><center>Name : "+data.name+" " +data.surname+"</center></h3>"+
    "<h4><center>Email : "+data.email+"</center></h4>"+
    "<h1><center>"+data.Education+"</center></h1>"+
    "</body>"+
    "</html>";
    res.send(html);
        }
    });

});
app.listen(3014)