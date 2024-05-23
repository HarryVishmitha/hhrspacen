import { Link, Head } from "@inertiajs/react";
import { useState } from 'react';

export default function adminnav({ user }) {
    return(
        // <>
            <div className="container-fluid d-grid gap-3 align-items-center cloumn1 bg-light d-flex justify-content-between">
                <Link href={ route('adminDashboard') } className="navbar-brand ms-3 p-2">
                    <img src="/img/wg-logo.png" alt="Logo" className="d-inline-block align-text-top logo"/>
                </Link>
                <div className="h3 d-none d-lg-block be-vietnam-pro-semibold">Welcome Back {user.name} </div>
                <button type='button' className="dropdown me-3 btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-user"></i>
                </button>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" href={route('profile.edit')}>Profile</Link></li>
                    <li><Link className="dropdown-item" href={route('logout')} method="post" as="button">Log out</Link></li>                </ul>
            </div>
        // </>
    );
}
