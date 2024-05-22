import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title='Verify Email'/>
            <div className="d-flex justify-content-center align-items-center static-div-center">
                <div className="border col-sm-7">
                    <div className='branding d-flex justify-content-center align-items-center mt-2 mb-3'>
                        <Link href={route('home')} className='nav-link d-flex align-items-center justify-content-center'>
                            <img src="/img/wg-logo.png" alt="Logo" className="login-brand"/>
                        </Link>
                    </div>
                    <div className="m-4 text-sm text-gray-600 dark:text-gray-400">
                        Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                        link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                    </div>
                    {status === 'verification-link-sent' && (
                        <div className="ms-4 mb-3 text-warning font-medium text-sm text-green-600 dark:text-green-400">
                            A new verification link has been sent to the email address you provided during registration.
                        </div>
                    )}
                    <form onSubmit={submit} className='mb-4 ms-4'>
                        <div className=" flex items-center justify-between">
                            <button disabled={processing} className='btn btn-outline-secondary'>Resend Verification Email</button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="underline btn btn-outline-danger ms-3"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
