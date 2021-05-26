var express=require("express");
var mongoose=require("mongoose");
var cors = require("cors");
var nodemailer=require("nodemailer");
var app=express();
mongoose.connect("mongodb://localhost/insta",{useNewUrlParser:true},{useUnifiedTopology:true});

var userRoute=require('./routes/user');
var postRoute=require("./routes/post");


app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/users',userRoute);
app.use('/posts',postRoute);

var transport=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"ajeet2000mehta@gmail.com",
        pass:"ajeet@1234"
    }
});

var mailOptions={
    from:"noreply@gmail.com",
    to:email,
    subject:"Email Confirmation",
    html:`<b>Press</b><a href:http://localhost:5000/req.userId></a><b>to verify mail </b>`
};

transport.sendMail(mailOptions,function(error,response){
  if(error)
   console.log(error);
  else
   console.log("Message Sent");
});


app.listen("5000",function(){
    console.log("Our Insta_Clone app is running");
})
