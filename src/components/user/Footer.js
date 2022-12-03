import {Link} from 'react-router-dom'

export default function Footer() {
    return (
        <div className="container">
            <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
                <div className="col mb-3">
                    <a
                        href="/"
                        className="d-flex align-items-center mb-3 link-dark text-decoration-none"
                    >
                        
                    </a>
                    <p className="text-muted">&copy; 2022</p>
                </div>

                <div className="col mb-3"></div>

                <div className="col mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                Features
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                Pricing
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                FAQs
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                Features
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                Pricing
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                FAQs
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col mb-3">
                    <h5>Section</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                Features
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                Pricing
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                FAQs
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link href="#" className="nav-link p-0 text-muted">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}
