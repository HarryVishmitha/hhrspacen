import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../../Layouts/navs/NavLayout1";
import React, { useState, useEffect, useLayoutEffect } from "react";

export default function Home({ auth, offers, offersExist, products }) {

    return (
        <>
            <Head title="Products" />
            <NavLayout1/>
        </>
    );
}
