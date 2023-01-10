import { Alert } from "reactstrap";

export default function Notification(props) {
    //Khai báo biến
    const {color,message} = props;
    //Trả về thông báo nếu có
    if(message)
    {
        return (
            <Alert color={color}>
                {message}
            </Alert>
        )
    }
}