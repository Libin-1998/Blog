import axios from "axios";
import "./Postform.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Postform() {
  const author = sessionStorage.getItem("name");
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    content: "",
    author: author,
    timestamp: "",
  });

  const dataChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  console.log(data);

  const imageChange = (event) => {
    setData({ ...data, image: event.target.files[0] });
    console.log(data.image);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("content", data.content);
    formdata.append("timestamp", data.timestamp);
    formdata.append("image", data.image);
    formdata.append("author", data.author);

    console.log(formdata);

    axios
      .post("http://localhost:6060/api/blogs/addblog", formdata, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        // setTimeout(() => {
          navigate("/bloglist");
        // }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <>

      <div className="container-fluid createcls">
      <ToastContainer />

        <h1 className="createhead">CREATE BLOG</h1>
        <div className="createpage">
          <form encType="multipart/form-data">
            <div className="createlabels">
              <label htmlFor="" className="createlabel">
                Title
              </label>
              <br />
              <input
                type="text"
                className="createinput"
                onChange={dataChange}
                name="title"
              />
              <br />

              <label htmlFor="" className="createlabel">
                Content
              </label>
              <br />
              <input
                type="text"
                className="createinput"
                onChange={dataChange}
                name="content"
              />
              <br />

              <label htmlFor="" className="createlabel">
                timestamp
              </label>
              <br />
              <input
                type="text"
                className="createinput"
                onChange={dataChange}
                name="timestamp"
              />
              <br />

              <label htmlFor="" className="createlabel">
                Image
              </label>
              <br />
              <input
                type="file"
                className="createinput"
                onChange={imageChange}
                name="image"
              />
            </div>
            <br />
            <div className="postbutton">
              <button className="postbut" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
