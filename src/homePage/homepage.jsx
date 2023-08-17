import React, { useRef, useState } from "react";
import InputTodo from "../components/inputTodo/inputTodo";
import TodoList from "../components/todoList/todoList";
import './homePage.scss'
import { useSelector } from "react-redux";
import Nouser from "../components/Nouser/Nouser";

const Homepage = () => {
  const user = useSelector((state)=>state.user.currentUser)
  const inputRef = useRef(null)
  const [inputTodo, setInputTodo] = useState("");
  const[todoEdit,setTodoEdit]=useState(false);
  const handelChange = (e) => {
    setInputTodo(e.target.value);
  };
  return (
    <div className="homePage">
      <InputTodo handelChange={handelChange} inputTodo={inputTodo} setInputTodo={setInputTodo} inputRef={inputRef} todoEdit={todoEdit} setTodoEdit={setTodoEdit}/>
      {user?<TodoList setInputTodo={setInputTodo} inputRef={inputRef} setTodoEdit={setTodoEdit}/>:<Nouser/>}
      
    </div>
  );
};

export default Homepage;
