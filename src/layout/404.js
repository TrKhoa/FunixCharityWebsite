import { Link } from "react-router-dom";

export default function Err404() {
    return (
        <div className="px-4 py-5 my-5 text-center">
            <img
                className="d-block mx-auto mb-4 w-50"
                src="/image/err404.png"
                alt=""
            />
            <h1 className="display-5 fw-bold">Trang không tồn tại</h1>
            <div className="col-lg-6 mx-auto">
                <Link to="/">
                    <button
                        type="button"
                        className="btn btn-darkYellow rounded-5 btn-lg px-4 gap-3"
                    >
                        Về trang chủ
                    </button>
                </Link>
            </div>
        </div>
    );
}
