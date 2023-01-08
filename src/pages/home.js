import { useSelector } from 'react-redux';
import Hero from '../components/home/Hero'
import { motion } from 'framer-motion'
import Mission from '../components/home/Mission'
import AboutUs from '../components/home/AboutUs-Landing'
import Causes from '../components/causes/Causes'

export default function Home(){

    const reduxCampaign = useSelector((state) => state.campaign)
   
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <Hero title="Cùng chung tay xây dựng 1 đất nước Việt Nam tươi đẹp hơn" />
            <Mission title="Dịch vụ quyên góp cho những thời điểm cần thiết" />
            <AboutUs title="Chúng tôi là một công ty phi lợi nhuận"/>
            <Causes title="Chung tay quyên góp giúp đỡ các hoàn cảnh khó khăn trên khắp cả nước." campaigns={reduxCampaign} />
        </motion.div>
    )
}