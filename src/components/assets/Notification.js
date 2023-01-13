import { Alert } from "reactstrap";
import { useState } from "react";

export default function Notification(props) {
    //Khai báo biến
    const {color,message} = props;
    const [visible, setVisible] = useState(true);
    const onDismiss = () => setVisible(false);
    //Trả về thông báo nếu có
    if(message)
    {
        return (
            <Alert color={color} isOpen={visible} toggle={onDismiss}>
                {message}
            </Alert>
        )
    }
}