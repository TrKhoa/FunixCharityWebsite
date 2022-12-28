import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Bread from '../../components/assets/Bread'
import Cause from '../../components/causes/Causes'


export default function Causes(){
    const reduxCampaign = useSelector((state) => state.campaign)
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <Bread />
            <Cause campaigns={reduxCampaign} />
        </motion.div>
    )
}