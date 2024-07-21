import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../../Layouts/navs/NavLayout1";
import React, { useState, useEffect, useLayoutEffect } from "react";

export default function Home({ auth, offers, offersExist, products }) {

    return (
        <>
            <Head title="Products" />
            <NavLayout1/>
            <div className="container-fluid">
                <h1 className="be-vietnam-pro-bold mt-3 printair-red">All our Products</h1>
                {products.length > 0 ? (
                    <div className="row ms-3 me-3">
                        {products.map((product) => (
                            <div key={product.id} className="col-sm-3 card me-3 p-4">
                                <h3 className="text-center">{product.name}</h3>
                                <p className="printair-gray">{product.simple_description}</p>
                                {product.prices.map((price, index) => (
                                    <span key={index} className="be-vietnam-pro-semibold">LKR. {price.price} </span>
                                ))}
                                {product.vearients ? (
                                    <div className="sw-3 printair-red">This product has variants.</div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </>
    );
}
