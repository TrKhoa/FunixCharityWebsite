import { Routes,Route,Outlet } from 'react-router-dom';
import Home from '../pages/user/home';
import Menu from '../components/user/Navbar'
import Err404 from './404';
import Footer from '../components/user/Footer'

export default function User() {
    function BasicLayout(){
        return(
            <>
                <Menu />
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