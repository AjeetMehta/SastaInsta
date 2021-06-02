import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";

function Home() {
  const [data, setdata] = useState([]);
  const [like, setlike] = useState([]);
  const [comment, setcomment] = useState([]);

  useEffect(async () => {
    const res = await fetch("http://localhost:5000/posts/allpost", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
      });
  }, [like, comment]);

  async function handleclick(id) {
    const token = localStorage.getItem("access_token");
    await fetch("http://localhost:5000/posts/likes/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((dat) => {
        setlike(dat.likes.length);
      });
  }

  async function deleteclick(id) {
    const token = localStorage.getItem("access_token");
    await fetch("http://localhost:5000/posts/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((del) => {
        if (del.error) M.toast({ html: del.error });
        else M.toast({ html: "Successfully deleted" });
      });
  }

  async function editclick(id) {
    const token = localStorage.getItem("access_token");
    await fetch("http://localhost:5000/posts/create/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((del) => {
        if (del.error) M.toast({ html: del.error });
        else M.toast({ html: "Successfully Edited" });
      });
  }

  function makecomment(text, postId) {
    const token = localStorage.getItem("access_token");
    fetch("http://localhost:5000/posts/comments/" + postId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((beta) => {
        setcomment(beta);
      });
  }

  return (
    <div className="myhome">
      {data.map((item) => (
        <div className="card home-card">
          <h3>
            {
              <img
                style={{ width: "35px", height: "35px", borderRadius: "15px" }}
                src={item.author.photo}
              ></img>
            }
            <Link to={"/dusrekaprofile/" + item.author._id}>
              {item.author.name}
            </Link>
            <i
              className="material-icons"
              style={{ color: "grey", cursor: "pointer", float: "right" }}
              onClick={() => editclick(item._id)}
              // {<Link to="/createkro">Post</Link>}
            >
              edit
            </i>
            <i
              className="material-icons"
              style={{ color: "red", cursor: "pointer", float: "right" }}
              onClick={() => deleteclick(item._id)}
            >
              delete
            </i>
          </h3>
          <h6>{item.title}</h6>
          <div className="card-image">
            <img src={item.image} />
          </div>
          <div className="card-content">
            <p>
              <i
                onClick={() => handleclick(item._id)}
                className="material-icons"
                style={{
                  color: item.likes.includes(item.author._id) ? "red" : "black",
                  cursor: "pointer",
                }}
              >
                favorite
              </i>
              {item.likes.length}
            </p>
            {item.comments.map((comm) => (
              <p>
                {
                  <img
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "10px",
                    }}
                    src={item.author.photo}
                  ></img>
                }
                <b>{comm.author.name}</b>-{comm.text}
              </p>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                makecomment(e.target[0].value, item._id);
              }}
            >
              <input name="comment" type="text" placeholder="comment"></input>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
