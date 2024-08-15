import { Link, Head } from "@inertiajs/react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer-bg bg-light pt-2 pb-1">
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 pt-3 my-5 border-top ms-2 me-2">
            <div className="col mb-3">
                {/* <Link href={route('home')} className="d-flex align-items-center mb-3 text-decoration-none">
                    <img src="/img/wg-logo.png" alt="Logo" height={50}/>
                </Link> */}
                <div className="be-vietnam-pro-bold h3 text-danger">Printair Advertising</div>
                <p className="text-body-light">No. 67/D/1, <br /> Uggashena Road, <br /> Walpola, <br />Ragama, Sri Lanka <br />11011</p>
            </div>

            <div className="col mb-3">
            </div>

            <div className="col mb-3">
                <h5 className="text-danger">Contact Us</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">Email us: printair2@gmail.com</li>
                    <li className="nav-item mb-2">Call us: 011 224 </li>
                    <li className="nav-item mb-2">Whatsapp: 071 158 7686</li>
                </ul>
            </div>

            <div className="col mb-3">
            </div>

            <div className="col mb-3">
                <h5 className="text-danger">Important Links</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><Link href={route('home')} className="nav-link p-0">Home</Link></li>
                    <li className="nav-item mb-2"><Link href={route('products')} className="nav-link p-0">Products</Link></li>
                    <li className="nav-item mb-2"><Link href={route('products')} className="nav-link p-0">Design services</Link></li>
                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0">Price list</Link></li>
                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0">FAQs</Link></li>
                    <li className="nav-item mb-2"><Link href={route('about_us')} className="nav-link p-0">About</Link></li>
                    <li className="nav-item mb-2"><Link href="#" className="nav-link p-0">Sitemap</Link></li>
                </ul>
            </div>
            <div className="copyright border-top w-100">All Right Reserved &copy; {currentYear}</div>
        </footer>
        </div>
    );
}
