import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../Layouts/navs/NavLayout1";

export default function Home({ auth }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Home" />
            <NavLayout1/>
            <div className="container mt-4 ">
                <div className="row">
                    <div className="col-sm-5 mt-3">
                        <div className="be-vietnam-pro-black home-main-text">
                            Boost your Business with Customized Banners...
                        </div>
                        <p className="para be-vietnam-pro-regular">
                            Classy, attractive, indoor banner stands are versatile and creative ways to get your message to the masses.
                            X stand banners and Roll up banners are a useful signage option to drive more traffic and clients your way.
                        </p>
                        <div className="btn btn-outline-danger be-vietnam-pro-semibold" style={{fontSize: '20px'}}>Shop Now!</div>
                    </div>
                    <div className="col-sm-7 d-flex justify-content-center order-sm-last">
                        <img src="img/cover.png" alt="Cover Image" width={'75%'}/>
                    </div>
                </div>
                <div className="special-of-weeks" id="special-of-week">
                    <div className="h2 be-vietnam-pro-bold">Best Offers in this Week</div>
                </div>
                <div className="products" id="Products">
                    <div className="h2 be-vietnam-pro-bold">Our Products</div>

                </div>
            </div>
        </>
    );
}