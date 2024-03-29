import { isCampaignStart, getError, getSuccess } from "./campaignSlice";
import {
    isUserStart,
    loginSuccess,
    loginFailed,
    isPasswordUpdate,
    isProfileUpdate,
    isUserFailed,
    registerSuccess,
    registerFailed,
    logoutSuccess,
    userResetError,
    isForgot,
} from "./userSlice";
import sha256 from "sha256";
import axios from "axios";

//Reset báo lỗi
export const resetError = (dispatch) => {
    dispatch(userResetError());
};

//Lấy dữ liệu chiến dịch từ server
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

//Gửi dữ liệu quyên góp lên server
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

//Gửi dữ liệu đăng ký lên server
export const postRegister = async (dispatch, data) => {
    dispatch(isUserStart());

    const register = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/register",
        {
            data,
        }
    );
    if (register.data.error === false) {
        dispatch(registerSuccess(register.data.message));
    } else {
        dispatch(registerFailed(register.data.message));
    }
};

//Gửi yêu cầu thay mật khẩu lên server
export const postPasswordForgot = async (dispatch, data) => {
    dispatch(isUserStart());
    await axios.post(
        process.env.REACT_APP_SERVER_URL + "/passwordReset/" + data.username
    ).then((result) => {
        dispatch(isForgot(result.data.message));
    });
};

//Gửi mật khẩu sau khi thay đổi lên serevr
export const postPasswordReset = async (dispatch,data) => {
    dispatch(isUserStart());
    await axios.post(process.env.REACT_APP_SERVER_URL + "/forgotPassword/", {
        data,
    }).then((result) => {
        dispatch(isForgot(result.data.message));
    });
};

//Gửi thông tin đăng nhập lên server
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

//Kiểm tra và lấy dữ liệu đăng nhập
export const isLogin = async (dispatch, data) => {
    await dispatch(isUserStart());
    if (data.isLogin === true) {
        dispatch(loginSuccess(data));
    } else {
        dispatch(loginFailed(data));
    }
};

//Gửi yêu cầu đăng xuất
export const isLogout = async (dispatch) => {
    dispatch(isUserStart());
    const logout = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/logout"
    );
    if (!logout.data.error) {
        dispatch(logoutSuccess());
        window.location.replace('/');
    }
};

//Gửi yêu cầu đổi User password
export const postChangePassword = async (dispatch,data) => {
    dispatch(isUserStart());
    const changePassword = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/changePassword",
        {
            username: data.username,
            password: sha256(data.newPassword)
        }
    );
    if (!changePassword.data.error) {
        dispatch(isPasswordUpdate(sha256(data.newPassword)));
        alert('Thay đổi password thành công')
    } else {
        dispatch(isUserFailed());
    }
};

//Gửi yêu cầu đổi User Profile
export const postUserProfileUpdate = async (dispatch,data) => {
    dispatch(isUserStart());
    const updateProfile = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/updateProfile",data
    );
    if (!updateProfile.data.error) {
        dispatch(isProfileUpdate(updateProfile.data.user));
        alert('Thay đổi thông tin thành công')
    } else {
        dispatch(isUserFailed());
    }
}