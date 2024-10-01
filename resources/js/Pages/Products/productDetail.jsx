import { Link, Head, useForm } from '@inertiajs/react';
import NavLayout1 from "../../Layouts/navs/NavLayout1";
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

export default function productDetails({product}) {
    console.log(product);
    return(
        <>
            <Head title={product.name} description={product.simple_description}/>
            <NavLayout1 />
            <div className="m-4 p-4 border rounded">
                <div title={product.name + ' Description'}>
                    <div class="product-page row">

                        <div className="col-sm-6">
                            <div className="productImages">
                                {
                                    product.map(Image)
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}