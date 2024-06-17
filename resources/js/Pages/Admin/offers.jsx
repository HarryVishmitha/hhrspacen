import React from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
import Adminnav from "../../Layouts/navs/adminnav";
import AdminSidebar from '../../Layouts/navs/AdminSidebar';

export default function offers({ auth, offers, offersExist }) {
    const currentDate = new Date();

    const { data, setData, post, reset, errors } = useForm({
        title: '',
        valid_from: '',
        valid_till: '',
        description: '',
        price: '',

    });
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('adminAddoffer'), {
            onSuccess: () => {
                reset();
                document.getElementById('closeBtn').click();
            },
        });
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
                        {/* Add new Offer Modal */}
                        <div className="modal fade" id="addnewOffer" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id='closeBtn'></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control"  id="title" placeholder="Vesak Offer" name='title' value={data.title} onChange={(e) => setData('title', e.target.value)}/>
                                                <label htmlFor="floatingInput">Offer Title (Ex: Vesak Offer)</label>
                                                {errors.title && <div className="text-danger">{errors.title}</div>}
                                            </div>
                                            <div class="mb-3">
                                                <label for="formFile" class="form-label">Default file input example</label>
                                                <input class="form-control" type="file" id="offerImg" name='offerImg'/>
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
                                                <label htmlFor="price">Price</label>
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
                                    {offers.map((offers) => (
                                        <tr key={offers.id}>
                                            <td>{offers.title}</td>
                                            <td>{offers.from_date}</td>
                                            <td>{offers.end_date}</td>
                                            <td>
                                                {currentDate < new Date(offers.from_date) ? (
                                                    <div className="text-primary">Not Published yet.</div>
                                                ) : (
                                                    new Date(offers.end_date) < currentDate ? (
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
                                                    data-bs-target="#userEdit"
                                                    onClick={() => handleEditOffer(offers)}
                                                >
                                                    <i className='fa-solid fa-user-pen'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            ) : (
                               <div className="alert alert-warning">No Offer available to show please add offers</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
