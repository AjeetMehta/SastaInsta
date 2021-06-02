import React, { useEffect, useState } from "react";

function Profile() {
  const [blog, setblog] = useState([]);
  useEffect(async () => {
    const token = localStorage.getItem("access_token");
    const res = await fetch("http://localhost:5000/posts/mypost", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setblog(data);
      });
  }, []);
  return (
    <div style={{ maxWidth: "650px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
          borderBottom: "2px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={blog[0]?.author.photo}
            alt="Ur_Post"
          />
        </div>
        <div>
          <h4>{blog[0]?.author.name}</h4>
          <div style={{ display: "flex" }}>
            <h6>{blog.length} Posts </h6>
            <h6>{blog[0]?.author.follower.length} follower </h6>
            <h6>{blog[0]?.author.following.length} following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {blog.map((item) => (
          <img className="item" src={item.image} alt="first image" />
        ))}
      </div>
    </div>
  );
}

export default Profile;
