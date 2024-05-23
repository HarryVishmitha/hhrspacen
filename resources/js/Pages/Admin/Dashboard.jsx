import React from 'react';
import { Head } from '@inertiajs/react';
import Adminnav from "../../Layouts/navs/adminnav";
import AdminSidebar from '../../Layouts/navs/AdminSidebar';

export default function Dashboard({ auth }) {

    return(
        <>
            <Head title='Administration'/>
            <Adminnav user={auth.user} />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-sm-3 d-flex justify-content-center p-3">
                        <AdminSidebar user={auth.user}/>
                    </div>
                    <div className="col-sm-9 p-3 ps-5 bg-primary">content</div>
                </div>
            </div>
        </>
    );
}
