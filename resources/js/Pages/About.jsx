import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../Layouts/navs/NavLayout1";
import Footer from "../Layouts/Footer";
import React, { useState, useEffect, useLayoutEffect } from "react";

export default function About({ auth}) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Home" />
            <NavLayout1/>
            
            <Footer />
        </>
    );
}
