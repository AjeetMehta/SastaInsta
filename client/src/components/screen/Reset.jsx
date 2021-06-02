import React,{useState} from "react";
import {useHistory} from "react-router-dom";
import M from "materialize-css";
function Reset() 
{
    const history=useHistory();
    const[email,setemail]=useState("");
    
    function handleChange(e)
    {
      setemail(e.target.value);
    }
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        const res=await fetch("http://localhost:5000/users/reset",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        });
        const data=await res.json();
        console.log(data);
        if(data.error)
         M.toast({html: data.error,classes:"#c62828 red darken-3"});
        else{
        M.toast({html:data.message})
        history.push("/");}
    }
    return(
        <form method="POST" onSubmit={handleSubmit}>
        <div className="mycard">
        <div className="card login-card">
        <h2>Instagram</h2>
        <input onChange={handleChange} value={email} type="text" name="email" placeholder="Email" required></input>
         <button type="submit" className="waves-effect waves-light btn #64b5f6 blue darken-1">Submit</button>
        </div>
        </div>  
        </form> 
    )
}

export default Reset;