import { Link, Head } from "@inertiajs/react";
import { useState } from 'react';

export default function AdminSidebar({ user }) {
    return(
        <>
            <div className="sidebar shadow-sm w-100 p-4 bg-light">
                <div className="role">
                    <div className="username">
                        {user.name}
                    </div>
                    <div className="rolename">
                        Administrator
                    </div>
                </div>
                <hr />
                <div className="navigations">
                    <div className="text-secondary titleofnav">
                        Navigations
                    </div>
                    <div className="navs flex-shrink-0 p-3">
                        <ul className="nav nav-pills mb-auto flex-column">
                            <li className="nav-item">
                                <Link href={ route('adminusers') } className="nav-link link-dark-hoverable">
                                    <i className="fa-solid fa-user-gear"></i> Users
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={route('adminoffers')} className="nav-link link-dark-hoverable">
                                    <i className="fa-solid fa-percent"></i> Offers
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={route('adminproducts')} className="nav-link link-dark-hoverable">
                                    <i className="fa-solid fa-bag-shopping"></i> Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={route('adminsettings')} className="nav-link link-dark-hoverable">
                                    <i className="fa-solid fa-gear"></i> Settings
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
