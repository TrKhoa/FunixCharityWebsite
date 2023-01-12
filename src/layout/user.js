import { Routes,Route,Outlet } from 'react-router-dom';
import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getCampaign } from '../redux/apiRequest';

import Menu from '../components/assets/Navbar'
import Footer from '../components/assets/Footer'
import Login from '../pages/users/login'
import Dashboard from '../pages/users/dashboard'
import Home from '../pages/home';
import Causes from '../pages/causes/causes';
import CauseDetail from '../components/causes/CauseDetail'
import Thankyou from '../components/campaigns/Thankyou';
import History from '../pages/history/history';
import Err404 from './404';

export default function User() {
    //Khai báo biến và lấy dữ liệu
    const dispatch = useDispatch();
    useEffect(() => {
        getCampaign(dispatch);
    }, []);

    //Tạo Layout
    function BasicLayout(){
        return(
            <>
                <Menu fixed="top" />
                <Outlet />
                <Footer />
            </>
        )
    }

    //Trả về
    return (
        <>
            {/* Thiết lập điều hướng */}
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
                        <Route path="Dashboard" element={<Dashboard />} />
                        <Route path="*" element={<Err404 />} />
                    </Route>
                </Route>
            </Routes>
        </>
     )
}