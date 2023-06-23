import { BrowserRouter as Router , Route , Routes} from 'react-router-dom'

import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Register from './Pages/Register'
import Login from './Pages/Login'

import Navbar from './Components/Navbar'
import { Toaster } from 'react-hot-toast'
import { useContext, useEffect } from "react";
import { Context, server } from "./main";
import axios from "axios";

<link rel="stylesheet" href="./src/index.css" />



function App() {

  const { setUser , setIsAuthenticated , setLoading} = useContext(Context);

  useEffect(()=>{
    setLoading(true);
  
    axios.get(`${server}/users/me` , {
      withCredentials : true ,
    }).then((res)=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((error)=>{
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    });
  
  
  } , []);


  return (
    <>
     <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>

        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>
      <Toaster/>
     </Router>
    </>
  )
}

export default App
