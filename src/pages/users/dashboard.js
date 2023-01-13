import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import Sidebar from "../../components/assets/Sidebar";
import History from "../../components/users/History";
import UserProfile from "../../components/users/UserProfile";
import Bread from "../../components/assets/Bread";
import Err404 from "../../layout/404";

export default function Dashboard() {
    //Khởi tạo hàm
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const show = query.get("show");
    const page = parseInt(query.get("page")) || 1;
    let userProfile = useSelector((state) => state.user.info);
    //Trả về Dashboard khi có dữ liệu
    if (userProfile) {
        return (
            <>
                <Bread
                    title={
                        show === "profile"
                            ? "Thông tin tài khoản"
                            : show === "history"
                            ? "Lịch sử giao dịch"
                            : ""
                    }
                    className="my-5"
                />
                <div className="row my-5">
                    {/*Sidebar*/}
                    <div className="col-4 d-none d-lg-block">
                        <Sidebar show={show} />
                    </div>
                    {/*Nội dung chính*/}
                    <div className="col-10 offset-1 offset-lg-0 col-lg-8">
                        {show === "profile" ? (
                            <UserProfile userProfile={userProfile} />
                        ) : show === "history" ? (
                            <History page={page} />
                        ) : (
                            <Navigate to="/" replace />
                        )}
                    </div>
                </div>
            </>
        );
    } else {
        return <Err404 />;
    }
}
