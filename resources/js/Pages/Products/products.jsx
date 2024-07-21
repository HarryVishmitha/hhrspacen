import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../../Layouts/navs/NavLayout1";
import React, { useState, useEffect, useLayoutEffect } from "react";

export default function Home({ auth, offers, offersExist, products }) {

    return (
        <>
            <Head title="Products" />
            <NavLayout1/>
            <div>
                <h2>Products</h2>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <h3>{product.name}</h3>
                                <p>{product.simple_description}</p>
                                <p>{product.description}</p>
                                <p>Template Type: {product.template_type}</p>
                                <h4>Prices</h4>
                                <ul>
                                    {product.prices.map((price, index) => (
                                        <li key={index}>
                                            <p>Price: {price.price}</p>
                                            <p>Updated on: {price.updated_on}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </>
    );
}
