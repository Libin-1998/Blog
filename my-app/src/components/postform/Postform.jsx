import axios from "axios";
import "./Postform.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Postform() {
  const author = localStorage.getItem("name");
  
  const [data, setData] = useState({
    title:'',
    content:'',
    author:author,
    timestamp:'',
  });
  const navigate = useNavigate();

  const dataChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
    console.log(data);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:6060/api/blogs/addblog", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/bloglist");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  return (
    <>
      <ToastContainer />

      <div className="container-fluid createcls">
        <h1 className="createhead">CREATE BLOG</h1>
        <div className="createpage">

        <div className="createlabels">
          <label htmlFor="" className="createlabel">Title</label><br />
          <input type="text" className="createinput" onChange={dataChange} name="title"/><br />

          <label htmlFor="" className="createlabel">Content</label><br />
          <input type="text" className="createinput" onChange={dataChange} name="content"/><br />

          {/* <label htmlFor="" className="createlabel">Author</label>
          <input type="text" className="createinput" onChange={dataChange} name="author"/> */}

          <label htmlFor="" className="createlabel">timestamp</label><br />
          <input type="text" className="createinput" onChange={dataChange} name="timestamp"/><br />

        </div>
        </div>
        <br />
<div className="postbutton">
  <button className="postbut" onClick={handleSubmit}>Submit</button>
</div>


      </div>





    </>
  );
}
