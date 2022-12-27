import { useState,useRef } from "react";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Progress, Carousel, CarouselItem, CarouselControl } from "reactstrap";
import { percent } from "../../util/calculate";
import { postDonate } from "../../redux/apiRequest"
import Campaign from "./Campaign";

export default function CauseDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const reduxCampaign = useSelector((state) => state.campaign.data);
    const data = reduxCampaign.filter((campaign) => campaign._id === id)[0];
    const donate = useRef();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const value = donate.current.value;
        if(value){
            if(value>=10000){
                postDonate(dispatch, value);
            } else {
                alert("Số tiền ủng hộ phải lớn hơn bằng 10.000 VND")
            }
        } else {
            alert("Vui lòng nhập số tiền muốn ủng hộ")
        }
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex =
            activeIndex === reduxCampaign.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex =
            activeIndex === 0 ? reduxCampaign.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = reduxCampaign.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item._id}
            >
                <Campaign
                    fullCard
                    noRaise
                    id={item._id}
                    title={item.name}
                    sub=""
                    image={process.env.REACT_APP_SERVER_URL + item.image}
                    raise={item.raise}
                    goal={item.goal}
                    desc=""
                />
            </CarouselItem>
        );
    });

    if (!data) {
        return <></>;
    } else {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container row col-xxl-12 p-5 my-5 mx-auto"
            >
                <div className="col-xxl-8">
                    <img
                        src={process.env.REACT_APP_SERVER_URL + data.image}
                        className="d-block mx-lg-auto img-fluid"
                        alt="Bootstrap Themes"
                    />
                    <div className="my-5">
                        <h2>{data.name}</h2>

                        <div className="p-3">
                            <div className="position-relative mb-4">
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
                                            value={data.raise}
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
                                            value={data.goal}
                                            thousandSeparator=","
                                            displayType="text"
                                            renderText={(value) =>
                                                " " + value + " VND"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="position-relative">
                                <Progress
                                    style={{
                                        height: "5px",
                                        maxWidth: "88%",
                                    }}
                                    color="warning"
                                    value={percent(data.raise, data.goal)}
                                />
                                <div
                                    className="position-absolute top-0 end-0"
                                    style={{
                                        translate: "0px -7px",
                                    }}
                                >
                                    {percent(data.raise, data.goal)}%
                                </div>
                            </div>
                            <form onSubmit={(e)=> handleSubmit(e)} class="input-group my-3">
                                <input
                                    type="number"
                                    class="form-control"
                                    placeholder="100000"
                                    ref={donate}
                                    aria-label="donate"
                                    aria-describedby="donate"
                                />
                                <button
                                    class="btn btn-outline-secondary"
                                    type="submit"
                                    id="donate"
                                >
                                    Ủng hộ
                                </button>
                            </form>
                        </div>
                    </div>
                    <div>{data.desc}</div>
                </div>
                <div className="col-xxl-4">
                    <Carousel
                        className="px-5"
                        activeIndex={activeIndex}
                        dark
                        next={next}
                        previous={previous}
                    >
                        {slides}
                        <CarouselControl
                            direction="prev"
                            directionText="Previous"
                            onClickHandler={previous}
                        />
                        <CarouselControl
                            direction="next"
                            directionText="Next"
                            onClickHandler={next}
                        />
                    </Carousel>
                </div>
            </motion.div>
        );
    }
}
