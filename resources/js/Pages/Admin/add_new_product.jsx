import React, { useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import Adminnav from "../../Layouts/navs/adminnav";
import Backablenav from '../../Layouts/navs/backable';

export default function AddNewProduct({ auth, nav }) {
    const { data, setData, post, processing, errors } = useForm({
        product_name: '',
        pSimple_description: '',
        product_description: '',
        price: '',
        publish: false,
        product_url: '',
    });

    const checkurl = (e) => {

    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/products');
    };

    return (
        <>
            <Head title='Add New Product' />
            <Adminnav user={auth.user} />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-sm-3 d-flex justify-content-center p-3">
                        <Backablenav navdata={nav} />
                    </div>
                    <div className="col-sm-9 ps-5 p-4 mt-3 bg-light border-radius container shadow-sm">
                        <h2>Add New Product</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="product_name"
                                    placeholder="Product Name"
                                    value={data.product_name}
                                    onChange={e => setData('product_name', e.target.value)}
                                />
                                <label htmlFor="product_name">Product Name</label>
                                {errors.product_name && <div className="text-danger">{errors.product_name}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pSimple_description"
                                    placeholder="Simple Description"
                                    value={data.pSimple_description}
                                    onChange={e => setData('pSimple_description', e.target.value)}
                                />
                                <label htmlFor="pSimple_description">Simple Description</label>
                                {errors.pSimple_description && <div className="text-danger">{errors.pSimple_description}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <textarea
                                    className="form-control"
                                    id="product_description"
                                    placeholder="Product Description"
                                    rows="5"
                                    value={data.product_description}
                                    onChange={e => setData('product_description', e.target.value)}
                                    style={{ minHeight: '150px'}}
                                ></textarea>
                                <label htmlFor="product_description">Product Description</label>
                                {errors.product_description && <div className="text-danger">{errors.product_description}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    placeholder="Price"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                />
                                <label htmlFor="price">Price</label>
                                {errors.price && <div className="text-danger">{errors.price}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="url"
                                    className="form-control"
                                    id="product_url"
                                    placeholder="Product URL"
                                    value={e => setData('product_url', e.target.value)}
                                />
                                <label htmlFor="product_url">Product URL</label>
                                {errors.product_url && <div className="text-danger">{errors.product_url}</div>}
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="publish"
                                    checked={data.publish}
                                    value={e => setData('publish', e.target.checked)}
                                    onChange={checkurl()}
                                />
                                <label className="form-check-label" htmlFor="publish">
                                    Publish
                                </label>
                                {errors.publish && <div className="text-danger">{errors.publish}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={processing}>Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
