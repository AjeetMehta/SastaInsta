var express=require("express");
var mongoose=require("mongoose");
var blog=require("../models/postdata");
var app=express.Router();
var VerifyToken = require('../middleware/verify');
var people=require("../models/userdata");

app.get("/mypost",VerifyToken.verifyToken, function(req,res){
    blog.find({author:req.userId}).populate("author").exec(function(err,found){
        if(err)
         res.status(400).send(err);
        else{
         console.log(found);
         res.send(found);}
    });
});

app.post("/create",VerifyToken.verifyToken,function(req,res){
  console.log("Create");
  var title=req.body.title;
  var image=req.body.image;
  var body=req.body.body;
  var author;

  people.findById(req.userId,function(err,found){
    if(err)
      res.status(400).send("Something went wrong");
    else
      author=found;
  var item={title:title,body:body,image:image,author:author}
  console.log(item);
  if(!title || !body || !image || !author)
   return res.status(400).send({error:"Enter all fields"});
  else{
   blog.create(item,function(err,new_item){
    if(err)
    res.status(400).send(err);
    else{
      console.log("Item posted");
      res.send(new_item);}
  });
    }
  });
});

app.get("/allpost", function(req,res) {
  blog.find({}).populate("author").exec(function(err,payagaya){
    if(err){
    console.log(err);
     res.status(400).send(err);}
    else{
     res.send(payagaya);}
  });
});

app.get("/:naampost",function(req,res){
  blog.findById(req.params.naampost,function(err,payagaya){
      if(err)
      res.status(400).send(err);
      else if(payagaya.length===0)
       res.status(400).send(req.params.naamsabzi.toUpperCase() + " Not Found");
      else
       res.send(payagaya);
  });
});

app.put("/:id",VerifyToken.verifyToken, function(req,res){
 blog.findById(req.params.id,function(err,found){
   if(found!=undefined && req.userId==found.author){
    blog.findByIdAndUpdate(req.params.id,req.body,{new:true},function(err,updated_item){
        if(err)
        res.status(400).send(err);
        else{
         console.log("updated");
         res.send(updated_item);}
    });
  }
  else
    res.status(404).send("U dont have permission to do this");
 });
});

app.delete("/:id",VerifyToken.verifyToken, function(req,res){
   blog.findById(req.params.id,function(err,found){
    if(req.userId==found.author){
    blog.findByIdAndRemove(req.params.id,function(err,deleted_item){
        if(!deleted_item)
        res.status(400).send("Item Not Found");
        else{
         console.log("deleted");
         res.send(deleted_item);}
       });
     }
     else
      res.send("U dont have permission to do this");
    });
  });


app.get('*', (req, res) => {
	res.status(404).send('404 NOTHING TO SEE HERE...')
});


module.exports=app;
