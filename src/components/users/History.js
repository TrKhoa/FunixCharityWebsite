import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { Table } from "reactstrap";

export default function History(args) {
    //Lấy dữ liệu từ Redux
    const userData = useSelector((state) => state.user.info.donate) || [];
    const userHistory = [...userData] || [];
    const campaigns = useSelector((state) => state.campaign.data) || [];

    //Pagination
    let page = args.page;
    const itemsPerPage = 12;
    const total = userHistory.length;
    const lastPage = Math.ceil(total / itemsPerPage);
    if(page < 0 || page > lastPage){
        page = 1;
    }
    const nextPage = itemsPerPage * page < total;
    const extraInfo = () => {
        if (total > 0) {
            return {
                display: "d-none",
                limit: page * itemsPerPage,
                skip: (page - 1) * itemsPerPage,
            };
        } else return { display: "", limit: itemsPerPage, skip: 0 };
    };

    const Pagination = ({display}) => {
        return (
            <div class={display ? display : ''}>
                <ul class="pagination justify-content-center pt-5">
                {page > 1 ? (
                    <li class="page-item">
                        <Link to="/dashboard?show=history&page=1" class="page-link">
                            Trang đầu
                        </Link>
                    </li>
                ) : (
                    <li class="page-item">
                        <span class="page-link text-secondary">Trang đầu</span>
                    </li>
                )}
                {page > 1 ? (
                    <li class="page-item">
                        <Link
                            to={"/dashboard?show=history&page=" + (page - 1)}
                            class="page-link"
                        >
                            {page - 1}
                        </Link>
                    </li>
                ) : (
                    ""
                )}
                <li class="page-item active" aria-current="page">
                    <span class="page-link">{page}</span>
                </li>
                {nextPage ? (
                    <>
                        <li class="page-item" aria-current="page">
                            <Link
                                to={"/dashboard?show=history&page=" + (page + 1)}
                                class="page-link"
                            >
                                {page + 1}
                            </Link>
                        </li>
                        <li class="page-item">
                            <Link to={"/dashboard?show=history&page=" + lastPage} class="page-link">
                                Trang cuối
                            </Link>
                        </li>
                    </>
                ) : (
                    <li class="page-item">
                        <span class="page-link text-secondary">
                            Trang cuối
                        </span>
                    </li>
                )}
            </ul>
            </div>
        );
    };

    //Trả về
    return (
        <>
            <Table className="row" responsive>
            <thead>
                <tr className="d-flex">
                    <th className="col-0">#</th>
                    <th className="col-6">Chiến dịch</th>
                    <th className="col-2">Số tiền</th>
                    <th className="col-3">Ngày</th>
                </tr>
            </thead>
            {/* Lịch sử giao dịch */}
            <tbody>
                {userHistory.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(extraInfo().skip, extraInfo().limit).map((user, index) => {
                    return (
                        <tr className="d-flex">
                            <th className="col-0" scope="row">
                                {index + 1}
                            </th>
                            <td className="text-truncate col-6">
                                {/* Tìm tên chiến dịch */}
                                <Link to={"/cause/" + user.campaign}>
                                    {campaigns.map((val) => {
                                        if (val._id == user.campaign) {
                                            return val.name;
                                        }
                                    })}
                                </Link>
                            </td>
                            <td className="col-2">{user.cash} VND</td>
                            <td className="col-3">
                                {moment(user.date).format(
                                    "DD/MM/yyyy - hh:mm:ss"
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
        <Pagination display={extraInfo().display == "d-none" ? '' : 'd-none'}/>
        </>
    );
}
