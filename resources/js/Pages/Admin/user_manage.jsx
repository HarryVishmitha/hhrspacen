import React, { useState } from 'react';
import Adminnav from "../../Layouts/navs/adminnav";
import AdminSidebar from '../../Layouts/navs/AdminSidebar';
import { Link, Head } from '@inertiajs/react';
import axios from 'axios';

const UserManage = ({ auth, users, pagination }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState('');
    const [message, setMessage] = useState(null);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setNewRole(user.role); // Set the default role in the dropdown
    };

    const handleRoleChange = (e) => {
        setNewRole(e.target.value);
    };

    const handleSaveChanges = () => {
        axios.post(`/updateUserRole/${selectedUser.id}`, { role: newRole })
            .then(response => {
                setMessage({ type: 'success', content: response.data.message });
                // Reload users list or update user role in local state if needed
            })
            .catch(error => {
                setMessage({ type: 'error', content: error.response.data.error });
            });
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setNewRole('');
        setMessage(null);
    };

    return (
        <>
            <Head title='User Management'/>
            <Adminnav user={auth.user} />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-sm-3 d-flex justify-content-center p-3">
                        <AdminSidebar user={auth.user}/>
                    </div>
                    <div className="col-sm-9 ps-5 p-4 mt-3 bg-light border-radius container shadow-sm">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                data-bs-toggle="modal"
                                                data-bs-target="#userEdit"
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <i className='fa-solid fa-user-pen'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination justify-content-center">
                            {pagination.prev_page_url && (
                                <Link href={pagination.prev_page_url} className='btn btn-outline-primary'>Previous</Link>
                            )}
                            {pagination.next_page_url && (
                                <Link href={pagination.next_page_url} className='btn btn-outline-primary'>Next</Link>
                            )}
                        </div>
                    </div>
                </div>
                {/* Modal */}
                <div className="modal fade" id="userEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {selectedUser && (
                                    <div>
                                        <p><strong>Name:</strong> {selectedUser.name}</p>
                                        <p><strong>Email:</strong> {selectedUser.email}</p>
                                        <label htmlFor="role">Select Role:</label>
                                        <select id="role" className="form-select" value={newRole} onChange={handleRoleChange}>
                                            <option value="">Select Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                            {/* Add more roles as needed */}
                                        </select>
                                    </div>
                                )}
                                {message && (
                                    <div className={`alert alert-${message.type} mt-3`} role="alert">
                                        {message.content}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserManage;
