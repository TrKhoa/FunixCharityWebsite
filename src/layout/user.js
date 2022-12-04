import { Routes,Route,Outlet } from 'react-router-dom';
import {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getCampaign } from '../redux/apiRequest';
import Home from '../pages/user/home';
import Menu from '../components/user/Navbar'
import Err404 from './404';
import Footer from '../components/user/Footer'
import Login from '../components/Login'

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
                        <Route path="login" element={<Login />} />
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