import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        info: "",
        pending: false,
        error: "",
    },
    reducers: {
        isStart: (state) => {
            state.pending = true;
        },
        loginSuccess: (state, action) => {
            state.pending = false;
            state.error = "";
            state.info = action.payload.data;
        },
        logoutSuccess: (state) => {
            state.pending = false;
            state.error = "";
            state.info = "";
        },
        registerSuccess: (state, action) => {
            state.pending = false;
            state.error = "";
        },
        registerFailed: (state, action) => {
            state.pending = false;
            state.error = action.payload;
        },
        userResetError: (state) => {
            state.error = "";
        },
    },
});

export const {
    isStart,
    isError,
    loginSuccess,
    logoutSuccess,
    registerSuccess,
    registerFailed,
    userResetError,
} = userSlice.actions;
export default userSlice.reducer;
