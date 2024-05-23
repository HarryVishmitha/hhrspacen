import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title='Forgot Password'/>
            <div className="d-flex justify-content-center align-items-center static-div-center">
                <div className="border col-sm-3">
                    <div className='branding d-flex justify-content-center align-items-center mt-2 mb-3'>
                        <Link href={route('home')} className='nav-link d-flex align-items-center justify-content-center'>
                            <img src="/img/wg-logo.png" alt="Logo" className="login-brand"/>
                        </Link>
                    </div>
                    <div className="login m-2">
                        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                        </div>
                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        <form onSubmit={submit}>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="name@example.com"
                                    name='email'
                                    value={data.email}
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <label htmlFor="email">Email address</label>
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <button className="ms-4 btn btn-outline-primary" disabled={processing}>
                                    Email Password Reset Link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
