import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoToFirebase,
  updateThisTodo,
} from "../../store/todoSlice/todoSlice";
import { onAuthStateChanged_Listener } from "../../utils/firebase/firebase";
import { Divider, Fab, IconButton} from "@mui/material";
import "./inputTodo.scss";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import EditNoteIcon from "@mui/icons-material/EditNote";

const InputTodo = ({
  handelChange,
  inputTodo,
  setInputTodo,
  inputRef,
  todoEdit,
  setTodoEdit,
}) => {
  const dispatch = useDispatch();

  const selectUpdate = useSelector((state) => state.todos.updateTodo);
 

  const todo = {
    id: Date.now(),
    todo: inputTodo,
    isDone: false,
  };
  const addTodo = (e) => {
    e.preventDefault();
    if (inputTodo) {
      onAuthStateChanged_Listener((user) => {
        if (user) {
          dispatch(addTodoToFirebase(todo));
        }
      });
      setInputTodo("");
    }
  };
  const editUpdateTodo = (e) => {
    e.preventDefault();
    if (inputTodo) {
      const newTodo = {
        id: selectUpdate.id,
        isDone: selectUpdate.isDone,
        todo: inputTodo,
      };
      dispatch(updateThisTodo(newTodo));
      setInputTodo("");
      setTodoEdit(false);
    } else {
      setTodoEdit(false);
    }
  };
  return (
    <div className="inputBox">
      <form className="input-container">
        <input
          type="text"
          placeholder="Write Your Task"
          value={inputTodo}
          onChange={handelChange}
          ref={inputRef}
        />
        <div className="button">
          {document.activeElement === inputRef.current ? (
            <IconButton onClick={() => setInputTodo("")}>
              <ClearIcon
                sx={{ fontSize: 30, fontWeight: 2 }}
                className="icons"
              />
            </IconButton>
          ) : (
            ""
          )}
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div className="button">
          {todoEdit ? (
            <Fab
              color="primary"
              aria-label="add"
              onClick={editUpdateTodo}
              size="medium"
              className="addFeb"
            >
              <EditNoteIcon sx={{ fontSize: 30 }} />
            </Fab>
          ) : (
           
            <Fab
              color="primary"
              aria-label="add"
              onClick={addTodo}
              size="medium"
              className="addFeb"
            >
              <AddIcon sx={{ fontSize: 30 }} className="icons" />
            </Fab>
          )}
        </div>
      </form>
    </div>
  );
};

export default InputTodo;
