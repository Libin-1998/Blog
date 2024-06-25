import React, { useEffect, useState } from "react";
import "./Blogedit.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export default function Blogedit() {
    const navigate=useNavigate()
  const [data, setdata] = useState({
    title: "",
    content: "",
    author: "",
    timestamp: "",
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:6060/api/blogs/viewsingle/${id}`)
      .then((response) => {
        console.log(response);
        setdata(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const dataChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata({ ...data, [name]: value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:6060/api/blogs/updateblog/${id}`, data)
      .then((response) => {
        console.log(response);
        if(response.data.data.modifiedCount==1){
            toast.success(response.data.message)
        }
        else{
            toast.success('already updated')
        }
        
        setTimeout(() => {
            navigate('/bloglist')
        }, 2000);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer />
      <h1 className="p-4">Edit Blog</h1>
      <div class="mb-3 ps-3">
        <label for="formGroupExampleInput" class="form-label">
          Title
        </label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput"
          value={data.title}
          name="title"
          onChange={dataChange}
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
          value={data.content}
          name="content"
          onChange={dataChange}
        />
      </div>
      <div class="mb-3 ps-3">
        <label for="formGroupExampleInput2" class="form-label">
          Author{" "}
        </label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput2"
          value={data.author}
          name="author"
          onChange={dataChange}
        />
      </div>
      <div class="mb-3 ps-3">
        <label for="formGroupExampleInput2" class="form-label">
          Timestamp{" "}
        </label>
        <input
          type="text"
          class="form-control"
          id="formGroupExampleInput2"
          value={data.timestamp}
          name="timestamp"
          onChange={dataChange}
        />
      </div>

      <div className="subbut ps-3">
        <button type="submit" class="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </>
  );
}
