import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../../Layouts/navs/NavLayout1";
import Footer from "../../Layouts/Footer";
import React from "react";

export default function Home({ auth, offers, offersExist, products }) {
    const sanitizeUrl = (name) => {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[()]/g, '')
            .replace(/x/g, 'x'); // You can modify this if needed
    };

    // Group products by category
    const groupProductsByCategory = (products) => {
        const categories = {};

        products.forEach((product) => {
            const category = product.category || "Other"; // If no category, assign to "Other"

            if (!categories[category]) {
                categories[category] = [];
            }

            categories[category].push(product);
        });

        return categories;
    };

    const groupedProducts = groupProductsByCategory(products);

    return (
        <>
            <Head title="Products" />
            <NavLayout1 />
            <div className="container-fluid mb-5">
                {/* <h1 className="be-vietnam-pro-bold mt-3 printair-red">All our Products</h1> */}

                {Object.keys(groupedProducts).length > 0 ? (
                    Object.keys(groupedProducts).map((category) => (
                        <div key={category} className="mb-5">
                            <h2 className="be-vietnam-pro-semibold mt-4">{category}</h2>
                            <div className="row ms-3 me-3">
                                {groupedProducts[category].map((product) => (
                                    <Link href={`/products/${product.id}/${sanitizeUrl(product.name)}`} key={product.id} className="col-sm-2 border rounded-2 me-3 p-3 mb-3 d-flex flex-column align-items-center shadow text-decoration-none">
                                        <img src={product.first_img} alt={`${product.name} cover image`} style={{width: '50%'}} />
                                        <h3 className="text-center link-dark-hoverable">{product.name}</h3>
                                        {product.prices.map((price, index) => (
                                            <span key={index} className="be-vietnam-pro-semibold">LKR. {price.price}</span>
                                        ))}
                                        {/* {product.variants ? (
                                            <div className="sw-3 printair-red">This product has variants.</div>
                                        ) : null} */}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
            <Footer />
        </>
    );
}
