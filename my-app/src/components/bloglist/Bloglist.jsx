import React, { useEffect, useState } from 'react'
import './Bloglist.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Bloglist() {

    const[item,setItem]=useState([])
    const token=localStorage.getItem('token')
    console.log(token);

    useEffect(()=>{
        axios.get('http://localhost:6060/api/blogs/viewblog',
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )
        .then((response)=>{
            console.log(response);
            setItem(response.data.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])
    console.log(item); 

  return (
    <>
    <ToastContainer/>
 <div className='container-fluid listblog'>
    {item.map((data)=>(

    <div className='blogbox'>
    <img src="images/listBG.jpeg" alt="" className='imgsize'/>
<div  className='mapdata'>
        <h2>{data.title}</h2>
        <h6 className='contentcls'>{data.content}</h6>
        <h5 className='authorcls'>- {data.author}</h5>
        <h6 className='timestampcls'>{data.timestamp}</h6>
        </div>
    </div>
    ))}
    
 </div>
      
    </>
  )
}
