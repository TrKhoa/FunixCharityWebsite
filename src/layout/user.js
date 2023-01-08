import { Routes,Route,Outlet } from 'react-router-dom';
import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getCampaign } from '../redux/apiRequest';

import Menu from '../components/assets/Navbar'
import Footer from '../components/assets/Footer'
import Login from '../pages/users/login'
import Home from '../pages/home';
import Causes from '../pages/causes/causes';
import CauseDetail from '../components/causes/CauseDetail'
import Thankyou from '../components/campaigns/Thankyou';
import History from '../pages/history/history';
import Err404 from './404';

export default function User() {

    const dispatch = useDispatch();

    useEffect(() => {
        getCampaign(dispatch);
    }, []);

    function BasicLayout(){
        return(
            <>
                <Menu fixed="top" />
                <Outlet />
                <Footer />
            </>
        )
    }
    return (
        <>
            <Routes>
                <Route element={<BasicLayout />} >
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="Cause" element={<Causes />} />
                        <Route path="Cause/:id" element={<CauseDetail />} />
                        <Route path="Login" element={<Login />} />
                        <Route path="forgotPassword" element={<Login forgot={true}/>} />
                        <Route path="Thankyou" element={<Thankyou />} />
                        <Route path="History" element={<History />} />
                        <Route path="*" element={<Err404 />} />
                    </Route>
                </Route>
            </Routes>
        </>
     )
     /*
     <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
                */
}