import { useState } from "react";
import { motion } from "framer-motion"
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    Progress,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from "reactstrap";
import { percent } from "../../util/calculate";
import Campaign from "./Campaign";

export default function CauseDetail() {
    const { id } = useParams();
    const reduxCampaign = useSelector((state) => state.campaign.data);
    const data = reduxCampaign.filter((campaign) => campaign._id === id)[0];
    const donatePercent = percent(data.raise, data.goal);

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
                    image="https://picsum.photos/318/180"
                    raise={item.raise}
                    goal={item.goal}
                    desc=""
                />
            </CarouselItem>
        );
    });

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="container row col-xxl-12 p-5 my-5 mx-auto">
            <div className="col-xxl-8">
                <img
                    src="/image/login/closeup-diverse-people-joining-their-hands.jpg"
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
                                value={donatePercent}
                            />
                            <div
                                className="position-absolute top-0 end-0"
                                style={{
                                    translate: "0px -7px",
                                }}
                            >
                                {donatePercent}%
                            </div>
                        </div>
                    </div>
                </div>
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
