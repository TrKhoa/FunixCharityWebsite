import User from "./user";
import Loading from "../components/Loading";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { isLogin } from "../redux/apiRequest";

export default function Main() {
    axios.defaults.withCredentials = true;
    const dispatch = useDispatch();
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

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_SERVER_URL + "/isLogin")
            .then((response) => {
                isLogin(dispatch, response.data);
            });
    }, []);

    return (
        <>
            <Loading isLoading={loadingState} />
            <User />
        </>
    );
}
