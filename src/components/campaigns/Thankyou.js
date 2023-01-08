import { Link } from "react-router-dom"

export default function Thankyou(req, res) {
    return(
        <div className="row d-flex justify-content-center">
            <h1 className="text-center display-5 my-5">Cảm ơn bạn vì đã ủng hộ</h1>
            <div className="text-center">
                <Link to="/"> Về trang chủ </Link>
                /
                <Link to="/history"> Xem lịch sử </Link>
            </div>
        </div>
    )
}