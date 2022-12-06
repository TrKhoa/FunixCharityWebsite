import { getStart, getError, getSuccess } from "./campaignSlice";
import axios from "axios";

export const getCampaign = async (dispatch) => {
    dispatch(getStart());
    try {
        const res = await axios.get("http://localhost:8888/campaigns");
        dispatch(getSuccess(res));
    } catch (err) {
        dispatch(getError(err));
    }
};

export const postRegister = async (dispatch,data) => {
    dispatch(getStart());
    console.log(data)
    /*
    try {
        const res = await axios.post("http://localhost:8888/register", {
            name: "test",
            email: "test@test.com",
            password: "test"
        });
        dispatch(getSuccess(res));
    } catch (err) { 
        dispatch(getError(err));
    }
    */
}