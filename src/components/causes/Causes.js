import { Link, useLocation } from "react-router-dom";
import Campaign from "../campaigns/Campaign";

export default function Causes(args) {
    //Khai báo biến
    const search = useLocation().search;
    const query = new URLSearchParams(search);

    //Phân trang
    const itemsPerPage = 6;
    const campaigns = args.campaigns;
    const total = campaigns.data.length;
    const lastPage = Math.ceil(total / itemsPerPage);
    let page = parseInt(query.get("page")) || 1;
    if(page < 0 || page > lastPage){
        page = 1;
    }
    const nextPage = itemsPerPage * page < total;
    const { title } = args || "";
    const extraInfo = () => {
        if (title === "" || title === undefined) {
            return {
                display: "d-none",
                limit: page * itemsPerPage,
                skip: (page - 1) * itemsPerPage,
            };
        } else return { display: "", limit: 6, skip: 0 };
    };

    //Giao diện phân trang
    const Pagination = ({display}) => {
        return (
            <div class={display ? display : ''}>
                <ul class="pagination justify-content-center pt-5">
                {page > 1 ? (
                    <li class="page-item">
                        <Link to="/Cause?page=1" class="page-link">
                            Trang đầu
                        </Link>
                    </li>
                ) : (
                    <li class="page-item">
                        <span class="page-link text-secondary">Trang đầu</span>
                    </li>
                )}
                {page > 1 ? (
                    <li class="page-item">
                        <Link
                            to={"/Cause?page=" + (page - 1)}
                            class="page-link"
                        >
                            {page - 1}
                        </Link>
                    </li>
                ) : (
                    ""
                )}
                <li class="page-item active" aria-current="page">
                    <span class="page-link">{page}</span>
                </li>
                {nextPage ? (
                    <>
                        <li class="page-item" aria-current="page">
                            <Link
                                to={"/Cause?page=" + (page + 1)}
                                class="page-link"
                            >
                                {page + 1}
                            </Link>
                        </li>
                        <li class="page-item">
                            <Link to={"/Cause?page=" + lastPage} class="page-link">
                                Trang cuối
                            </Link>
                        </li>
                    </>
                ) : (
                    <li class="page-item">
                        <span class="page-link text-secondary">
                            Trang cuối
                        </span>
                    </li>
                )}
            </ul>
            </div>
        );
    };

    //Trả về
    return (
        <div className="container col-xxl-12">
            <div className={extraInfo().display}>
                <div className="row align-items-center justify-content-center g-5 py-5">
                    <h1 className="display-5 fw-bold lh-3 mb-3 col-xxl-8 text-center">
                        {title}
                    </h1>
                    <p className="lead">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                </div>
            </div>
            {/* Chiến dịch */}
            <div className="row align-items-center justify-content-center">
                {campaigns.data
                    .slice(extraInfo().skip, extraInfo().limit)
                    .map((val) => (
                        <Campaign
                            id={val._id}
                            title={val.name}
                            sub=""
                            image={process.env.REACT_APP_SERVER_URL + val.image}
                            raise={val.raise}
                            goal={val.goal}
                            desc={val.desc}
                        />
                    ))}
            </div>
            {/* Phân trang */}
            <Pagination display={extraInfo().display == "d-none" ? '' : 'd-none'}/>
        </div>
    );
}
