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
import { Link } from "react-router-dom";
import { percent } from "../../util/calculate";
export default function Campaign(data) {
    const { id, title, image, desc, sub, raise, goal, fullCard, noRaise } = data;

    const cardClass = () => {
        if (fullCard === true) {
            return "border-0 hover-card-shadow text-break";
        } else {
            return "col-xxl-4 col-md-5 mt-5 border-0 hover-card-shadow text-break";
        }
    };

    const raiseShow = () => {
        if (noRaise === true) {
            return "d-none";
        } else {
            return "";
        }
    };

    return (
        <Card className={cardClass()} style={{ height: "500px" }}>
            <Link
                to={"/Cause/" + id}
                className="text-black text text-decoration-none"
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
                            value={percent(raise, goal)}
                        />
                        <div
                            className="position-absolute top-0 end-0"
                            style={{
                                translate: "0px -7px",
                            }}
                        >
                            {percent(raise, goal)}%
                        </div>
                        <div className={raiseShow()}>
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
                                        renderText={(value) =>
                                            " " + value + " VND"
                                        }
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
                                        renderText={(value) =>
                                            " " + value + " VND"
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button
                        color="btn btn-outline-darkYellow btn-md rounded-0 fw-bold mt-4"
                        outline
                    >
                        ỦNG HỘ
                    </Button>
                </CardBody>
            </Link>
        </Card>
    );
}
