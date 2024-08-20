import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../Layouts/navs/NavLayout1";
import Footer from "../Layouts/Footer";
import React, { useState, useEffect, useLayoutEffect } from "react";

export default function Home({ auth, offers, offersExist, products }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };
    // // Filter valid offers based on current date
    const currentDate = new Date();
    const validOffers = offers.filter(offer => {
        const startDate = new Date(offer.from_date);
        const endDate = new Date(offer.end_date);
        return currentDate >= startDate && currentDate <= endDate;
    });

    useEffect(() =>{
        const slides = document.getElementsByClassName('slides');
        const slideCount = slides.length;
        let slideNumber = 0;
        showslide();

        function showslide() {
            let i;
            for (let i = 0; i < slides.length; i++) {
                // slides[i].style.display = 'none';
                slides[i].classList.remove('show');
            }
            slideNumber++
            if (slideNumber > slides.length) {
                slideNumber = 1
            }
            // slides[slideNumber-1].style.display = "block";
            slides[slideNumber - 1].classList.add('show');
            setTimeout(showslide, 5000);
        }
    });
    return (
        <>
            <Head title="Home" />
            <NavLayout1/>
            <div className="container mt-4">
                <div className="slide-container" style={{margin: 'auto'}}>
                {/* slide 1 */}
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
                            <div className="btn btn-outline-danger be-vietnam-pro-semibold" style={{fontSize: '20px'}}>Shop Now!</div>
                        </Link>
                    </div>
                    <div className="col-sm-7 d-flex justify-content-center order-sm-last">
                        <img src="/img/cover.png" alt="Cover Image" width={'75%'}/>
                    </div>
                    </div>
                </div>
                {/* slide 2 */}
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
                                <div className="btn btn-outline-danger be-vietnam-pro-semibold" style={{fontSize: '20px'}}>Shop Now!</div>
                            </Link>
                        </div>
                        <div className="col-sm-7 d-flex justify-content-center order-sm-last">
                            <img src="/img/x-banner.jpg" alt="Cover Image" width={'75%'}/>
                        </div>
                    </div>
                </div>
                </div>
                {/* Offers */}
                <div className="special-of-weeks" id="special-of-week">
                    <div className="h2 be-vietnam-pro-bold">Best Offers in this Week</div>
                    {offersExist & validOffers.length > 0 ? (
                    <div className="container d-flex justify-content-center align-items-center mb-5 row">
                        {validOffers.map((offers) => (
                        <div key={offers.id} className="card position-relative text-center p-4 shadow me-lg-5 me-sm-0 me-md-5 col-auto mb-5 mt-4">
                            <img src={offers.img} className="card-img-top" alt="Offer Image"/>
                            <h2 className="text-decoration-underline be-vietnam-pro-semibold printair-red">
                                {offers.title}
                            </h2>
                            <div className="texts">
                                <strong>Valid From:</strong><span> {offers.from_date}</span><br />
                                <strong>Valid till:</strong><span> {offers.end_date}</span>
                                <div className="be-vietnam-pro-light text-primary">
                                    {offers.description}
                                </div>
                            </div>
                            <div className="badge position-absolute">
                                <svg viewBox="0 0 100 100">
                                    <path id="circle" fill="none" stroke="none" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"/>
                                    <text>
                                        <textPath href="#circle" startOffset="50%">
                                            SALE SALE SALE SALE SALE
                                        </textPath>
                                    </text>
                                </svg>
                            </div>
                            <div className="badge-inner position-absolute">
                                <div className="small-word">Only Rs.</div>
                                <div className="price">{offers.price}</div>
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
            {products.map((product) => (

                product.published && product.id === 1 && (
                    // x-Banner
                    <div key={product.id} className="products" id="Products">
                        <div className="container-fluid bg-printair-red text-light p-3">
                            <div className="container">
                                {/* <div className="product-name h2 be-vietnam-pro-semibold mb-3">
                                    X-Banners
                                </div> */}
                                <div className="semi-product-title be-vietnam-pro-semibold-italic h3">
                                    Elevate Your Company with Our Premium <span className="text-warning text-decoration-underline">X-Banners</span>
                                </div>
                                <div className="row">
                                    <div className="col-sm-4"><img src="img/x-banner.jpg" alt="X Banners" className="border-radius shadow" width={'100%'} /></div>
                                    <div className="col-sm-8 d-flex align-items-center ps-4">
                                        <div className="des">
                                            <p>Welcome to the future of dynamic and portable advertising! Our X Banners are the perfect blend of elegance and functionality, designed to captivate and engage your audience effortlessly. Whether you’re at a trade show, retail store, or a special event, our X Banners will ensure your message stands out with stunning clarity and impact.</p>
                                            <Link href={route('products.x-banners')}>
                                                <div className="btn btn-outline-light">Order now <i className="fa-solid fa-arrow-right"></i></div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ))}

            {products.map((product) => (

            product.published && product.id === 2 && (
                // Pull Ups
                <div key={product.id} className="products" id="Products">
                    <div className="container-fluid bg-printair-gray text-light p-3">
                        <div className="container">
                            <div className="semi-product-title be-vietnam-pro-semibold-italic h3">
                                Elevate Your Company with Our Premium <span className="text-warning text-decoration-underline">Pull-up Banners (Roll-ups)</span>
                            </div>
                            <div className="row">
                                <div className="col-sm-4"><img src="img/x-banner.jpg" alt="X Banners" className="border-radius shadow" width={'100%'} /></div>
                                <div className="col-sm-8 d-flex align-items-center ps-4">
                                    <div className="des">
                                        <p>Elevate your advertising with our sleek and versatile Pull-Up Banners! Perfect for trade shows, events, and retail spaces, these banners are designed for easy setup and portability. With a smooth retractable mechanism and vibrant print quality, our Pull-Up Banners make it simple to showcase your message with professionalism and impact.</p>
                                        <Link href={route('products.pull-ups')}>
                                            <div className="btn btn-outline-light">Order now <i className="fa-solid fa-arrow-right"></i></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            ))}

            {products.map((product) => (

                product.published && product.id === 3 && (
                    // Mugs
                    <div key={product.id} className="products" id="Products">
                        <div className="container-fluid bg-printair-red text-light p-3">
                            <div className="container">
                                {/* <div className="product-name h2 be-vietnam-pro-semibold mb-3">
                                    X-Banners
                                </div> */}
                                <div className="semi-product-title be-vietnam-pro-semibold-italic h3">
                                Personalized Printed<span className="text-warning text-decoration-underline"> Mugs </span>- Perfect for Every Occasion!
                                </div>
                                <div className="row">
                                    <div className="col-sm-4"><img src="img/x-banner.jpg" alt="X Banners" className="border-radius shadow" width={'100%'} /></div>
                                    <div className="col-sm-8 d-flex align-items-center ps-4">
                                        <div className="des">
                                            <p>Introducing our collection of personalized printed mugs, designed to add a special touch to your everyday moments and celebrations. Whether you're looking for the perfect birthday gift, a thoughtful present for a loved one, or a unique promotional item for your business, our mugs are the ideal choice. Each mug can be customized according to your specific needs, allowing you to add your own designs, messages, or photos. Made from high-quality materials, our printed mugs are both durable and stylish, ensuring that your personalized creation will be cherished for years to come. Make every sip special with our one-of-a-kind printed mugs!</p>
                                            <Link href={route('products.mugs')}>
                                                <div className="btn btn-outline-light">Order now <i className="fa-solid fa-arrow-right"></i></div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ))}
            <div className="mt-5 mb-5">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="h2 be-vietnam-pro-extrabold">Looking for another products come and look</div>
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
