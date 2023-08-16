import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./todoSlice/todoSlice";
import { userReducer } from "./userSlice/userSlice";



const store = configureStore({
    reducer:{
        todos:todoReducer,
        user:userReducer
    },
    middleware:(getDefaultMiddelwdre)=>getDefaultMiddelwdre({
        serializableCheck:false
      }),
})

export default store;