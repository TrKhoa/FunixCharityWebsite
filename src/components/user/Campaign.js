import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Progress,
} from "reactstrap";
import { NumericFormat } from "react-number-format";

export default function Campaign(data) {
    const { title } = data;
    const { image } = data;
    const { desc } = data;
    const { sub } = data || "";
    const { raise } = data;
    const { goal } = data;
    const percent = () => {
        const count = Math.ceil((raise * 100) / goal);
        if (count > 100) return 100;
        else if (count < 0) return 0;
        else return count;
    };

    return (
        <Card
            className="col-xxl-4 col-md-5 mt-5 border-0 hover-card-shadow"
            style={{ height: "500px" }}
        >
            <CardImg alt="Card image cap" src={image} top width="100%" />
            <CardBody>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {sub}
                </CardSubtitle>
                <CardText>{desc}</CardText>
                <div className="position-relative">
                    <Progress
                        className="my-3"
                        style={{
                            height: "10px",
                            maxWidth: "88%",
                        }}
                        color="warning"
                        value={percent()}
                    />
                    <div
                        className="position-absolute top-0 end-0"
                        style={{
                            translate: "0px -7px",
                        }}
                    >
                        {percent()}%
                    </div>
                    <div className="position-relative w-full">
                        <div>
                            <label
                                className="fw-bold"
                                style={{
                                    color: "#FFBF00",
                                }}
                            >
                                Hiện tại:
                            </label>
                            <NumericFormat
                                value={raise}
                                thousandSeparator=","
                                displayType="text"
                                renderText={(value) => " " + value + " VND"}
                            />
                        </div>
                        <div className="position-absolute top-0 end-0">
                            <label
                                className="fw-bold"
                                style={{
                                    color: "#FFBF00",
                                }}
                            >
                                Goal:
                            </label>
                            <NumericFormat
                                value={goal}
                                thousandSeparator=","
                                displayType="text"
                                renderText={(value) => " " + value + " VND"}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    color="btn btn-outline-darkYellow btn-md rounded-5 fw-bold mt-4"
                    outline
                >
                    ỦNG HỘ
                </Button>
            </CardBody>
        </Card>
    );
}
