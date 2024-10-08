import { Link, Head, useForm } from '@inertiajs/react';
import Adminnav from "../../Layouts/navs/adminnav";
import AdminSidebar from '../../Layouts/navs/AdminSidebar';
import axios from 'axios';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function categories({ auth, categories, categoriesExist}) {
    const [selectedCat, setselectedCat] = useState(null);
    const [editedCat, seteditedCat] = useState({
        id: null,
    });
    const handleEditCat = (category) => {
        setselectedCat(category);
        seteditedCat({
            id: category.id, // Include the offer ID for editing
        });
    };

    return(
        <>
            <Head title='Categories'/>
            <Adminnav user={auth.user} />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-sm-3 d-flex justify-content-center p-3">
                        <AdminSidebar user={auth.user}/>
                    </div>
                    <div className="col-sm-9 p-3 ps-5 col-sm-9 ps-5 p-4 mt-3 bg-light border-radius container shadow-sm">
                        <button type="button" className="btn btn-outline-primary mb-3" data-bs-toggle="modal" data-bs-target="#addnewOffer">
                            Add New Category
                        </button>
                        <hr />
                        {categoriesExist ? (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Category Name</th>
                                        <th scope="col">Description</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.id}>
                                            <td>{category.name}</td>
                                            <td>{category.description}</td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#offerEdit"
                                                    onClick={() => handleEditCat(category)}
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            ): (
                            <div className="alert alert-warning">No Offer available to show. Please add offers.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Offer Edit Modal */}
            <div className="modal fade" id="offerEdit" aria-labelledby="Offer Edits" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="editCat">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="catName" placeholder="Name"/>
                                    <label htmlFor="catName">Category Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea className="form-control" placeholder="Description goes here" id="floatingTextarea2" style={{ height: "100px" }}></textarea>
                                    <label htmlFor="floatingTextarea2">Description</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
