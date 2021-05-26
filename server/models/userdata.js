var mongoose=require("mongoose");

var user=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Cant be blank"]
       },
    email:{
        type:String,
        required:[true,"Cant be blank"]
    },
    password:{
        type:String,
        required:[true,"Cant be blank"]
    }
});

people=mongoose.model("people",user);

module.exports=people;
