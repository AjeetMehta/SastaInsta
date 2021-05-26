var mongoose=require("mongoose");
var User=require("./userdata");

var photo=new mongoose.Schema({
    image:{
        type:String,
        required:[true,"Cant be blank"]
       },
    title:String,
    body:String,
    likes:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:User
    }],
    author:{
      type:mongoose.Schema.Types.ObjectId,
      ref:User
    }
});

blog=mongoose.model("blog",photo);

module.exports=blog;
