import User from "./user";
import Loading from "../components/assets/Loading";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isLogin } from "../redux/apiRequest";

export default function Main() {
    //Khai báo biến cần dùng
    axios.defaults.withCredentials = true;
    const dispatch = useDispatch();
    //Khai báo dữ liệu cho Loading
    const loadingState = useSelector((state) => {
        if (state.campaign.pending) {
            return true;
        } else if (state.user.pending) {
            return true;
        } else {
            return false;
        }
    });
    const location = useLocation();
    
    //Tự động đưa lên đầu trang khi chuyển trang
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location]);

    //Lấy dữ liệu đăng nhập từ server
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/isLogin")
            .then((response) => {
                isLogin(dispatch, response.data);
            });
    }, []);

    //Trả về
    return (
        <>
            <Loading isLoading={loadingState} />
            <User />
        </>
    );
}
