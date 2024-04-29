import { Link, Head } from "@inertiajs/react";
import NavLayout1 from "../Layouts/navs/NavLayout1";

export default function home({ auth }) {
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
            this is boady
            {auth.user ? (
                <Link href="/login">Login</Link>
            ) : (
                <Link href="/dashboard">Dashboard</Link>
            )}
            hello
        </>
    );
}