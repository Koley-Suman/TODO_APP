import React from "react";
import { useDispatch } from "react-redux";
import {
  changeThisTodo,
  completeTodo,
  deleteTodo,
} from "../../store/todoSlice/todoSlice";
import { Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./todoItem.scss";

const TodoItem = ({
  checked,
  id,
  todo,
  todoText,
  setInputTodo,
  inputRef,
  setTodoEdit,
}) => {
  const dispatch = useDispatch();
  const handelClick = () => {
    dispatch(completeTodo(todo));
  };

  const deleteTo = (id) => {
    dispatch(deleteTodo(id));
  };

  const changeTodo = (todo) => {
    dispatch(changeThisTodo(todo));
    setInputTodo(todoText);
    inputRef.current.focus();
    setTodoEdit(true);
  };
  return (
    <div>
      {checked === true ? (
        <div className="TodoList todoBackground">
          <div className="iconBox">
            <input
              type="checkbox"
              id={JSON.stringify(id)}
              name="checkBox"
              checked={checked}
              onChange={handelClick}
              className="check"
            />
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className="todoText">
            <p className="todoTask completeTask">{todoText}</p>
          </div>
          <div className="iconBox">
            <IconButton onClick={() => deleteTo(id)}>
              <DeleteIcon />
            </IconButton>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className="iconBox editIcon"></div>
        </div>
      ) : (
        <div className="TodoList">
          <div className="iconBox">
            <input
              type="checkbox"
              id={JSON.stringify(id)}
              name="checkBox"
              checked={checked}
              onChange={handelClick}
              className="check"
            />
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className="todoText">
            <p className="todoTask">{todoText}</p>
          </div>
          <div className="iconBox">
            <IconButton onClick={() => deleteTo(id)}>
              <DeleteIcon />
            </IconButton>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className="iconBox editIcon">
            <IconButton onClick={() => changeTodo(todo)}>
              <EditIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
