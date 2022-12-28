import { Alert } from "reactstrap";

export default function Notification(props) {
    const {color,message} = props;
    if(message)
    {
        return (
            <Alert color={color}>
                {message}
            </Alert>
        )
    }
}