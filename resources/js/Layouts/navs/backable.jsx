import { Link, Head } from "@inertiajs/react";
import { useState } from 'react';

export default function backablenav({ navdata }) {
    return(
        <>
            <div className="sidebar shadow-sm w-100 p-4 bg-light">
                <div className="role">
                    <Link href={ route(navdata.back)} className="text-secondary"><i className="fa-solid fa-chevron-left"></i> Go Back</Link>
                </div>
            </div>
        </>
    );
}
