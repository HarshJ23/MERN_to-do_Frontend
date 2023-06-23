import React from "react";

const TodoItem = ({
  title,
  description,
  status,
  editHandler,
  deleteHandler,
  taskId,
 }) => {
  return (
<div className="collapse collapse-arrow bg-base-200">
  <input type="checkbox" /> 
  <div className="collapse-title text-xl font-medium">
  <p>{title}</p> 
  <p className="text-base">{description}</p> 
  </div>
  <div className="collapse-content"> 
<div className="flex flex-row items-center space-x-8">

<div className="form-control">
  <label className="cursor-pointer label flex items-center space-x-2">
    <span className="label-text">Task completed?</span>
    <input type="checkbox"  checked={status}   onChange={()=>editHandler(taskId)} className="checkbox checkbox-sm checkbox-success" />
  </label>
</div>
    <button className="btn btn-error btn-xs" onClick={()=>deleteHandler(taskId)} >Delete task</button>

</div>


  </div>
</div>
  );
};

export default TodoItem;