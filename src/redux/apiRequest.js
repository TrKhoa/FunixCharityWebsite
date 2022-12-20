import { getStart, getError, getSuccess } from "./campaignSlice";
import {
    isStart,
    loginSuccess,
    registerSuccess,
    registerFailed,
    userResetError,
} from "./userSlice";
import axios from "axios";

export const resetError = (dispatch) => {
    dispatch(userResetError());
};

export const getCampaign = async (dispatch) => {
    dispatch(getStart());
    try {
        const res = await axios.get(
            process.env.REACT_APP_SERVER_URL + "/campaigns"
        );
        dispatch(getSuccess(res));
    } catch (err) {
        dispatch(getError(err));
    }
};

export const postRegister = async (dispatch, data) => {
    dispatch(isStart());

    const register = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/register",
        {
            data,
        }
    );
    if (register.data.error === false) {
        dispatch(registerSuccess());
    } else {
        dispatch(registerFailed(register.data.message));
    }
};

export const postPasswordForgot = async (data) => {
    await axios.post(
        process.env.REACT_APP_SERVER_URL + "/passwordReset/"+data.username
    );
};

export const postLogin = async (dispatch, data) => {
    dispatch(isStart());
    const login = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/login",
        {
            username: data.username,
            password: data.password,
        }
    );
    if (!login.data.error) {
        dispatch(loginSuccess(login.data));
    } else {
        dispatch(registerFailed(login.data.message));
    }
};

export const isLogin = async (dispatch, data) =>{
    await dispatch(isStart());
    if (data.isLogin === true) {
        dispatch(loginSuccess(data));
    }
    /*
    if (!login.data.error) {
        dispatch(loginSuccess(login.data));
    } else {
        dispatch(registerFailed(login.data.message));
    }\*/
}