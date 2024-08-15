import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../Layouts/navs/NavLayout1";
import Footer from "../Layouts/Footer";
import React, { useState, useEffect, useLayoutEffect } from "react";

export default function About({ auth}) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Our Story" />
            <NavLayout1/>
            <div className="container-fluid p-4">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="d-flex align-items-center justify-content-center">
                            <img src="/img/About-Us-1.jpg" alt="company profile" width={'100%'}/>
                        </div>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-center align-items-center">
                        <div className="about">
                            <h2 title="About us -1" className="be-vietnam-pro-bold">We believe that quality over quantity is the key to success.</h2>
                            <p className="text-gray be-vietnam-pro-light left-justify">We have always maintained our focus on delivering high quality products to our clients.</p> <p className="text-gray be-vietnam-pro-light left-justify">We are a printing company that has been operating since 2010. We started by providing graphic designing services to our clients and today we have expanded into the field of Printing, Digital Printing, Marketing Materials and Packaging design.</p> <p className="text-gray be-vietnam-pro-light left-justify">We are a team of talented professionals who want to create something unique for you. We are here with you every step of the way from concept designing, through professional designing, till your final product is delivered to your doorstep in great time and at very affordable rates.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 d-flex justify-content-center align-items-center">
                        <div className="about">
                            <h2 title="About us -2" className="be-vietnam-pro-bold">Our Mission</h2>
                            <p className="text-gray be-vietnam-pro-light left-justify">Our mission is to provide you with the highest-quality products and services possible in a timely fashion and at a competitive price. We promise to listen to you and help you achieve your business goals.</p>
                        </div>
                    </div>
                    <div className="col-sm-6 d-flex justify-content-center align-items-center">
                        <img src="/img/About-Us-2.jpg" alt="About us photo 2" width={'100%'}/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
