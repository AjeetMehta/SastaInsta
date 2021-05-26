import React,{useState} from "react";
import {Link,useHistory} from "react-router-dom";
import M from "materialize-css";
function SignUp()
{
    const history=useHistory();
    const[registerdata,setregisterdata]=useState({
        name:"",
        email:"",
        password:""
    });
    
    function handleChange(e)
    {
      const name=e.target.name;
      const value=e.target.value;
      setregisterdata({...registerdata,[name]:value});
    }
    
    async function handleSubmit(e)
    {
        e.preventDefault();
        const{name,email,password}=registerdata;
        const res=await fetch("http://localhost:5000/users/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,email,password})
        });
        const data=await res.json();
        console.log(data);
        if(data.error)
         M.toast({html: data.error,classes:"#c62828 red darken-3"});
        else{
        M.toast({html: "Successfully Registered"})
        history.push("/login");}
    }
    return(
        <form method="POST" onSubmit={handleSubmit}>
        <div className="mycard">
        <div className="card login-card">
        <h2>Instagram</h2>
        <input onChange={handleChange} value={registerdata.name} type="text" name="name" placeholder="Name" required></input>
        <input onChange={handleChange} value={registerdata.email} type="text" name="email" placeholder="Email" required></input>
         <input onChange={handleChange} value={registerdata.password} type="password" name="password" placeholder="Password" required></input>
         <button type="submit" className="waves-effect waves-light btn #64b5f6 blue darken-1">Register</button>
         <h5><Link to="/login">Dont have an account?</Link></h5>
        </div>
        </div>  
        </form> 
    )
}

export default SignUp;