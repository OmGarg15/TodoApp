/* eslint-disable react/prop-types */
import  {useState } from 'react';
import "./TodoForm.css";
import { useDispatch} from 'react-redux';
import { addTask, setTask} from '../../store/taskSlice';

export default function TodoForm({setAddNew}) {
  const [taskTitle,setTaskTitle]=  useState('');
  const [taskDesc,setTaskDesc]=  useState('');
  const [taskDueDate,setTaskDueDate]=  useState('');
  const dispatch= useDispatch();
  let taskObj;
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(taskTitle && taskDesc && taskDueDate){
      taskObj={
        title: taskTitle,
        description: taskDesc,
        dueDate: taskDueDate
      }
      dispatch(addTask(taskObj));
      setTaskTitle("");
      setTaskDesc("");
      setTaskDueDate("");
      dispatch(setTask(null));
      setAddNew(false);
    }
  };
  return (
    <div>
      <div className='overlayHeader'>
      <p className='overlayHeading'>ADD NEW TASK</p><button className="overlayCanBtn" onClick={()=>setAddNew(false)}>&times;</button>
    </div>
    <div className='addTask'>
        <form method='post' onSubmit={handleSubmit}>
            <div className='formWrapper'>
                <div className="formInput">
                    <label>
                      Title
                      <input type="text" className='taskName' id='title' value={taskTitle} placeholder='Task Name' onChange={(e)=>setTaskTitle(e.target.value)} required/>
                    </label>
                    <label id='desc'>
                      Description
                      <input type='text' className='taskDesc' id='desc' value={taskDesc} placeholder='Task Description' onChange={(e)=>setTaskDesc(e.target.value)} required></input>
                    </label>
                    <label id='dueDate'>
                      Due Date
                      <input type='date' className='taskDueDate' id='dueDate' value={taskDueDate} placeholder='Enter Due Date' onChange={(e)=>setTaskDueDate(e.target.value)} required></input>
                    </label>
                    <button className='addTaskBtn'>ADD</button>
                </div>
            </div>
        </form>
    </div>
    </div>
  )
}