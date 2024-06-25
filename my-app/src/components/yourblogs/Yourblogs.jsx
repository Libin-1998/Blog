import React, { useEffect, useState } from 'react'
import './Yourblogs.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Yourblogs() {

    const[item,setItem]=useState([])
    const token=localStorage.getItem('token')
    console.log(token);

    const author=localStorage.getItem('name')
    console.log(author);

    useEffect(()=>{
        axios.get(`http://localhost:6060/api/blogs/viewsame/${author}`,
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

    const Deletelist=(id)=>{
        console.log(id);
        axios.delete(`http://localhost:6060/api/blogs/delete/${id}`)
        .then((response)=>{
            console.log(response);
            toast.success(response.data.message)
           setTimeout(()=>{
            window.location.reload()
           },2000)
        })
        
        .catch((error)=>{
            console.log(error);
        })

    }


  return (
    <>
 <div className='container-fluid box'>
 {item.map((data)=>(
    <div className='cols'>
        <h2>{data.title}</h2>
        <h5>{data.content}</h5>
        <h3>{data.author}</h3>
        <h3>{data.timestamp}</h3>


{author===data.author ?(
    <>
        <div className='editdelete '>
    <button className='editbut'><Link to ={`/blogedit/${data._id}`}>Edit</Link></button>
    <button className='deletebut' onClick={()=>Deletelist(data._id)}>Delete</button>
    </div>
    </>
    ):('')}


    </div>
    ))}

      </div>
    </>
  )
}
