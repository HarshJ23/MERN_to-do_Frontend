import {React , useContext  , useEffect}from 'react'
import {  Navigate } from 'react-router-dom'
import { Context  , server } from "../main";
import { useState } from 'react';
import toast from "react-hot-toast";
import axios from  "axios" ;
import TodoItem from '../Components/TodoItem';


export default function Home() {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks , setTasks] =  useState([]);
  const [refresh, setRefresh] = useState(false);

  const  {isAuthenticated ,setIsAuthenticated ,  loading, setLoading} = useContext(Context);

  const taskHandler = async (e)=>{
    e.preventDefault();
    setLoading(true);
try {
        // console.log(name , email , password);
          const {data} = await axios.post(`${server}/tasks/newTask`, 
        {
             title , description
        } , {
            headers : {
                "Content-Type": "application/json",
            }, 
            withCredentials: true,
        })
        toast.success(data.message);
        setIsAuthenticated(true);
        // setLoading(false);
        // console.log(data);
        setTitle("");
        setDescription("");
        setRefresh((prev) => !prev);
      

    } catch (error) {
        toast.error("error");
        // console.log(error);
        setIsAuthenticated(false);

    }

    // console.log(loading);
};



  // to fetch all tasks of a user from  database 
useEffect(()=>{
      function fetchTasks(){
        axios.get(`${server}/tasks/myTask` , {
          withCredentials : true , 
        }).then((res)=>{ 
          setTasks(res.data.myTasksList)
          // console.log(res.data.myTasksList);
          // console.log(tasks);
        }).catch((e)=> {
          toast.error(e.response.data.message);
        });
      }
    fetchTasks();
  },[refresh]);


 
// update status of task
const editHandler = async (taskId)=>{
try {
  const { data } = await axios.put(
    `${server}/tasks/${taskId}`,
    {},
    {
      withCredentials: true,
    }
  );
toast.success(data.message);
  setRefresh((prev) => !prev);
} catch (error) {
  toast.error(error.response.data.message)
  }}


  const deleteTask = async (taskId)=>{
try {
  const {data} = await axios.delete(`${server}/tasks/${taskId}` ,
  {
    withCredentials : true , 
  });
  toast.success(data.message);
  setRefresh((prev) => !prev);
} catch (error) {
  toast.error(error.response.data.message)

}
  }



// console.log(tasks);

if (!isAuthenticated) return <Navigate to={"/login"} />;


  return (
    <>
<div className=" mt-6">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">

        <h2 className='text-center font-bold text-2xl'>Add tasks</h2>
        {/* <div className="form" onSubmit={submitHandler}> */}
        <form  className='flex flex-col space-y-8' onSubmit={taskHandler}>




        <div className='form-control space-y-2'>

         <p>task title</p>
         <input type="text" placeholder="Title" className="input input-bordered rounded-none" value={title}  onChange={(e)=>setTitle(e.target.value)}  required/>
        </div>

        <div className='form-control space-y-2'>
        <p>task description</p>
         <input type="text" placeholder="Description" className="input input-bordered rounded-none"  value={description}  onChange={(e)=>setDescription(e.target.value)}  required/>
        </div>

        
        
      
       
       
        
          <button className="btn btn-primary">Add task</button> 
        
        </form>


    {/* </div> */}
      </div>
    </div>
  </div>

  <section className="todosContainer flex flex-col space-y-3 w-2/3 my-6 justify-center items-center mx-auto">
        { tasks && tasks.map((item) => (
          <TodoItem
            title={item.title}
            description={item.description}
            status = {item.isCompleted}
            taskId = {item._id}
            key={item._id}
            editHandler = {editHandler}
            deleteHandler = {deleteTask}
          />
        ))}
      </section>

</div>
    </>  
  )
}
