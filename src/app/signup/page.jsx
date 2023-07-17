"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';



export default function signUp(){   
  const router=useRouter()
  const [user,setUser] =useState({
    name:"",
    email:"",
    password:""
  });
  const [loding,setLoding] =useState(false);

  const signUpHandler=async ()=>{
    try {
         setLoding(true);
         const response=await axios.post("/api/users/signup",user);
         console.log("User Signup Successfully ",response.data);
         toast.success("Sign up Successfully");
         router.push("/login");
    } catch (error) {
      console.log("Sign Up failed",error.message);
      toast.error(error.message);
    }finally{
      setLoding(false);
    }

  }
  return (
    
    <div className={styles.container}>
       
       <h1>Sign Up</h1>
       <label htmlFor="username"> UserName</label>
       <input 
       type="text" 
       placeholder='User Name'
       value={user.name}
       onChange={(e)=>setUser({...user,name:e.target.value})}
       />

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

       <button onClick={signUpHandler}>Sign Up</button>

       <Link href={"/login"}>Please Login Here</Link>
 
    </div>
  )};
  


