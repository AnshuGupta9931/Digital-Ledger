import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx"
import profileReducer from "../slices/profileSlice.jsx"
import transactionReducer from "../slices/transactionSlice.jsx"
import categoryReducer from "../slices/categorySlice.jsx"
import friendReducer from "../slices/friendSlice.jsx"
import debtReducer from "../slices/debtSlice.jsx"
import savingReducer from "../slices/savingSlice.jsx"
import groupReducer from "../slices/groupSlice.jsx"


const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    friend: friendReducer,
    debt: debtReducer,
    saving: savingReducer,
    group: groupReducer,
});

export default rootReducer