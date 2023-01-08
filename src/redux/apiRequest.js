import { isCampaignStart, getError, getSuccess } from "./campaignSlice";
import {
    isUserStart,
    loginSuccess,
    loginFailed,
    registerSuccess,
    registerFailed,
    logoutSuccess,
    userResetError,
} from "./userSlice";
import axios from "axios";

export const resetError = (dispatch) => {
    dispatch(userResetError());
};

export const getCampaign = async (dispatch) => {
    dispatch(isCampaignStart());
    try {
        const res = await axios.get(
            process.env.REACT_APP_SERVER_URL + "/campaigns"
        );
        await dispatch(getSuccess(res));
    } catch (err) {
        dispatch(getError(err));
    }
};

export const postDonate = async (dispatch, data, id) => {
    const donate = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/create_payment_url",
        { value: data, campaign: id }
    );
    if (donate.status === 200) {
        const donateLink = donate.data;
        window.location.replace(donateLink);
    }
};

export const postRegister = async (dispatch, data) => {
    dispatch(isUserStart());

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
        process.env.REACT_APP_SERVER_URL + "/passwordReset/" + data.username
    );
};

export const postPasswordReset = async (data) => {
    await axios.post(process.env.REACT_APP_SERVER_URL + "/forgotPassword/", {
        data,
    });
};

export const postLogin = async (dispatch, data) => {
    dispatch(isUserStart());
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

export const isLogin = async (dispatch, data) => {
    await dispatch(isUserStart());
    if (data.isLogin === true) {
        dispatch(loginSuccess(data));
    } else {
        dispatch(loginFailed(data));
    }
};

export const isLogout = async (dispatch) => {
    dispatch(isUserStart());
    const logout = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/logout"
    );
    if (!logout.data.error) {
        dispatch(logoutSuccess());
    }
};
