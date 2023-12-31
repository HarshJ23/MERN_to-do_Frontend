import React, { useContext } from 'react'
import {Link , useNavigate} from 'react-router-dom';
import { Context , server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Navbar() {

   const {isAuthenticated , setIsAuthenticated , loading , setLoading} = useContext(Context);
const navigate = useNavigate();

const logoutHandler = async (e)=>{

  e.preventDefault();
setLoading(true);
  try {
    // console.log(name , email , password);
      const {data} = await axios.get( `${server}/users/logout`, 
      {
       withCredentials: true,
    });
    toast.success(data.message);
    setIsAuthenticated(false);
    setLoading(false);
    navigate("/");
} catch (error) {
    toast.error(error.response.data.message);
    // console.log(error);
    setIsAuthenticated(true);

}



}


  return (
    <div>
   <div className="navbar bg-base-100 shadow-xl">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>

{isAuthenticated ? 
<li> <Link onClick={logoutHandler} disabled={loading} >Logout</Link> </li> : <li> <Link to="/login">Login</Link> </li>
}


      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl">To-do Task</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

        {isAuthenticated ? 
<li> <Link onClick={logoutHandler}>Logout</Link> </li> : <li> <Link to="/login">Login</Link> </li>
}
    </ul>
  </div>
</div>
    </div>
  )
}
