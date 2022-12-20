import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        info: '',
        pending: false,
        error: ''
    },
    reducers: {
        isStart:(state)=>{
            state.pending = true;
        },
        loginSuccess:(state,action)=>{
            state.pending = false;
            state.error = '';
            state.info = action.payload.data;
        },
        loginFailed:(state,action)=>{
            state.pending = false;
            state.error = action.payload;
        },
        logoutSuccess:(state,action)=>{
            state.pending = false;
            state.error = '';
            state.info = '';
        },
        logoutFailed:(state,action)=>{
            state.pending = false;
            state.error = action.payload;
            state.info = '';
        },
        registerSuccess:(state,action)=>{
            state.pending = false;
            state.error = '';
        },
        registerFailed:(state,action)=>{
            state.pending = false;
            state.error = action.payload;
        },
        userResetError: (state) => {
            state.error = ''
        }
    }
})

export const { isStart,isError,loginSuccess,registerSuccess, registerFailed, userResetError } = userSlice.actions;
export default userSlice.reducer;