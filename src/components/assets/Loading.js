import { ImSpinner4 } from "react-icons/im";
import { Animate } from "react-simple-animate";

export default function Loading(args) {
    //Khai báo biến
    const { isLoading } = args;

    //Trả về màn hình loading nếu cần
    return (
        <Animate play={!isLoading} start={{ opacity: 1 }} end={{ opacity: 0 }} complete={{display: 'none'}}>
            <div className="full-view sticky-top bg-darkYellow z-index-1">
                <div className="d-flex position-absolute top-50 start-50 translate-middle justify-content-center align-middle">
                    <ImSpinner4 className="spin display-5" />
                </div>
            </div>
        </Animate>
    );
}
