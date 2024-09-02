import { Link, Head, useForm } from '@inertiajs/react';
import Adminnav from "../../Layouts/navs/adminnav";
import AdminSidebar from '../../Layouts/navs/AdminSidebar';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

export default function productDetails({product}) {
    console.log(product);
    return(
        <>
            This is product detail page
        </>
    );
}