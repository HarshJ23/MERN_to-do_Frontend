import React from 'react'
import { useContext, useEffect } from "react";
import { Context, server } from "../main";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/Loader';

export default function Profile() {

  const { user , isAuthenticated , loading , setIsAuthenticated , setLoading} = useContext(Context);

console.log(user);

// const logoutHandler = async (e)=>{

//   e.preventDefault();
// setLoading(true);
//   try {
//     // console.log(name , email , password);
//       const {data} = await axios.get( `${server}/users/logout`, 
//       {
//        withCredentials: true,
//     });
//     toast.success(data.message);
//     setIsAuthenticated(false);
//     setLoading(false);
// } catch (error) {
//     toast.error(error.response.data.message);
//     // console.log(error);
//     setIsAuthenticated(true);
   

// }
// }

// if(isAuthenticated == false){
//   Navigate("/");
// }


  return (
loading ? <Loader/> : (
    <>

    <div className=" mt-6">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
    
            <h2 className='text-center font-bold text-2xl my-2 '> My Profile</h2>
            {/* <div className="form" onSubmit={submitHandler}> */}
            <form  className='flex flex-col space-y-10'>
    
    
    
    
            <div className='form-control'>
              <input type="text" placeholder="Name" className="input input-bordered" value={user.name} disabled={true} />
            </div>

            <div className='form-control'>
              <input type="text" placeholder="email" className="input input-bordered" value={user.email} disabled={true} />
            </div>
{/*  
            <div className='form-control'>
              <button className='btn btn-primary' onClick={logoutHandler}>Logout</button>
            </div> */}

          </form>
          {/* </div> */}
          </div>
        </div>
      </div>
    </div>
        </>  

)
  )
}
