const express=require("express");
const path=require("path");
const app=express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/test');
const port=80;
// define mongoose schema
var contactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Address: String,
    Desc: String

  });
  var contact = mongoose.model('contact', contactSchema);
//EXPRESS SPECIFIC STUFF 
app.use('/static', express.static('static'));//for serving static file
app.use(express.urlencoded());
//PUG SPECIFIC STUFF
app.set('view engine','pug')//set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory
//ENDPOINTS
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params);
});
app.post('/contact',(req,res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
   
});

//START THE  SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);
});