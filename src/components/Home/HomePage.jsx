import { useState } from 'react';
import SearchBox from '../SearchBox/SearchBox'
import Tabs from '../tabs/Tabs';
import TodoForm from '../todoform/TodoForm';
import TodoList from '../todolist/TodoList';
import { FaPlus } from "react-icons/fa";
import UpdateTodo from '../todoform/UpdateTodo';

function HomePage() {
  let [addNew,setAddNew]=useState(false);
  let [updateTodo,setUpdateTodo]=useState(false);
  let [searchValue,setSearchValue]=useState("");
  return (
    <div className='main'>
      <div className='left'>
        <div className='title'><p>Todo App</p></div>
        <div className='filter'><Tabs/></div>
      </div>
      <div className='right'>
        <div className='navbar'>
          <SearchBox setSearchValue={setSearchValue}/>
        </div>
        <div className='container'>
          <button className="AddNewBtn" onClick={()=>setAddNew(true)}><FaPlus /> NEW TASK</button>
          <div className={`modalDiv ${(addNew)?'activeModalDiv':''}`}>
            <TodoForm setAddNew={setAddNew}/>
          </div>
          <div className={`modalDiv ${(updateTodo)?'activeModalDiv':''}`}>
            <UpdateTodo setUpdateTodo={setUpdateTodo} updateTodo={updateTodo} />
          </div>
          <div className='todoList'>
            <TodoList setUpdateTodo={setUpdateTodo} searchValue={searchValue}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
