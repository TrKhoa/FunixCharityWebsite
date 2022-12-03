import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import campaignReducer from "./campaignSlice";

export default configureStore({
    reducer:{
        user: userReducer,
        campaign: campaignReducer
    }
})