import { useSelector } from "react-redux";
import { useLocation,Navigate } from "react-router-dom";
import Sidebar from "../../components/assets/Sidebar";
import History from "../../components/users/History";
import UserProfile from "../../components/users/UserProfile";
import Bread from "../../components/assets/Bread";

export default function Dashboard() {
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const show = query.get("show");
    const page = parseInt(query.get("page")) || 1;
    const userProfile = useSelector((state) => state.user.info);
    return (
        <>
            <Bread title={show === 'profile' ? 'Thông tin tài khoản' : show === 'history' ? 'Lịch sử giao dịch' : ''} className="my-5" />
        <div className="row my-5">
            <div className="col-4 d-none d-lg-block">
                <Sidebar show={show} />
            </div>
            <div className="col-10 offset-1 offset-lg-0 col-lg-8">
                {show == "profile" ? (
                    <UserProfile userProfile={userProfile} />
                ) : show == "history" ? (
                    <History page={page} />
                ) : (
                    <Navigate to='/' replace />
                )}
            </div>
        </div>
        </>
    );
}
