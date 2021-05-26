import React,{useState} from "react";
import {useHistory} from "react-router-dom";
import M from "materialize-css";

function CreatePost()
{
  const history=useHistory();
  const [image,setImage]=useState("");
  const [userPost,setPost]=useState({
  title:"",
  body:""
});

function handleChange(e)
{
  const name=e.target.name;
  const value=e.target.value;
  setPost({...userPost,[name]:value});
}

async function handleSubmit(e)
{
  e.preventDefault();
  console.log("Hello");
  const formData = new FormData();
  formData.append('file',image);
  formData.append('upload_preset',"SastaInsta");
  formData.append('cloud_name',"mehta1234");
  fetch('https://api.cloudinary.com/v1_1/mehta1234/image/upload', {
  method: "POST",
  body: formData
  }).then(res=>res.json()).then(data=>{setImage(data.url)})
   

  const{title,body}=userPost;
  const token=localStorage.getItem("access_token");
  const result=await fetch("http://localhost:5000/posts/create",{
    method:"POST",
      headers:{
        "Content-Type":"application/json",
        "x-access-token":token
     },
     body:JSON.stringify({title,body,image})
   });
   const data1=await result.json();
   console.log(data1)
   if(data1.error)
     M.toast({html: data1.error,classes:"#c62828 red darken-3"});
   else{
      M.toast({html: "Successfully createdPost"})
      history.push("/");}
 }
    return(
        <form method="POST" onSubmit={handleSubmit}>
        <div className="card input-field" style={{margin:"50px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}>
          <h3>CreatePost</h3>
          <input name="title"  type="text" placeholder="title" onChange={handleChange} value={userPost.title}></input>
          <input name="body" type="text" placeholder="body" onChange={handleChange} value={userPost.body}></input>
          <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload_Image</span>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}></input>
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" placeholder="Upload one or more files"></input>
          </div>
          </div>
          <button type="submit" className="waves-effect waves-light btn #64b5f6 blue darken-1">Submit Post</button>
        </div>
        </form>  
    )
}

export default CreatePost;