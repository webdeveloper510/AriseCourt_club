import { configureStore } from "@reduxjs/toolkit";
import UserDataReducer from './userData';

export const store = configureStore({
    reducer: {
        userData: UserDataReducer
    },
})