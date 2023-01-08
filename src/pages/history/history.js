import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Table } from "reactstrap";
import Bread from "../../components/assets/Bread";

export default function History() {
    const userHistory = useSelector((state) => state.user.info.donate) || [];
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Bread title="Lịch sử giao dịch" />
            <div className="container">
                <Table className="my-5" responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Chiến dịch</th>
                            <th>Số tiền</th>
                            <th>Ngày</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userHistory.map((user, index) => {
                            return(
                                <tr>
                                <th scope="row">{index+1}</th>
                                <td>{index+1}</td>
                                <td>{user.cash}</td>
                                <td>{user.date}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </motion.div>
    );
}
