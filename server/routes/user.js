var express=require("express");
var mongoose=require("mongoose");
var people=require("../models/userdata");
var jwt=require("jsonwebtoken");
var app=express.Router();
var bcrypt=require("bcrypt");
var saltRounds = 10;
var config ="qwertyuiopasdfghjklzxcvbnm1234567890";
var VerifyToken = require('../middleware/verify');

app.get("/",function(req,res){
    people.find({},function(err,found){
        if(err)
         res.status(400).send(err);
        else
         res.send(found);
    })
})

app.post("/register",function(req,res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  var name=req.body.name;
  var email=req.body.email;
  var password=hash;
  var item={name:name,email:email,password:password}
  people.create(item,function(err,new_customer){
    if(err)
    res.status(400).send(err);
    else
      res.send({message:"Registration Successful"});
  });
  });
})


app.post("/login",VerifyToken.isLoggedIn,function(req,res){
  var email=req.body.email;
  var password=req.body.password;

  people.findOne({email:email},function(err,found){
    if(!found)
     res.status(400).send({error:"Email is not registered"});
    else{
      bcrypt.compare(password,found.password, function(err, result) {
        if(result==true){
          console.log("Logged In")
          const token=jwt.sign({_id:found._id},config,{expiresIn:86400});
          res.send({token:token});
         }
        else
          res.send({error:"Wrong Password"});
      })
        }
    });
})

app.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

// app.get("/:customernaam",function(req,res){
//     customer.find({name:req.params.customernaam},function(err,payagaya){
//         if(err)
//          console.log(err);
//         else if(payagaya.length===0)
//          res.status(400).send(req.params.customernaam.toUpperCase() + " Not Found");
//         else
//          res.send(payagaya)
//     })
// })

app.get("/:customernaam",function(req,res){
  people.findById(req.params.customernaam,function(err,payagaya){
      if(err)
      res.status(400).send(err);
      else if(payagaya.length===0)
       res.status(400).send(req.params.customernaam.toUpperCase() + " Not Found");
      else
       res.send(payagaya)
  })
})

app.put("/:id",function(req,res){
 people.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,updated_user){
      if(err)
      res.status(400).send(err);
      else{
       console.log("updated");
       res.send(updated_user);}
  });
});

app.delete("/:id",function(req,res){
    people.findByIdAndRemove(req.params.id,function(err,deleted_user){
        if(err)
        res.status(400).send(err);
        else{
         console.log("deleted");
         res.send(deleted_user);}
    });
  });

app.post("/verifykro",VerifyToken.verifyToken, function(req,res){
  people.findById(req.userId,function(err,payagaya){
    res.send(payagaya);
  })
})

app.put("/like",VerifyToken.verifyToken,function(req,res){
  people.findById(req.userId,function(err,payagaya){
    if(err)
     res.send(err);
    else{
     payagaya.likes.push(req.userId);
     console.log(payagaya.likes);}
  });
});

app.get('*', (req, res) => {
	res.status(404).send('404 NOTHING TO SEE HERE...')
});


module.exports=app;
