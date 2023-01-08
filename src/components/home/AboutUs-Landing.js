export default function AboutUs(args) {
    return (
        <div className="container col-xxl-12 px-4 py-5">
            <div className="row flex-lg-row align-items-center g-5 py-5">
                <div className="col-12 col-sm-8 col-lg-7">
                    <img
                        src="/images/ceo.jpg"
                        className="d-block mx-lg-auto img-fluid"
                        alt="Bootstrap Themes"
                        style={{
                            borderRadius: "0px 100px 0px 100px",
                        }}
                        loading="lazy"
                    />
                </div>
                <div className="col-lg-5">
                    <h1 className="display-5 fw-bold lh-3 mb-3">{args.title}</h1>

                    <p className="lead">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Magnis dis parturient montes nascetur
                        ridiculus mus mauris vitae. Amet tellus cras adipiscing
                        enim eu. Vulputate mi sit amet mauris commodo quis
                        imperdiet. <br /><br />
                        Tortor condimentum lacinia quis vel eros
                        donec ac odio. Nisl condimentum id venenatis a
                        condimentum vitae.
                    </p>

                    <button
                        type="button"
                        className="btn btn-darkYellow btn-lg px-4 me-md-2 rounded-5"
                    >
                        Tìm hiểu thêm
                    </button>
                </div>
            </div>
        </div>
    );
}
