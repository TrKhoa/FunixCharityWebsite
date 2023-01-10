import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import { Table } from "reactstrap";
import Bread from "../../components/assets/Bread";

export default function History() {
    //Lấy dữ liệu từ Redux
    const userHistory = useSelector((state) => state.user.info.donate) || [];
    const campaigns = useSelector((state) => state.campaign.data) || [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Bread title="Lịch sử giao dịch" />
            <div className="container">
                <Table className="my-5 table" responsive>
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
                        {userHistory.map((user, index) => {
                            return (
                                <tr className="d-flex">
                                    <th className="col-0" scope="row">{index + 1}</th>
                                    <td className="text-truncate col-6">
                                        {/* Tìm tên chiến dịch */}
                                        <Link to={"/Cause/" + user.campaign}>
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
                                            "DD/mm/yyyy - hh:mm:ss"
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </motion.div>
    );
}
