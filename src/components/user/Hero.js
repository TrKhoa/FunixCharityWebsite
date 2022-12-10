export default function Hero(args) {
    
    return (
        <div className="container col-xxl-12 px-4 py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-7">
                    <img
                        src='/image/charity.png'
                        className="d-block mx-lg-auto img-fluid"
                        alt="Bootstrap Themes"
                        loading="lazy"
                    />
                </div>
                <div className="col-lg-5">
                    <h1 className="display-4 fw-bold lh-3 mb-3">
                        {args.title}
                    </h1>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button
                            type="button"
                            className="btn btn-primary btn-lg px-4 me-md-2 btn-darkYellow rounded-5"
                        >
                            Chiến dịch
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-darkYellow btn-lg px-4 rounded-5"
                        >
                            Đóng góp ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
