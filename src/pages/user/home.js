import {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Hero from '../../components/user/Hero'
import Mission from '../../components/user/Mission'
import AboutUs from '../../components/user/AboutUs-Landing'
import Causes from '../../components/user/Causes'
import { getCampaign } from '../../redux/apiRequest';

export default function Home(){

    const reduxCampaign = useSelector((state: RootState) => state.campaign)
    const dispatch = useDispatch();

    useEffect(() => {
        getCampaign(dispatch);
    }, []);
    /*
    useEffect(() => {
        axios.get('http://localhost:8888/campaigns')
        .then(result=>{
            dispatch(update(result.data));
            console.log(reduxCampaign);
        }) 
        return () => {
            
        };
    }, [reduxCampaign]);
    */
   
    return (
        <>
            <Hero title="Cùng chung tay xây dựng 1 đất nước Việt Nam tươi đẹp hơn" />
            <Mission title="Donate services to people in times of need" />
            <AboutUs title="Chúng tôi là một công ty phi lợi nhuận"/>
            <Causes title="Chung tay quyên góp giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước." campaigns={reduxCampaign} />
        </>
    )
}