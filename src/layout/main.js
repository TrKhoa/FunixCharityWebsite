import User from './user'
import Loading from '../components/Loading'
import { useSelector } from 'react-redux'

export default function Main() { 

    const loadingState = useSelector((state) => state.campaign.pending)
    return (
        <>
            <Loading isLoading={loadingState}/>
            <User />
        </>
    )
}