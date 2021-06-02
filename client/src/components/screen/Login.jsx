import React,{useEffect, useState} from "react";
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css";

function Login()
{
    const history=useHistory();
    const[userdata,setuserdata]=useState({
        email:"",
        password:""
    });
    
    function handleChange(e)
    {
      const name=e.target.name;
      const value=e.target.value;
      setuserdata({...userdata,[name]:value});
    }
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        const{email,password}=userdata;
        const res=await fetch("http://localhost:5000/users/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        });
        const data=await res.json();
        if(data.error)
         M.toast({html: data.error,classes:"#c62828 red darken-3"});
        else{
        localStorage.setItem("access_token",data.token);
        M.toast({html: "Successfully LoggedIn"})
        history.push("/");}
    }
    

    useEffect(()=>{
        const token=localStorage.getItem("access_token");
        tokenCheck();

        async function tokenCheck()
        {
         const res=await fetch("http://localhost:5000/users/login",{
         method:"POST",
         headers:{
             "Content-Type":"application/json",
             'x-access-token':token
         }
        });
        const data=await res.json();
    }
},[]);

    return(
        <form method="POST" onSubmit={handleSubmit}>
        <div className="mycard">
        <div className="card login-card">
        <h2>Instagram</h2>
         <input onChange={handleChange} value={userdata.email} type="text" name="email" placeholder="Email" required></input>
         <input onChange={handleChange} value={userdata.password} type="password" name="password" placeholder="Password" required></input>
         <button type="submit" className="waves-effect waves-light btn #64b5f6 blue darken-1">SignIn</button>
         <h5><Link to="/signup">Already have an account?</Link></h5>
         <h5><Link to="/reset">Forgot Password?</Link></h5>
        </div>
        </div>     
        </form>
    )
}

export default Login;