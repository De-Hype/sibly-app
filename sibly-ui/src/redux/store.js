import { configureStore } from "@reduxjs/toolkit";
import actionReducer from "./actionSlice";
import chatReducer from "./chatSlice";

export const store = configureStore({
    reducer:{
        action:actionReducer,
        chat:chatReducer
    }
})