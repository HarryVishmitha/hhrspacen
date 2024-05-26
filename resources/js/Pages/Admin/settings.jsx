import React from 'react';
import { Head } from '@inertiajs/react';
import Adminnav from "../../Layouts/navs/adminnav";
import AdminSidebar from '../../Layouts/navs/AdminSidebar';

export default function settings({ auth }) {

    return(
        <>
            <Head title='Settings'/>
            <Adminnav user={auth.user} />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-sm-3 d-flex justify-content-center p-3">
                        <AdminSidebar user={auth.user}/>
                    </div>
                    <div className="col-sm-9 ps-5 p-4 mt-3 bg-light border-radius container shadow-sm">content</div>
                </div>
            </div>
        </>
    );
}
