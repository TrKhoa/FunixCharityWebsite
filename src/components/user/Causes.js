import Campaign from "../user/Campaign";

export default function Causes(args) {
    /*
    const CampaignGroup = () => {
        console.log(campaigns);
        if (campaigns != null)
            campaigns.map((val) => (
                <Campaign
                    title={val.name}
                    sub=""
                    image="https://picsum.photos/318/180"
                    raise={val.raise}
                    goal={val.goal}
                    percent="100"
                    desc={val.desc}
                />
            ));
    };
    */
    const campaigns = args.campaigns;
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
            </div>
            <div className="row align-items-center justify-content-center">
                {
                campaigns.data.map((val) => (
                        <Campaign
                            title={val.name}
                            sub=""
                            image="https://picsum.photos/318/180"
                            raise={val.raise}
                            goal={val.goal}
                            percent="100"
                            desc={val.desc}
                        />
                    ))
                }
            </div>
        </div>
    );
}
