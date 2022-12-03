import { Link } from "react-router-dom";

export default function Err404() {
    return (
        <div class="px-4 py-5 my-5 text-center">
            <img
                class="d-block mx-auto mb-4 w-50"
                src="/image/err404.png"
                alt=""
            />
            <h1 class="display-5 fw-bold">Trang không tồn tại</h1>
            <div class="col-lg-6 mx-auto">
                <Link to="/">
                    <button
                        type="button"
                        class="btn btn-darkYellow rounded-5 btn-lg px-4 gap-3"
                    >
                        Về trang chủ
                    </button>
                </Link>
            </div>
        </div>
    );
}
