export default function Mission(args) {
    return (
        <div className="container col-xxl-12 px-4 py-5">
            <div className="row align-items-center justify-content-center g-5 py-5">
                <h1 className="display-5 fw-bold lh-3 mb-3 col-xxl-8 text-center">
                    {args.title}
                </h1>

                <p className="lead">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                </p>

                <div className="d-flex row align-items-center justify-content-center">
                    <div className="col-12 col-md-5 col-lg-2">
                        <img src="/images/icon-1.png" alt="1" />
                        <h4 className="fw-bold mt-5 mb-3">Giúp trẻ em</h4>
                        <p className="">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="col-12 col-md-5 col-lg-2 offset-0 offset-md-1">
                        <img src="/images/icon-2.png" alt="1" />
                        <h4 className="fw-bold mt-5 mb-3">Cơ sở hạ tầng</h4>
                        <p className="">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="col-12 col-md-5 col-lg-2 offset-lg-1">
                        <img src="/images/icon-3.png" alt="1" />
                        <h4 className="fw-bold mt-5 mb-3">Về giáo dục</h4>
                        <p className="">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="col-12 col-md-5 col-lg-2 offset-md-1">
                        <img src="/images/icon-4.png" alt="1" />
                        <h4 className="fw-bold mt-5 mb-3">Về lương thực</h4>
                        <p className="">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
