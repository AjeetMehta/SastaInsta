import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

function CreatePost() {
  const history = useHistory();
  const [image, setImage] = useState("");
  // const [url, seturl] = useState("");
  const [userPost, setPost] = useState({
    title: "",
  });
  // const [url, setUrl] = useState("");

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setPost({ ...userPost, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "SastaInsta");
    formData.append("cloud_name", "mehta1234");
    fetch("https://api.cloudinary.com/v1_1/mehta1234/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (data) => {
        const url = data.url;
        const { title } = userPost;
        const token = localStorage.getItem("access_token");
        const result = await fetch("http://localhost:5000/posts/create/" + id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ title, url }),
        });
        console.log(url);
        const data1 = await result.json();
        if (data1.error)
          M.toast({ html: data1.error, classes: "#c62828 red darken-3" });
        else {
          M.toast({ html: "Successfully Updated" });
          history.push("/");
        }
      });
  }
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div
        className="card input-field"
        style={{
          margin: "50px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h3>EditPost</h3>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
          value={userPost.title}
        ></input>
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload_Image</span>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            ></input>
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Upload one "
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="waves-effect waves-light btn #64b5f6 blue darken-1"
        >
          Submit Post
        </button>
      </div>
    </form>
  );
}

export default EditPost;
