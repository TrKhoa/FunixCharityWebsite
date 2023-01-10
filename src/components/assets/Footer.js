import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
    const userState = useSelector((state) => state.user.info);
    return (
        <div className="container">
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
                <div className="col mb-3">
                    <h5>VINADONATION</h5>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Est hic fuga quaerat voluptatum omnis, id iste
                        exercitationem asperiores ipsa minus placeat
                    </p>
                    <p className="text-muted">Trần Mạc Tư Khoa&copy; 2022</p>
                </div>

                <div className="col mb-3"></div>

                <div className="col mb-3">
                    <h5>Truy cập nhanh</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link href="/" className="nav-link p-0 text-muted">
                                Trang chủ
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link
                                href="/Cause"
                                className="nav-link p-0 text-muted"
                            >
                                Chiến dịch
                            </Link>
                        </li>
                        {userState !== "" ? (
                            <li className="nav-item mb-2">
                                <Link
                                    href="/history"
                                    className="nav-link p-0 text-muted"
                                >
                                    Lịch sử giao dịch
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}
                        
                    </ul>
                </div>

                <div className="col mb-3">
                    <h5>Tìm chúng tôi</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item my-2">
                            - 3435 Railroad street sault sainte marie
                        </li>
                        <li className="nav-item my-2">
                            - khoatmtfx14250@funix.edu.vn
                        </li>
                        <li className="nav-item my-2">- +84 707646200</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
