import {  useSelector } from "react-redux";
import { motion } from "framer-motion"
import Notification from "../../components/assets/Notification";
import LoginForm from '../../components/users/LoginForm'
import PasswordReset from '../../components/users/PasswordReset'

export default function Login(value) {
    const errMessage = useSelector((state) => state.user.error);
    const { forgot } = value;
    return (
        <motion.div className="container-fluid col-xl-12 col-xxl-12 pt-5" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div className="row position-relative align-items-center justify-content-center g-lg-5 py-5">
                <div className="col-lg-12">
                    <img
                        className="w-100"
                        src="/images/login/closeup-diverse-people-joining-their-hands.jpg"
                        alt="1"
                    />
                </div>
                <div className="position-absolute col-md-10 align-middle col-lg-5">
                    <Notification color="danger" message={errMessage} />
                    { forgot ? 
                    <PasswordReset />
                    :
                    <LoginForm isRegister={false} />
                    }
                </div>
            </div>
        </motion.div>
    );
}
