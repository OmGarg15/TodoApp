/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setTask, updateTask } from "../../store/taskSlice";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";

export default function TodoList({ setUpdateTodo , searchValue }) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [filteredTasks, setFilteredTasks] = useState();
  const tasks = useSelector((state) => state.tasks.items);
  const selectedFilter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();
  const handleClickAction = (item, action) => {
    switch (action) {
      case "markAsDone": {
        dispatch(
          updateTask({
            ...item,
            isCompleted: !item.isCompleted,
          })
        );
        break;
      }
      case "delete": {
        if (confirm(`Are you sure want to delete this task?`)) {
          dispatch(deleteTask(item.id));
        }
        break;
      }
      default:
        break;
    }
  };

  useMemo(() => {
    let results;
    let obj = new Date();
    let temp = { day: "numeric", month: "numeric", year: "numeric" };
    let dateFormat = obj.toLocaleDateString(undefined, temp);
    switch (selectedFilter) {
      case "Pending": {
        results = tasks.filter((item) => !item?.isCompleted);
        break;
      }
      case "Completed": {
        results = tasks.filter((item) => item?.isCompleted);
        break;
      }
      case "OverDue": {
        results = tasks.filter((item) => {
          if (!item?.isCompleted) {
            let [currentMonth, currentDay, currentYear] = dateFormat.split("/");
            let [dueYear, dueMonth, dueDate] = item.dueDate.split("-");
            if (currentYear === dueYear) {
              if (currentMonth === dueMonth) {
                if (dueDate - currentDay <= 1) {
                  return "1";
                }
              }
            }
          }
        });
        break;
      }
      default:
        results = tasks;
        break;
    }
    setFilteredTasks(results);
  }, [selectedFilter, tasks]);
  return (
    <div className="todosContainer">
      <ul className="allTodos">
        {(!filteredTasks || filteredTasks?.length === 0) && (
          <li className="list_item">No task available.</li>
        )}
        {filteredTasks &&
          filteredTasks?.length > 0 &&
          filteredTasks?.filter((task)=>task.title.includes(searchValue)).map((task) => (
            <li className="singleTodo" key={`item${task?.id}`}>
              <div className="checkBox">
                <span onClick={() => handleClickAction(task, "markAsDone")}>
                  <Checkbox
                    {...label}
                    checked={task?.isCompleted}
                    color="success"
                  />
                </span>
              </div>
              <div className="taskDetails">
                <div className="titleDate">
                  <span className="todoTitle">{task.title}</span>
                  <span className="todoDueDate">{task.dueDate}</span>
                </div>
                <div className="taskDesc1">
                  <span className="todoDesc">{task.description}</span>
                </div>
              </div>
              <div className="taskActions">
                <span
                  title="Edit"
                  onClick={() => {
                    dispatch(setTask(task));
                    setUpdateTodo(true);
                  }}
                >
                  <IconButton aria-label="edit" size="large" className="">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </span>
                <span
                  title="Delete"
                  onClick={() => handleClickAction(task, "delete")}
                >
                  <IconButton aria-label="delete" size="large" className="">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
