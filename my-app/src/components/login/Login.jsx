import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


export default function Login() {

  const[log,setLog]=useState({})
  const navigate=useNavigate()

const logChange=(event)=>{
  const name=event.target.name;
  const value=event.target.value;
  setLog({...log,[name]:value})
}
console.log(log);

const handleSubmit=(event)=>{
event.preventDefault()
axios.post('http://localhost:6060/api/auth/login',log)
.then((response)=>{
  console.log(response);
  toast.success(response.data.message)

  localStorage.setItem('logged',true)
  localStorage.setItem('token',response.data.token)
  localStorage.setItem('name',response.data.name)
  localStorage.setItem('loginID',response.data.loginId)


  setTimeout(() => {
    navigate('/')
  }, 2000);

 
})
.catch((error)=>{
  console.log(error.response);
  toast.error(error.response.data.message)
})


}

  return (
    <>

<ToastContainer/>
<div className='container-fluid logcls'>
  <h1 className='loginhead'>LOGIN</h1>
  <div className="loginpage">

  <div className='labels'>
    <label htmlFor="" className='label'>Email id</label><br />
    <input type="text" className='inputwidth' onChange={logChange} name='email'/><br />

    <label htmlFor="" className='label'>Password</label><br />
    <input type="text" className='inputwidth' onChange={logChange} name='password'/><br /><br />
  </div>
  </div>

  <div className='logsubmit'>
  <button className='logsub' onClick={handleSubmit}>Login</button>
  </div>

</div>

    </>
  )
}
