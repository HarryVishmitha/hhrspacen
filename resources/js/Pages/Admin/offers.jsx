import { Link, Head, useForm } from '@inertiajs/react';
import Adminnav from "../../Layouts/navs/adminnav";
import AdminSidebar from '../../Layouts/navs/AdminSidebar';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

export default function Offers({ auth, offers, offersExist }) {
    const cardStyleqw = {
        width: '50%',
        height: 'auto',
        border: 'solid #ffffff, 12px',
        borderRadius: '10px', // Ensures the image covers the area without distortion
        marginBottom: '2rem',
    };

    const currentDate = new Date();
    const [selectedOffer, setselectedOffer] = useState(null);
    const [editedOffer, seteditedOffer] = useState({
        id: null,
        title: '',
        valid_from: '',
        valid_till: '',
        description: '',
        price: '',
        img: null,
    });

    const { data, setData, post, reset, errors } = useForm({
        title: '',
        valid_from: '',
        valid_till: '',
        description: '',
        price: '',
        img: null,
    });

    const [message, setMessage] = useState(null);

    const handleFileChange = (e) => {
        setData('img', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('valid_from', data.valid_from);
        formData.append('valid_till', data.valid_till);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('img', data.img);

        post(route('adminAddoffer'), {
            data: formData,
            onSuccess: () => {
                reset();
                document.getElementById('closeBtn').click();
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    const handleOfferInputChange = (e) => {
        const { name, value } = e.target;
        seteditedOffer((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditOffer = (offer) => {
        setselectedOffer(offer);
        seteditedOffer({
            id: offer.id, // Include the offer ID for editing
            title: offer.title,
            valid_from: offer.from_date,
            valid_till: offer.end_date,
            description: offer.description,
            price: offer.price,
            img: offer.img, // Use offer.img or handle it according to your logic
        });
    };

    const handleCloseModal = () => {
        setselectedOffer(null);
        seteditedOffer({
            id: null,
            title: '',
            valid_from: '',
            valid_till: '',
            description: '',
            price: '',
            img: null,
        });
        setMessage(null);
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();

        const formData12 = new FormData();
        formData12.append('etitle', editedOffer.title);
        formData12.append('evalid_from', editedOffer.valid_from);
        formData12.append('evalid_till', editedOffer.valid_till);
        formData12.append('edescription', editedOffer.description);
        formData12.append('eprice', editedOffer.price);
        if (editedOffer.img) {
            formData12.append('img', editedOffer.img); // Add image file to FormData
        }
        console.log(formData12);

        post(`/admin/offers/edit/${selectedOffer.id}`, {
            data: formData12,
            onSuccess: () => {
                reset();
                document.getElementById('closeBtn').click();
            },
            onError: (error) => {
                console.error('Error:', error.response);
                if (error.response && error.response.data) {
                    setMessage({ type: 'error', content: error.response.data.message || 'An error occurred' });
                }
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    const handleDeleteOffer = () => {
        if (selectedOffer) {
            axios.post(`/admin/offers/delete/${selectedOffer.id}`)
                .then(response => {
                    setMessage({ type: 'success', content: 'successfully deleted!' });
                    setTimeout(() => {
                        Inertia.visit(route('adminoffers'));
                    }, 2000);
                })
                .catch(error => {
                    setMessage({ type: 'error', content: error.response.data.error });
                });
        }
    };


    return (
        <>
            <Head title='Offers'/>
            <Adminnav user={auth.user} />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-sm-3 d-flex justify-content-center p-3">
                        <AdminSidebar user={auth.user}/>
                    </div>
                    <div className="col-sm-9 p-3 ps-5 col-sm-9 ps-5 p-4 mt-3 bg-light border-radius container shadow-sm">
                        <button type="button" className="btn btn-outline-primary mb-3" data-bs-toggle="modal" data-bs-target="#addnewOffer">
                            Add New Offer
                        </button>
                        <hr />
                        {/* Add New Offer Modal */}
                        <div className="modal fade" id="addnewOffer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Offer</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='closeBtn'></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="alert alert-danger">එකපාරින්ම offer එක add කරන්න. Edit කරන්න බැහැ.</div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="title"
                                                    placeholder="Vesak Offer"
                                                    name='title'
                                                    value={data.title}
                                                    onChange={(e) => setData('title', e.target.value)}
                                                />
                                                <label htmlFor="title">Offer Title (Ex: Vesak Offer)</label>
                                                {errors.title && <div className="text-danger">{errors.title}</div>}
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="formFile" className="form-label">Image of Offer 1080px X 1080px</label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    id="img"
                                                    name='img'
                                                    onChange={handleFileChange}
                                                />
                                                {errors.img && <div className="text-danger">{errors.img}</div>}
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="valid_from"
                                                    name="valid_from"
                                                    value={data.valid_from}
                                                    onChange={(e) => setData('valid_from', e.target.value)}
                                                />
                                                <label htmlFor="valid_from">Valid From</label>
                                                {errors.valid_from && <div className="text-danger">{errors.valid_from}</div>}
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="valid_till"
                                                    name="valid_till"
                                                    value={data.valid_till}
                                                    onChange={(e) => setData('valid_till', e.target.value)}
                                                />
                                                <label htmlFor="valid_till">Valid Till</label>
                                                {errors.valid_till && <div className="text-danger">{errors.valid_till}</div>}
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="price"
                                                    name="price"
                                                    placeholder='120'
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                />
                                                <label htmlFor="price">Discount</label>
                                                {errors.price && <div className="text-danger">{errors.price}</div>}
                                            </div>

                                            <div className="form-floating mb-3">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Offer Description"
                                                    id="description"
                                                    name="description"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    style={{ height: '150px', width: '100%' }}
                                                ></textarea>
                                                <label htmlFor="description">Offer Description</label>
                                                {errors.description && <div className="text-danger">{errors.description}</div>}
                                            </div>

                                            <button type="submit" className="btn btn-outline-primary">Add Offer</button>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Offers List */}
                        {offersExist ? (
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Offer Title</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {offers.map((offer) => (
                                        <tr key={offer.id}>
                                            <td>{offer.title}</td>
                                            <td>{offer.from_date}</td>
                                            <td>{offer.end_date}</td>
                                            <td>
                                                {currentDate < new Date(offer.from_date) ? (
                                                    <div className="text-primary">Not Published yet.</div>
                                                ) : (
                                                    new Date(offer.end_date) < currentDate ? (
                                                        <div className="text-danger">Expired</div>
                                                    ) : (
                                                        <div className="text-success">Active</div>
                                                    )
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#offerEdit"
                                                    onClick={() => handleEditOffer(offer)}
                                                >
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
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
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Offer</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedOffer && (
                                <div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="etitle"
                                            placeholder="Offer Title"
                                            name='etitle'
                                            value={editedOffer.title}
                                            onChange={handleOfferInputChange}
                                        />
                                        <label htmlFor="etitle">Offer Title</label>
                                        {errors.title && <div className="text-danger">{errors.title}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="eformFile" className="form-label">Image of Offer</label>
                                        <div className="shadow" style={cardStyleqw}>
                                            <img src={editedOffer.img} className="card-img-top align-items-center" alt="offer image"/>
                                        </div>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="eimg"
                                            name='eimg'
                                            onChange={(e) => seteditedOffer(prev => ({ ...prev, img: e.target.files[0] }))}
                                        />
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="evalid_from"
                                            name="evalid_from"
                                            value={editedOffer.valid_from}
                                            onChange={handleOfferInputChange}
                                        />
                                        <label htmlFor="evalid_from">Valid From</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="evalid_till"
                                            name="evalid_till"
                                            value={editedOffer.valid_till}
                                            onChange={handleOfferInputChange}
                                        />
                                        <label htmlFor="evalid_till">Valid Till</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="eprice"
                                            name="eprice"
                                            placeholder='Price'
                                            value={editedOffer.price}
                                            onChange={handleOfferInputChange}
                                        />
                                        <label htmlFor="eprice">Discount</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <textarea
                                            className="form-control"
                                            placeholder="Offer Description"
                                            id="edescription"
                                            name="edescription"
                                            value={editedOffer.description}
                                            onChange={handleOfferInputChange}
                                            style={{ height: '150px', width: '100%' }}
                                        ></textarea>
                                        <label htmlFor="edescription">Offer Description</label>
                                    </div>
                                </div>
                            )}
                            {message && (
                                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                                    {message.content}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleDeleteOffer}>Delete Offer</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSaveChanges} disabled>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
