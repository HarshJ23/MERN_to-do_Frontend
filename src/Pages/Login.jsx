import React  ,  { useContext } from 'react'
import { useNavigate ,Link , Navigate } from 'react-router-dom'
import { Context  , server } from "../main";
import { useState } from 'react';
import toast from "react-hot-toast";
import axios from  "axios" ;


export default function Login() {

    const  {isAuthenticated ,setIsAuthenticated , loading, setLoading} = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            // console.log(name , email , password);
              const {data} = await axios.post( `${server}/users/login`, 
            {
                 email , password
            } , {
                headers : {
                    "Content-Type": "application/json",
                }, 
                withCredentials: true,
            })
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);

        } catch (error) {
            toast.error(error.response.data.message);
            // console.log(error);
            setIsAuthenticated(false);
    
        }

        // console.log(loading);
    }




    if(isAuthenticated)
    {
        return <Navigate to={"/"}/>;
    }

  return (
<>
<div className=" mt-6">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">

        <h2 className='text-center font-bold text-2xl'>Login</h2>
        {/* <div className="form" onSubmit={submitHandler}> */}
        <form  className='flex flex-col space-y-4' onSubmit={submitHandler}>




        <div className='form-control'>

         <p>email</p>
         <input type="text" placeholder="email" className="input input-bordered"  value={email}  onChange={(e)=>setEmail(e.target.value)} required/>
        </div>
      
       
       <div className='form-control'>

         <p>Password</p>
         <input type="password" placeholder="password" className="input input-bordered" value={password}  onChange={(e)=>setPassword(e.target.value)} required />
       </div>
       
        
          <button className="btn btn-primary" disabled={loading}>Login</button> 
        
        </form>

        <p className='text-center'>or</p>

        <Link></Link>
        <button className="btn btn-primary">  <Link to="/register">Register</Link></button> 

    {/* </div> */}
      </div>
    </div>
  </div>
</div>
    </>  
    
    )
}
