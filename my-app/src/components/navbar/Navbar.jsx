import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate=useNavigate()
  const logs=sessionStorage.getItem('logged')
  
  const removed=()=>{
    // sessionStorage.removeItem('logged')
    sessionStorage.clear()
navigate('/login')
  }
  
  return (
    <>

<nav class="navbar navbar-expand-sm">
  <div class="container-fluid textbg">
    <a class="navbar-brand " href="#"><span>"Plan</span> <span>B"</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>   
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
      <div class="navbar-nav"> 
        <Link to={'/'} className='linkline'>
        <a class="nav-link" aria-current="page" href="">Home</a>  
        </Link>

        <Link to={'/bloglist'} className='linkline'>
        <a class="nav-link" href="">Blog List</a>
        </Link>

       
{
  logs=='true' ?(
<>



        <Link to={'/postform'}className='linkline'>
        <a class="nav-link" href="#">Create Blog</a>
        </Link>

        <Link to={'/yourblogs'} className='linkline'>
        <a class="nav-link" aria-current="page" href="">Your Blogs</a>  
        </Link>

        <Link to={'/profiles'} className='linkline'>
        <a class="nav-link" aria-current="page" href="">Profile</a>  
        </Link>

<a class="nav-link" href="#" onClick={removed}>Logout</a>

</>
  ):(
    <>
    
    <Link to={'/login'}className='linkline'>
        <a class="nav-link" href="#">Login</a>
        </Link>

        <Link to={'/register'}className='linkline'>
        <a class="nav-link" href="#">Register</a>
        </Link>

      
    </>
  )}
       

      </div>
    </div>
  </div>
</nav>


    </>
  )
}
