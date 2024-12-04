import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    task: null,
    filter: 'All'
}
export const taskSlice =createSlice({
    name: 'task',
    initialState,
    reducers:{
        addTask: (state, action)=>{
            // console.log('action', action)
            const taskId = Date.now();
            const newItem = { id: taskId, title: action.payload.title, description: action.payload.description, dueDate: action.payload.dueDate, isCompleted: false };
            const availableItems = [...state.items, newItem];
            state.items= availableItems;
        },
        updateTask: (state, action)=>{
            state.items = state.items.map(item => item.id === action.payload.id ? {...item, title:action.payload.title, description: action.payload.description, dueDate: action.payload.dueDate, isCompleted: action.payload.isCompleted} : item)
        },
        deleteTask: (state, action)=>{
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        setTask:(state, action) => {
            state.task = action.payload
        },
        setFilter:(state, action) => {
            state.filter = action.payload
        }
    }
})

export const {addTask, updateTask, deleteTask, setTask, setFilter}= taskSlice.actions;
export default taskSlice.reducer;