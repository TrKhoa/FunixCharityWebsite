import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        info: "",
        pending: false,
        error: "",
    },
    reducers: {
        isUserStart: (state) => {
            state.pending = true;
        },
        loginSuccess: (state, action) => {
            state.pending = false;
            state.error = "";
            state.info = action.payload.data;
        },
        isUserFailed: (state, action) => {
            state.pending = false;
        },
        loginFailed: (state, action) => {
            state.pending = false;
            state.error = "";
        },
        isPasswordUpdate: (state, action) => {
            state.pending = false;
            state.error = "";
            state.info = {...state.info, password: action.payload};
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
    isUserStart,
    isError,
    loginSuccess,
    loginFailed,
    logoutSuccess,
    registerSuccess,
    registerFailed,
    isPasswordUpdate,
    isUserFailed,
    userResetError,
} = userSlice.actions;
export default userSlice.reducer;
