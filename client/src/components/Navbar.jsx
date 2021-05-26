import React,{useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import M from "materialize-css";

function Navbar()
{
  const history=useHistory();
  const [profile,setprofile]=useState({});
  const token=localStorage.getItem("access_token");

  useEffect(async ()=>{
    await fetch("http://localhost:5000/users/verifykro",{
       method:"POST",
       headers:{
         "Content-Type":"application/json",
         'x-access-token':token
       }
    },[]).then(res=>res.json()).then(data=>{setprofile(data)});
  });

function logout()
{
  localStorage.clear();
  history.push("/")
  M.toast({html: "Logged Out"});
}

  return(
    <nav>
    <div className="nav-wrapper white">
      <Link to="/" className="brand-logo">SastaInsta</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      {profile._id?
      <>
        <li><Link to="/createkro">Post</Link></li>
        <li><Link to="/profile">{profile.name}</Link></li>
        <li><Link onClick={logout} >Logout</Link></li>
        </>
      :
        <>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">SignUp</Link></li>
        </>
          }
      </ul>
    </div>
  </nav>
  )
}

export default Navbar;