import { useSelector } from 'react-redux'
import Bread from '../../components/user/Bread'
import Cause from '../../components/user/Causes'


export default function Causes(){
    const reduxCampaign = useSelector((state) => state.campaign)
    return (
        <>
            <Bread />
            <Cause campaigns={reduxCampaign} />
        </>
    )
}