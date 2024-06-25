import axios from "axios";
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
      <h1 className="p-4">Create Blog</h1>
      <div class="mb-3 ps-3">
        <label for="formGroupExampleInput" class="form-label">
          Title
        </label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          onChange={dataChange}
          name="title"
        />
      </div>
      <div class="mb-3 ps-3">
        <label for="formGroupExampleInput2" class="form-label">
          Content{" "}
        </label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput2"
          onChange={dataChange}
          name="content"
        />
      </div>
      {/* <div class="mb-3 ps-3">
        <label for="formGroupExampleInput2" class="form-label">
          Author{" "}
        </label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput2"
          onChange={dataChange}
          name="author"
        />
      </div> */}
      <div class="mb-3 ps-3">
        <label for="formGroupExampleInput2" class="form-label">
          Timestamp{" "}
        </label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput2"
          onChange={dataChange}
          name="timestamp"
        />
      </div>

      <div className="subbut ps-3">
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
}
