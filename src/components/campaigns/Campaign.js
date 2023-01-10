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
    //Khai báo biến
    const { id, title, image, desc, sub, raise, goal, fullCard, noRaise } = data;
    //Chỉnh sửa thuộc tính
    const cardClass = () => {
        if (fullCard === true) {
            return "border-0 hover-card-shadow text-break";
        } else {
            return "col-xxl-4 col-md-5 mt-lg-5 border-0 hover-card-shadow text-break";
        }
    };
    const raiseShow = () => {
        if (noRaise === true) {
            return "d-none";
        } else {
            return "";
        }
    };

    //Trả về
    return (
        <Card className={cardClass()} style={{ height: "550px" }}>
            <Link
                to={"/Cause/" + id}
                className="text-black text text-decoration-none"
            >
                {/* Hình ảnh */}
                <CardImg alt="Card image cap" src={image} top width="100%" />
                <CardBody>
                    {/* Tên */}
                    <CardTitle tag="h5">{title}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted truncate-2" tag="h6">
                        {sub}
                    </CardSubtitle>
                    {/* Mô tả */}
                    <CardText className="truncate-2">{desc}</CardText>
                    {/* Tiến độ */}
                    <div className="position-relative d-none d-lg-block ">
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
                    {/* Truy cập trang */}
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
