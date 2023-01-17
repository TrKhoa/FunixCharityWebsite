import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Thankyou() {
    const isLogin = useSelector(state => state.user.info) !== "" ? true : false
    return(
        <div className="row d-flex justify-content-center">
            <h1 className="text-center display-5 my-5">Cảm ơn bạn vì đã ủng hộ</h1>
            {/* Điều hướng */}
            <div className="text-center">
                <Link to="/"> Về trang chủ </Link>
                {isLogin ? (
                <Link to="/dashboard?show=history"> / Xem lịch sử </Link>) : ''}
            </div>
        </div>
    )
}