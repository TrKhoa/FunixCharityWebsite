import { getStart, getError, getSuccess } from "./campaignSlice";
import axios from "axios";

export const getCampaign = async (dispatch) => {
    dispatch(getStart());
    try{
        const res = await axios.get('http://localhost:8888/campaigns')
        dispatch(getSuccess(res))
    } catch(err){
        dispatch(getError(err))
    }
}
