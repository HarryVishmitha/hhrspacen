import { Link, Head } from "@inertiajs/react";
import { useState } from 'react';

export default function AdminSidebar({ user }) {
    return(
        <>
            <div className="sidebar shadow-sm w-100 bg-light p-4">
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
                    <div className="navs flex-shrink-0 p-3 bg-white">
                        <ul className="nav nav-pills mb-auto">
                            <Link href='#' className="nav-link link-dark-hoverable">
                                <li className="nav-item">
                                    <i className="fa-solid fa-gear"></i> Settings
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
