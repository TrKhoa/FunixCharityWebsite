import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar(args) {
    const [page, setPage] = useState(args.show);
    return (
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light">
            <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                    <Link
                        to="/dashboard?show=profile"
                        class={
                            page == "profile"
                                ? "nav-link active"
                                : "nav-link link-dark"
                        }
                    >
                        Thông tin tài khoản
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard?show=history"
                        class={
                            page == "history"
                                ? "nav-link active"
                                : "nav-link link-dark"
                        }
                    >
                        Lịch sử giao dịch
                    </Link>
                </li>
            </ul>
        </div>
    );
}
