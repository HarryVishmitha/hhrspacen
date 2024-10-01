import { Link, Head, useForm } from '@inertiajs/react';
import NavLayout1 from "../../Layouts/navs/NavLayout1";
import React, { useState } from 'react';
import Footer from "../../Layouts/Footer";

export default function ProductDetails({ product }) {
    console.log(product);
    const [slideIndex, setSlideIndex] = useState(0); // Start with the first slide
    const [selectedPrices, setSelectedPrices] = useState({}); // State to store selected variant prices
    const [finalPrice, setFinalPrice] = useState(product.prices[0].price); // Initial price is base price

    // Function to group variants by their type
    const groupVariantsByType = (variants) => {
        return variants.reduce((acc, variant) => {
            if (!acc[variant.variant_type]) {
                acc[variant.variant_type] = [];
            }
            acc[variant.variant_type].push(variant);
            return acc;
        }, {});
    };

    const groupedVariants = groupVariantsByType(product.variants);

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % product.links.length);
    };

    const prevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex - 1 + product.links.length) % product.links.length);
    };

    const goToSlide = (index) => {
        setSlideIndex(index);
    };

    // Handle dropdown change event for variants
    const handleVariantChange = (variantType, event) => {
        const selectedVariant = groupedVariants[variantType].find(
            (variant) => variant.variant_value === event.target.value
        );

        // Update the price by adding the selected variant's price to the base price
        setFinalPrice(selectedVariant.price);

        setSelectedPrices((prevSelectedPrices) => ({
            ...prevSelectedPrices,
            [variantType]: selectedVariant.price, // Set the selected price for the variant type
        }));
    };

    return (
        <>
            <Head title={product.name} description={product.simple_description} />
            <NavLayout1 />
            <div className="m-4 p-4 border rounded">
                <div title={product.name + ' Description'}>
                    <div className="product-page row">
                        {/* images */}
                        <div className="col-sm-6">
                            <div className="d-flex justify-content-center">

                                <div className="productImages">
                                    {/* Main slide */}
                                    <div className="productImageSlide d-flex justify-content-center bg-secondary p-2">
                                        <div className="numberText"> {slideIndex + 1} / {product.links.length}</div>
                                        <img src={product.links[slideIndex]} alt={`product image ${slideIndex + 1}`} className='border rounded-sm w-75' />
                                    </div>

                                    {/* Next and previous buttons */}
                                    <a className="prev" onClick={prevSlide}>&#10094;</a>
                                    <a className="next" onClick={nextSlide}>&#10095;</a>

                                    {/* Captions */}
                                    <div className="caption-container">
                                        <p>{`Slide ${slideIndex + 1} / ${product.links.length}`}</p>
                                    </div>

                                    {/* Thumbnails */}
                                    <div className="rowt">
                                        {product.links.map((link, index) => (
                                            <div className="column" key={index} onClick={() => goToSlide(index)}>
                                                <img src={link} alt={`product image ${index + 1}`} className={`demo cursor ${slideIndex === index ? "active" : ""}`} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                        {/* Product Details */}
                        <div className="col-sm-6">
                            <div className="productDetails ps-4">
                                <h1 className="text-3xl font-bold mb-2 be-vietnam-pro-bold">{product.name}</h1>
                                <p>{product.simple_description}</p>

                                <div className="be-vietnam-pro-light" id='productPrice'>Rs. {finalPrice}</div>

                                {/* Displaying variants as dropdowns */}
                                {Object.keys(groupedVariants).map((variantType, index) => (
                                    <div key={index} className="variant-group mb-3">
                                        <label className="form-label">{variantType}</label>
                                        <select
                                            className="form-select"
                                            onChange={(e) => handleVariantChange(variantType, e)}
                                        >
                                            {groupedVariants[variantType].map((variant, idx) => (
                                                <option key={idx} value={variant.variant_value}>
                                                    {variant.variant_value} - Rs. {variant.price}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}

                                {/* Display selected variant prices */}
                                {Object.keys(selectedPrices).map((variantType, index) => (
                                    <div className="selected-price" key={index}>
                                        <p>Selected {variantType} price: Rs. {selectedPrices[variantType]}</p>
                                    </div>
                                ))}
                                <div className="alert alert-warning">
                                    <strong>Sorry!</strong>
                                    <p>We don't accept online orders right now. But we will accept online orders soon.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
