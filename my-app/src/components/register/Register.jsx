import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [reg, setReg] = useState({});
  const navigate = useNavigate();

  const regChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setReg({ ...reg, [name]: value });
  };
  console.log(reg);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:6060/api/auth/register", reg)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid regcls">
        <h1 className="reghead">REGISTER</h1>
        <div className="regpage">

          <div className="reglabels">
            <label htmlFor="" className="reglabel">Name</label><br />
            <input type="text" className="reginput" onChange={regChange} name="name"/><br />

            <label htmlFor="" className="reglabel">Phone</label><br />
            <input type="text" className="reginput" onChange={regChange} name="phone"/><br />

            <label htmlFor="" className="reglabel">Place</label><br />
            <input type="text" className="reginput" onChange={regChange} name="place"/><br />

            <label htmlFor="" className="reglabel">Email</label><br />
            <input type="text" className="reginput" onChange={regChange} name="email"/><br />

            <label htmlFor="" className="reglabel">Password</label><br />
            <input type="text" className="reginput" onChange={regChange} name="password"/><br />
          </div>
        </div>
<br />
        <div className="regbutton">
<button className="regbut" onClick={handleSubmit}>Register</button>
        </div>

      </div>


    </>
  );
}
