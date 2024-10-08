import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import Login from "../login/Login";


export default function Profile() {

    const tokens=sessionStorage.getItem('token')
    console.log(tokens);
    const logId=sessionStorage.getItem('loginID')

    const [data,setData]=useState({})

    useEffect(()=>{
        axios.get(`http://localhost:6060/api/auth/profile/${logId}`,
            {
                headers:{Authorization:`Bearer ${tokens}`
              }
            }
        )
        .then((response)=>{
            console.log(response);
            setData(response.data.data[0])
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])


  return (
    <>
      <div className="container-fluid profilecls">
        <div className="profilepage">

          <div className="profilebox">
            <br />
            <div className="" style={{textAlign:'center'}}>

            <img src="/images/default.jpeg" alt="" className="defaultprofile" />
            </div>
            <div className="details">
            <h1>{data.name}</h1>
            <h5>{data.phone}</h5>
            <h5>{data.email}</h5>
            <h5>{data.place}</h5>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
