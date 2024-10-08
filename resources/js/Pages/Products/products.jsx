import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../../Layouts/navs/NavLayout1";
import Footer from "../../Layouts/Footer";
import React, { useEffect, useRef } from "react";

export default function Home({ auth, offers, offersExist, products, categories }) {
    const categoryRefs = useRef({}); // To store refs for each category

    const sanitizeUrl = (name) => {
        return name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[()]/g, '')
            .replace(/x/g, 'x'); // You can modify this if needed
    };

    // Group products by all their categories
    const groupProductsByAllCategories = (products) => {
        const categories = {};

        products.forEach((product) => {
            if (product.categories && product.categories.length > 0) {
                // Iterate through all categories of the product
                product.categories.forEach((category) => {
                    if (!categories[category]) {
                        categories[category] = [];
                    }

                    // Add product to this category
                    categories[category].push(product);
                });
            } else {
                // If no categories, assign the product to "Other"
                if (!categories["Other"]) {
                    categories["Other"] = [];
                }
                categories["Other"].push(product);
            }
        });

        return categories;
    };

    const groupedProducts = groupProductsByAllCategories(products);

    const handleAnchorClick = (category) => {
        const element = categoryRefs.current[category];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the category section
        }
    };

    return (
        <>
            <Head title="Products" />
            <NavLayout1 />
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-sm-4 d-flex justify-content-center text-secondary">
                        {/* Category Viewer */}
                        <div className="mb-5">
                            <h3 className="be-vietnam-pro-semibold mt-4 text-decoration-underline">Special Packages for you</h3>
                            <ul>
                                {Object.keys(groupedProducts).map((category) => (
                                    <li key={category}>
                                        <button 
                                            onClick={() => handleAnchorClick(category)} 
                                            className="btn btn-link text-decoration-none text-secondary"
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Product Shower */}
                    <div className="col-sm-8">
                        {Object.keys(groupedProducts).length > 0 ? (
                            Object.keys(groupedProducts).map((category) => (
                                <div 
                                    key={category} 
                                    ref={(el) => (categoryRefs.current[category] = el)} // Assign ref to category
                                    className="mb-5"
                                >
                                    <h2 className="be-vietnam-pro-semibold mt-4">{category}</h2>
                                    <div className="row ms-3 me-3">
                                        {groupedProducts[category].map((product) => (
                                            <Link 
                                                href={`/products/${product.id}/${sanitizeUrl(product.name)}`} 
                                                key={product.id} 
                                                className="col-sm-2 border rounded-2 me-3 p-3 mb-3 d-flex flex-column align-items-center shadow text-decoration-none"
                                            >
                                                <img 
                                                    src={product.first_img} 
                                                    alt={`${product.name} cover image`} 
                                                    style={{width: '50%'}} 
                                                />
                                                <h3 className="text-center link-dark-hoverable">{product.name}</h3>
                                                {product.prices.map((price, index) => (
                                                    <span key={index} className="be-vietnam-pro-semibold">LKR. {price.price}</span>
                                                ))}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products available</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
