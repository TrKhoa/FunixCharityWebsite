import { useSelector } from 'react-redux';
import Hero from '../../components/user/Hero'
import { motion } from 'framer-motion'
import Mission from '../../components/user/Mission'
import AboutUs from '../../components/user/AboutUs-Landing'
import Causes from '../../components/user/Causes'

export default function Home(){

    const reduxCampaign = useSelector((state) => state.campaign)
    const reduxUser = useSelector((state) => state.user)

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
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <Hero title="Cùng chung tay xây dựng 1 đất nước Việt Nam tươi đẹp hơn" />
            <Mission title="Donate services to people in times of need" />
            <AboutUs title="Chúng tôi là một công ty phi lợi nhuận"/>
            <Causes title="Chung tay quyên góp giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước." campaigns={reduxCampaign} user={reduxUser} />
        </motion.div>
    )
}