import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, onAuthStateChanged_Listener } from "../../utils/firebase/firebase";

export const addTodoToFirebase = createAsyncThunk(
  "todos/addTodoToFirebase",
  async (todo) => {
    onAuthStateChanged_Listener(async (user) => {
      if (user) {
        const docRef = doc(db, "userTodo", user.uid);
        const colRef = collection(docRef, "todos");
        await addDoc(colRef, todo);
      }
    });
    const todosRef = todo;
    return todosRef;
  }
);

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (user) => {
  const querySnapshot = await getDocs(
    collection(db, "userTodo", user.uid, "todos")
  );
  console.log(querySnapshot.docs.map((doc) => doc.data()));
  const todos = querySnapshot.docs.map((doc) => doc.data());
  return todos;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  console.log("delete", id);
  onAuthStateChanged_Listener(async (user) => {
    if (user) {
      const dataSnap = await getDocs(
        collection(db, "userTodo", user.uid, "todos")
      );
      console.log("DELETE", dataSnap);
      for (var tododata of dataSnap.docs) {
        console.log("del", tododata.id);
        if (tododata.data().id === id) {
          await deleteDoc(doc(db, "userTodo", user.uid, "todos", tododata.id));
        }
      }
    }
  });
  return id;
});

export const completeTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo) => {
    onAuthStateChanged_Listener(async (user) => {
      if (user) {
        const dataSnap = await getDocs(
          collection(db, "userTodo", user.uid, "todos")
        );

        for (var tododata of dataSnap.docs) {
          if (tododata.data().id === todo.id) {
            await updateDoc(
              doc(db, "userTodo", user.uid, "todos", tododata.id),
              { isDone: !todo.isDone }
            );
          }
        }
      }
    });
    return todo;
  }
);
export const updateThisTodo = createAsyncThunk(
  "todo/updateThisTodo",
  async (todo) => {
    onAuthStateChanged_Listener(async (user) => {
      if (user) {
        const dataSnap = await getDocs(
          collection(db, "userTodo", user.uid, "todos")
        );

        for (var tododata of dataSnap.docs) {
          if (tododata.data().id === todo.id) {
            await updateDoc(
              doc(db, "userTodo", user.uid, "todos", tododata.id),
              { todo: todo.todo }
            );
          }
        }
      }
    });
    return todo;
  }
);

const isdoneTodo = (todos, doneTodo) => {
  return todos.map((todo) =>
    todo.id === doneTodo.id ? { ...todo, isDone: !todo.isDone } : todo
  );
};
const updateTodoText = (todos, change) => {
  return todos.map((todo) =>
    todo.id === change.id ? { ...todo, todo: change.todo } : todo
  );
};

const initialState = {
  isloading: false,
  todos: [],
  updateTodo: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeThisTodo(state, action) {
      state.updateTodo = action.payload;
    },
    signOutData(state, action) {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoToFirebase.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isloading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.pending, (state, action) => {
        state.isloading = true;
        state.todos = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.todos = isdoneTodo(state.todos, action.payload);
      })
      .addCase(updateThisTodo.fulfilled, (state, action) => {
        state.todos = updateTodoText(state.todos, action.payload);
      });
  },
});

export const { changeThisTodo, signOutData } = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
