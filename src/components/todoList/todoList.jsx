import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../store/todoSlice/todoSlice";
import { onAuthStateChanged_Listener } from "../../utils/firebase/firebase";
import "./todoList.scss";
import { Skeleton } from "@mui/material";
import TodoItem from "../todoItem/todoItem";

const TodoList = ({ setInputTodo, inputRef, setTodoEdit }) => {
  const data = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged_Listener((user) => {
      if (user) {
        dispatch(fetchTodos(user));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  const isloading = useSelector((state) => state.todos.isloading);

  if (isloading) {
    return (
      <div className="listContainer">
        <Skeleton variant="rectangular" className="skeleton" />
        <Skeleton variant="rectangular" className="skeleton" />
        <Skeleton variant="rectangular" className="skeleton" />
      </div>
    );
  }
  return (
    <div className="listContainer">
      {data.map((todo, i) => {
        return (
          <TodoItem
            key={i}
            checked={todo.isDone}
            id={todo.id}
            todoText={todo.todo}
            todo={todo}
            setInputTodo={setInputTodo}
            inputRef={inputRef}
            setTodoEdit={setTodoEdit}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
