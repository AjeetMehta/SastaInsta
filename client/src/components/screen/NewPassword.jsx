import React,{useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import M from "materialize-css";
function NewPassword()
{
    const history=useHistory();
    const {token}=useParams();
    const[password,setpassword]=useState("");
    
    function handleChange(e)
    {
      setpassword(e.target.value);
    }
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        const res=await fetch("http://localhost:5000/users/reset-password",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({password,token})
        });
        const data=await res.json();
        console.log(data);
        if(data.error)
         M.toast({html: data.error,classes:"#c62828 red darken-3"});
        else{
        M.toast({html: data.message});
        history.push("/login");}
    }
    return(
        <form method="POST" onSubmit={handleSubmit}>
        <div className="mycard">
        <div className="card login-card">
        <h2>Instagram</h2>
         <input onChange={handleChange} value={password} type="password" name="password" placeholder="Password" required></input>
         <button type="submit" className="waves-effect waves-light btn #64b5f6 blue darken-1">Reset-Password</button>
        </div>
        </div>  
        </form> 
    )
}

export default NewPassword;