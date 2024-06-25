import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const[reg,setReg]=useState({})
    const navigate=useNavigate()

    const regChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setReg({...reg,[name]:value})
    }
    console.log(reg);

const handleSubmit=(event)=>{
    event.preventDefault()
    axios.post('http://localhost:6060/api/auth/register',reg)
    .then((response)=>{
        console.log(response);
        toast.success(response.data.message)

        setTimeout(()=>{
          navigate('/login')
        },2000)

    })
    .catch((error)=>{
        console.log(error);
        toast.error(error)
    })

}

  return (
    <>
    <ToastContainer/>
    <h1 className='p-4'>Register</h1>
<div class="mb-3 ps-3">
  <label for="formGroupExampleInput" class="form-label">name</label>
  <input type="text" class="form-control" id="formGroupExampleInput" onChange={regChange} name='name'/>
</div>
<div class="mb-3 ps-3">
  <label for="formGroupExampleInput2" class="form-label">Phone</label>
  <input type="text" class="form-control" id="formGroupExampleInput2" onChange={regChange} name='phone' />
</div>
<div class="mb-3 ps-3">
  <label for="formGroupExampleInput2" class="form-label">Place</label>
  <input type="text" class="form-control" id="formGroupExampleInput2" onChange={regChange} name='place'/>
</div>
<div class="mb-3 ps-3">
  <label for="formGroupExampleInput2" class="form-label">Email</label>
  <input type="text" class="form-control" id="formGroupExampleInput2" onChange={regChange} name='email'/>
</div>
<div class="mb-3 ps-3">
  <label for="formGroupExampleInput2" class="form-label">Password </label>
  <input type="text" class="form-control" id="formGroupExampleInput2" onChange={regChange} name='password'/>
</div>


<div className='subbut ps-3'>
  <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
  </div>
      
    </>
  )
}
