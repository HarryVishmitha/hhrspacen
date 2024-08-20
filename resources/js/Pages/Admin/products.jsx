import { Link, Head } from '@inertiajs/react';
import Adminnav from "../../Layouts/navs/adminnav";
import AdminSidebar from '../../Layouts/navs/AdminSidebar';
import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

export default function products({ auth, nav, products}) {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [message, setMessage] = useState(null);

    const handleQuickEdit = (product) => {
        setSelectedProduct(product);
        setNewStatus(product.published);
    };

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };
    const handleCloseModal = () => {
        setSelectedProduct(null);
        setNewStatus('');
        setMessage(null);
    };

    const handleSaveChanges = async () => {
        if (selectedProduct) {
            try {
                const response = await axios.post('/admin/product/quick-action', {
                    id: selectedProduct.id,
                    published: newStatus,
                });

                setMessage({ type: 'success', content: "Successfull!" });
                setTimeout(() => {
                    Inertia.visit(route('adminproducts'));
                }, 1500);
            } catch (error) {
                setMessage({ type: 'error', content: error.response.data.error });
            }
        }
    };

    return(
        <>
            <Head title='Products'/>
            <Adminnav user={auth.user} />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-sm-3 d-flex justify-content-center p-3">
                        <AdminSidebar user={auth.user}/>
                    </div>
                    <div className="col-sm-9 ps-5 p-4 mt-3 bg-light border-radius container shadow-sm">
                        <Link href={route('adminaddProduct')}>
                            <div className="btn btn-outline-primary">Add New Product</div>
                        </Link>
                        <hr />
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Quick Action</th>
                                    <th scope='col'>Edit</th>
                                </tr>
                            </thead>
                            {products.length > 0 ? (
                                <tbody>
                                    {products.map((product)=>(
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.published ? (
                                                <span className='text-success'>Published</span>
                                            ) : (
                                                <span className="text-warning">Not Published</span>
                                            )}</td>
                                            <td>
                                                <button type='button' className="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#quickEdit" onClick={() => handleQuickEdit(product)}>
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-primary">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <p>No products available</p>
                            )}

                        </table>
                    </div>
                </div>
                {/* Quick Action  */}
                <div className="modal fade" id="quickEdit" aria-labelledby="quick Edit of products" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Quick Action</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedProduct && (
                                <div>
                                    <p><strong>Name:</strong> {selectedProduct.name}</p>
                                    <div className="mb-3 form-floating">
                                        <select className="form-select" id="status" aria-label="Status of product" value={newStatus} onChange={handleStatusChange}>
                                            <option value='1'>Published</option>
                                            <option value="0">Not-Published</option>
                                        </select>
                                        <label htmlFor="status">Works with selects</label>
                                    </div>
                                </div>
                            )}
                            {message && (
                                <div className={`alert alert-${message.type} mt-3`} role="alert">
                                    {message.content}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
