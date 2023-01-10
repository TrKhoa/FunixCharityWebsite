import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Hero(args) {
    const isLogin = useSelector((state) => state.user).info !== ''  //Kiểm tra dăng nhập
    return (
        <div className="container col-xxl-12 px-4">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-md-5 ">
                <div className="col-sm-12 col-lg-7">
                    <img
                        src="/images/charity.png"
                        className="d-block mx-lg-auto img-fluid"
                        alt="Bootstrap Themes"
                        loading="lazy"
                    />
                </div>
                <div className="col-lg-5">
                    <h1 className="display-4 fw-bold lh-3 mb-3">
                        {args.title}
                    </h1>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <Link to="/Cause">
                            <button
                                type="button"
                                className="btn btn-primary btn-lg px-4 me-md-2 btn-darkYellow rounded-5"
                            >
                                Chiến dịch
                            </button>
                        </Link>
                        {/* Hiện phần User khi đăng nhập hoặc nút đăng nhập nếu chưa đăng nhập */}
                        {!isLogin ? 
                            <Link to="/Login">
                            <button
                                type="button"
                                className="btn btn-outline-darkYellow btn-lg px-4 rounded-5"
                            >
                                Đóng góp ngay
                            </button>
                        </Link>
                        :
                        <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
