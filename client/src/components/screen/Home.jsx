import React,{useState,useEffect} from "react";

function Home()
{
  const [data,setdata]=useState([]);
  const [like,setlike]=useState();
  useEffect(async ()=>{
      const res=await fetch("http://localhost:5000/posts/allpost",{
         method:"GET",
         headers:{
             "Content-Type":"application/json"
         }
        }).then(res=>res.json()).then(data=>{setdata(data);})
  },[]); 
  
  async function handleclick()
  {
    const token=localStorage.getItem("access_token");
    await fetch("http://localhost:5000/posts/allpost",{
      method:"PUT",
      headers:{
          "Content-Type":"application/json",
          'x-access-token':token
      }
     }).then(res=>res.json()).then(data=>{setdata(data);})
  }

    return(
        <div className="myhome">
        {data.map(item=>(
          <div className="card home-card">
            <h3>{item.author.name}</h3>
            <div className="card-image">
              <img src={item.image}/>
            </div>
            <div className="card-content">
            <i onClick={handleclick} className="material-icons" style={{color:"red"}}>favorite</i>
              <h6>{item.likes.length}</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="comment"></input>
            </div>
          </div>
        ))}
        </div>
    )
}

export default Home;