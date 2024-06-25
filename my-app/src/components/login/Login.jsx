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


  setTimeout(() => {
    navigate('/')
  }, 2000);

 
})
.catch((error)=>{
  console.log(error);
  toast.error(error)
})


}

  return (
    <>

<ToastContainer/>
<form className='width'>
<h1 className='loghead'>Login</h1>
  <div class="col mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    onChange={logChange} name='email'/>
  </div>
  <div class="col mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"
    onChange={logChange} name='password'/>
  </div>

  <div className='subbut'>
  <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
  </div>
</form>


    </>
  )
}
