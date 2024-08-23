import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../Layouts/navs/NavLayout1";
import Footer from "../Layouts/Footer";
import React, { useEffect } from "react";

export default function Home({ auth, offers, offersExist, products }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    // Filter valid offers based on current date
    const currentDate = new Date();
    const validOffers = offers.filter(offer => {
        const startDate = new Date(offer.from_date);
        const endDate = new Date(offer.end_date);
        return currentDate >= startDate && currentDate <= endDate;
    });

    useEffect(() => {
        const slides = document.getElementsByClassName('slides');
        const slideCount = slides.length;
        let slideNumber = 0;
        const showslide = () => {
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('show');
            }
            slideNumber++;
            if (slideNumber > slideCount) {
                slideNumber = 1;
            }
            slides[slideNumber - 1].classList.add('show');
            setTimeout(showslide, 5000);
        };
        showslide();
    }, []);

    // Filter products to show only specific IDs
    const filteredProducts = products.filter(product => [1, 2, 3].includes(product.id));

    return (
        <>
            <Head title="Home" />
            <NavLayout1 />
            <div className="container mt-4">
                <div className="slide-container" style={{ margin: 'auto' }}>
                    {/* Slide 1 */}
                    <div className="slides fade1">
                        <div className="row">
                            <div className="col-sm-5 mt-3">
                                <div className="be-vietnam-pro-black home-main-text">
                                    Boost your Business with Customized Banners...
                                </div>
                                <p className="para be-vietnam-pro-regular">
                                    Classy, attractive, indoor banner stands are versatile and creative ways to get your message to the masses.
                                    X stand banners and Roll up banners are a useful signage option to drive more traffic and clients your way.
                                </p>
                                <Link href={route('products')}>
                                    <div className="btn btn-outline-danger be-vietnam-pro-semibold" style={{ fontSize: '20px' }}>Shop Now!</div>
                                </Link>
                            </div>
                            <div className="col-sm-7 d-flex justify-content-center order-sm-last">
                                <img src="/img/cover.png" alt="Cover Image" width={'75%'} onError={handleImageError} />
                            </div>
                        </div>
                    </div>
                    {/* Slide 2 */}
                    <div className="slides fade1">
                        <div className="row">
                            <div className="col-sm-5 mt-3">
                                <div className="be-vietnam-pro-black home-main-text">
                                    Boost your Business with Customized Bannerhfgtytdftds...
                                </div>
                                <p className="para be-vietnam-pro-regular">
                                    Classy, attractive, indoor banner stands are versatile and creative ways to get your message to the masses.
                                    X stand banners and Roll up banners are a useful signage option to drive more traffic and clients your way.
                                </p>
                                <Link href={route('products')}>
                                    <div className="btn btn-outline-danger be-vietnam-pro-semibold" style={{ fontSize: '20px' }}>Shop Now!</div>
                                </Link>
                            </div>
                            <div className="col-sm-7 d-flex justify-content-center order-sm-last">
                                <img src="/img/x-banner.jpg" alt="X Banner" width={'75%'} onError={handleImageError} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Offers */}
                <div className="special-of-weeks" id="special-of-week">
                    <div className="h2 be-vietnam-pro-bold">Best Offers in this Week</div>
                    {offersExist && validOffers.length > 0 ? (
                        <div className="container d-flex justify-content-center align-items-center mb-5 row">
                            {validOffers.map((offer) => (
                                <div key={offer.id} className="card position-relative text-center p-4 shadow me-lg-5 me-sm-0 me-md-5 col-auto mb-5 mt-4">
                                    <img src={offer.img} className="card-img-top" alt="Offer Image" />
                                    <h2 className="text-decoration-underline be-vietnam-pro-semibold printair-red">
                                        {offer.title}
                                    </h2>
                                    <div className="texts">
                                        <strong>Valid From:</strong><span> {offer.from_date}</span><br />
                                        <strong>Valid till:</strong><span> {offer.end_date}</span>
                                        <div className="be-vietnam-pro-light text-primary">
                                            {offer.description}
                                        </div>
                                    </div>
                                    <div className="badge position-absolute">
                                        <svg viewBox="0 0 100 100">
                                            <path id="circle" fill="none" stroke="none" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                                            <text>
                                                <textPath href="#circle" startOffset="50%">
                                                    SALE SALE SALE SALE SALE
                                                </textPath>
                                            </text>
                                        </svg>
                                    </div>
                                    <div className="badge-inner position-absolute">
                                        <div className="small-word">Discount</div>
                                        <div className="price">{offer.price}%</div>
                                    </div>
                                    T&C apply.
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-warning">Sorry! We Don't have any offers right now.</div>
                    )}
                </div>
            </div>

                {/* Products */}
                {filteredProducts.map((product) => (
                    <div key={product.id} className="products" id="Products">
                        <div className={`container-fluid ${product.id === 1 ? 'bg-printair-red' : product.id === 2 ? 'bg-printair-gray' : 'bg-printair-red'} text-light p-3`}>
                            <div className="container">
                                <div className="semi-product-title be-vietnam-pro-semibold-italic h3">
                                    {product.id === 1 ? 'Elevate Your Company with Our Premium X-Banners' :
                                     product.id === 2 ? 'Elevate Your Company with Our Premium Pull-up Banners (Roll-ups)' :
                                     'Personalized Printed Mugs - Perfect for Every Occasion!'}
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <img src={`img/${product.id === 1 ? 'x-banner.jpg' : product.id === 2 ? 'x-banner.jpg' : 'x-banner.jpg'}`} alt={product.id === 1 ? 'X Banners' : product.id === 2 ? 'Pull Up Banners' : 'Mugs'} className="border-radius shadow" width={'100%'} />
                                    </div>
                                    <div className="col-sm-8 d-flex align-items-center ps-4">
                                        <div className="des">
                                            <p>
                                                {product.id === 1 ? 'Welcome to the future of dynamic and portable advertising! Our X Banners are the perfect blend of elegance and functionality, designed to captivate and engage your audience effortlessly. Whether you’re at a trade show, retail store, or a special event, our X Banners will ensure your message stands out with stunning clarity and impact.' :
                                                 product.id === 2 ? 'Elevate your advertising with our sleek and versatile Pull-Up Banners! Perfect for trade shows, events, and retail spaces, these banners are designed for easy setup and portability. With a smooth retractable mechanism and vibrant print quality, our Pull-Up Banners make it simple to showcase your message with professionalism and impact.' :
                                                 'Introducing our collection of personalized printed mugs, designed to add a special touch to your everyday moments and celebrations. Whether you\'re looking for the perfect birthday gift, a thoughtful present for a loved one, or a unique promotional item for your business, our mugs are the ideal choice. Each mug can be customized according to your specific needs, allowing you to add your own designs, messages, or photos. Made from high-quality materials, our printed mugs are both durable and stylish, ensuring that your personalized creation will be cherished for years to come. Make every sip special with our one-of-a-kind printed mugs!'
                                                }
                                            </p>
                                            <Link href={route(`products.${product.id === 1 ? 'x-banners' : product.id === 2 ? 'pull-ups' : 'mugs'}`)}>
                                                <div className="btn btn-outline-light">Order now <i className="fa-solid fa-arrow-right"></i></div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="mt-5 mb-5">
                    <div className="container d-flex justify-content-center align-items-center">
                        <div className="h2 be-vietnam-pro-extrabold">Looking for another products? Come and look</div>
                    </div>
                    <div className="container d-flex justify-content-center align-items-center">
                        <Link href={route('products')}>
                            <button className="btn btn-outline-danger"><span className="h5">We have more products</span></button>
                        </Link>
                    </div>
                </div>
            <Footer />
        </>
    );
}
