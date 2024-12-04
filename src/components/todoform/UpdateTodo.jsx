/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import "./TodoForm.css";
import { useDispatch, useSelector } from 'react-redux';
import {setTask, updateTask } from '../../store/taskSlice';

export default function UpdateTodo({setUpdateTodo}) {
  const [taskTitle,setTaskTitle]=  useState('');
  const [taskDesc,setTaskDesc]=  useState('');
  const [taskDueDate,setTaskDueDate]=  useState('');
  const task=useSelector((state)=>state.tasks.task);
  const dispatch= useDispatch();
  let taskObj;
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (task) {
      taskObj = {
        ...task,
        title: taskTitle,
        description: taskDesc,
        dueDate: taskDueDate
      };
      dispatch(updateTask(taskObj));
    }
    setTaskTitle("");
    setTaskDesc("");
    setTaskDueDate("");
    dispatch(setTask(null));
  };
  useEffect(() => {
    setTaskTitle(task?.title);
    setTaskDesc(task?.description);
    setTaskDueDate(task?.dueDate);
  }, [task]);
  return (
    <div>
      <div className='overlayHeader'>
      <h3 className='overlayHeading'>UPDATE TASK</h3><button className="overlayCanBtn" onClick={()=>setUpdateTodo(false)}>&times;</button>
    </div>
    <div className='addTask'>
        <form method='post' onSubmit={handleSubmit}>
            <div className='formWrapper'>
                <div className="formInput">
                    <label>
                      Title
                      <input type="text" className='taskName' id='title' value={taskTitle} placeholder='Task Name' onChange={(e)=>setTaskTitle(e.target.value)}/>
                    </label>
                    <label id='desc'>
                      Description
                      <input type='text' className='taskDesc' id='desc' value={taskDesc} placeholder='Task Description' onChange={(e)=>setTaskDesc(e.target.value)}></input>
                    </label>
                    <label id='dueDate'>
                      Due Date
                      <input type='date' className='taskDueDate' id='dueDate' value={taskDueDate} placeholder='Enter Due Date' onChange={(e)=>setTaskDueDate(e.target.value)}></input>
                    </label>
                    <button className='addTaskBtn' onClick={()=>setUpdateTodo(false)}>UPDATE</button>
                </div>
            </div>
        </form>
    </div>
    </div>
  )
}