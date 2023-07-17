"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import toast,{Toaster} from 'react-hot-toast';
import axios from 'axios';



export default function login(){   
  const router=useRouter()
  const [user,setUser] =useState({
    
    email:"",
    password:""
  });
  const [loding,setLoding] =useState(false);

  const loginHandler=async ()=>{
    try {
         setLoding(true);
         const response=await axios.post("/api/users/login",user);
         console.log("User Login Successfully ",response.data);
         toast.success("Login Successfully");
         router.push("/profile");
    } catch (error) {
      console.log("Login failed",error.message);
      toast.error(error.message);
    }finally{
      setLoding(false);
    }

  }
  return (
    
    <div className={styles.container}>
       
       <h1>Login</h1>
       

       <label htmlFor="email"> Email</label>
       <input 
       type="email" 
       placeholder='Email'
       value={user.email}
       onChange={(e)=>setUser({...user,email:e.target.value})}
       />

       <label htmlFor="password">Password</label>
       <input 
       type="password" 
       placeholder='password'
       value={user.password}
       onChange={(e)=>setUser({...user,password:e.target.value})}
       />

       <button onClick={loginHandler}>Login</button>
       <Toaster/>

       <Link href={"/signup"}>Please Sign UP Here</Link>
 
    </div>
  )};