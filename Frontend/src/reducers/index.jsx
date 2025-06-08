import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx"
import profileReducer from "../slices/profileSlice.jsx"
import recurringBillsReducer from "../slices/recurringBillsSlice.jsx"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    recurringBills : recurringBillsReducer,
});

export default rootReducer