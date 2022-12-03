import { createSlice } from "@reduxjs/toolkit";

export const campaignSlice = createSlice({
    name: "campaign",
    initialState: {
        data: [],
        pending: false,
        error: false
    },
    reducers: {
        getStart:(state)=>{
            state.pending = true;
        },
        getError:(state)=>{
            state.pending = false;
            state.error = true;
        },
        getSuccess:(state,action)=>{
            state.pending = false;
            state.error = false;
            state.data = action.payload.data;
            
        },
        getData:(state)=>{
            console.log("state.data");
        }
    }
})

export const { getStart,getError,getSuccess } = campaignSlice.actions;
export default campaignSlice.reducer;