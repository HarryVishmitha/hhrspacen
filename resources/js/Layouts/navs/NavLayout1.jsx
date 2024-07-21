import { Link, Head } from "@inertiajs/react";

export default function NavLayout1() {
    return(
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid p-1">
                <Link href={ route('home') } className="navbar-brand ms-3">
                    <img src="img/wg-logo.png" alt="Logo" className="d-inline-block align-text-top logo"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbars" aria-controls="navbars" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbars" className="navbar-collapse collapse">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 be-vietnam-pro-regular me-3">
                        <li className="nav-item">
                            <Link href={ route('home')} className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={ route('products')} className="nav-link">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={ route('home')} className="nav-link">
                                Design Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={ route('home')} className="nav-link">
                                Price List
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={ route('home')} className="nav-link">
                                Our Story
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={ route('home')} className="nav-link">
                                Contact Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href={ route('dashboard')} className="nav-link">
                                My account
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
