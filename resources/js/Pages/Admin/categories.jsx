import { Link, Head, useForm } from '@inertiajs/react';
import Adminnav from "../../Layouts/navs/adminnav";
import AdminSidebar from '../../Layouts/navs/AdminSidebar';
import axios from 'axios';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Categories({ auth, categories, categoriesExist }) {
    // State for selected and edited categories
    const [selectedCat, setselectedCat] = useState(null);
    const [editedCat, seteditedCat] = useState({
        id: null,
        name: '',
        description: ''
    });

    // State for success and error messages
    const [addCatMessage, setAddCatMessage] = useState({ success: '', error: '' });
    const [editCatMessage, setEditCatMessage] = useState({ success: '', error: '' });

    // useForm for adding new category
    const { data, setData, post, reset, errors } = useForm({
        name: '',
        description: ''
    });

    // Handle Add Category submission
    const handleAddCat = (e) => {
        e.preventDefault();
        post(route('adminaddCat'), {
            onSuccess: () => {
                reset(); // Reset the form after success
                setAddCatMessage({ success: 'Category added successfully!', error: '' });
                setTimeout(() => setAddCatMessage({ success: '', error: '' }), 3000); // Hide message after 3 seconds
            },
            onError: (errors) => {
                setAddCatMessage({ success: '', error: 'Failed to add category!' });
            },
        });
    };

    // Handle Edit Category button click
    const handleEditCat = (category) => {
        setselectedCat(category);
        seteditedCat({
            id: category.id,
            name: category.name,
            description: category.description,
        });
    };

    // Handle updating a category
    const handleUpdateCat = (e) => {
        e.preventDefault();
        axios.post(`/admin/update-cat/${editedCat.id}`, editedCat)
            .then(response => {
                setEditCatMessage({ success: 'Category updated successfully!', error: '' });
                setTimeout(() => {
                    handleCloseModal(); // Close the modal after showing success message
                    Inertia.reload(); // Reload the page after success
                }, 3000); // Wait for 3 seconds before reloading
            })
            .catch(error => {
                setEditCatMessage({ success: '', error: 'Failed to update category!' });
            });
    };

    // Handle deleting a category
    const handleDeleteCat = () => {
        axios.post(`/admin/delete-categories/${editedCat.id}`)
            .then(response => {
                setEditCatMessage({ success: 'Category deleted successfully!', error: '' });
                setTimeout(() => {
                    handleCloseModal();
                    Inertia.reload();
                }, 3000); // Wait for 3 seconds before reloading
            })
            .catch(error => {
                setEditCatMessage({ success: '', error: 'Failed to delete category!' });
            });
    };

    // Handle closing the modal and resetting states
    const handleCloseModal = () => {
        setselectedCat(null);
        seteditedCat({
            id: null,
            name: '',
            description: ''
        });
        setEditCatMessage({ success: '', error: '' }); // Clear edit messages
    };

    return (
        <>
            <Head title='Categories' />
            <Adminnav user={auth.user} />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-sm-3 d-flex justify-content-center p-3">
                        <AdminSidebar user={auth.user} />
                    </div>
                    <div className="col-sm-9 p-3 ps-5 col-sm-9 ps-5 p-4 mt-3 bg-light border-radius container shadow-sm">
                        <button type="button" className="btn btn-outline-primary mb-3" data-bs-toggle="modal" data-bs-target="#addnewcat">
                            Add New Category
                        </button>

                        {/* Add new cat modal */}
                        <div className="modal fade" id="addnewcat" aria-labelledby="AddNewCategory" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add new Category</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form id="addCat" onSubmit={handleAddCat}>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="catName"
                                                    placeholder="Name"
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                />
                                                <label htmlFor="catName">Category Name</label>
                                                {errors.name && <div className="text-danger">{errors.name}</div>}
                                            </div>
                                            <div className="form-floating mb-3">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Description goes here"
                                                    id="floatingTextarea2"
                                                    style={{ height: "100px" }}
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                />
                                                <label htmlFor="floatingTextarea2">Description</label>
                                                {errors.description && <div className="text-danger">{errors.description}</div>}
                                            </div>
                                            <button type="submit" className="btn btn-primary">Add</button>
                                        </form>

                                        {/* Success/Error Message */}
                                        {addCatMessage.success && <div className="alert alert-success mt-3">{addCatMessage.success}</div>}
                                        {addCatMessage.error && <div className="alert alert-danger mt-3">{addCatMessage.error}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="alert alert-warning">Categories, Unpublished කරන්න බැහැ.</div>
                        <hr />
                        {categoriesExist ? (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Category Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Action</th>
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
                                                    data-bs-target="#editCat"
                                                    onClick={() => handleEditCat(category)}
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="alert alert-warning">No categories available to show. Please add categories.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Category Modal */}
            <div className="modal fade" id="editCat" aria-labelledby="EditCategory" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Category</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="editCat" onSubmit={handleUpdateCat}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="catName"
                                        placeholder="Name"
                                        value={editedCat.name || ''}
                                        onChange={(e) => seteditedCat({ ...editedCat, name: e.target.value })}
                                    />
                                    <label htmlFor="catName">Category Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea
                                        className="form-control"
                                        placeholder="Description goes here"
                                        id="floatingTextarea2"
                                        style={{ height: "100px" }}
                                        value={editedCat.description || ''}
                                        onChange={(e) => seteditedCat({ ...editedCat, description: e.target.value })}
                                    />
                                    <label htmlFor="floatingTextarea2">Description</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>

                            {/* Success/Error Message */}
                            {editCatMessage.success && <div className="alert alert-success mt-3">{editCatMessage.success}</div>}
                            {editCatMessage.error && <div className="alert alert-danger mt-3">{editCatMessage.error}</div>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleDeleteCat}>Delete Category</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
