import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="Login"/>
            <div className="d-flex justify-content-center align-items-center static-div-center">
                <div className="border col-sm-3">
                    <div className='branding d-flex justify-content-center align-items-center mt-2 mb-3'>
                        <Link href={route('home')} className='nav-link d-flex align-items-center justify-content-center'>
                            <img src="img/wg-logo.png" alt="Logo" className="login-brand"/>
                        </Link>
                    </div>
                    <div className="login m-2">
                        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                        {errors._message && <div className="text-danger">{errors._message}</div>}
                        <form onSubmit={submit}>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control"  id="email" placeholder="name@example.com" name='email' value={data.email} autoComplete="username" isFocused={true} onChange={(e) => setData('email', e.target.value)}/>
                                <label htmlFor="floatingInput">Email address</label>
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control"  id="password" placeholder="password"  name="password" value={data.password} autoComplete="current-password"  onChange={(e) => setData('password', e.target.value)}/>
                                <label htmlFor="floatingInput">Password</label>
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="remember" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)}/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Remember me
                                </label>
                            </div>
                            <div className="flex items-center justify-end mt-2 mb-3">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="nav-link"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <button className="btn btn-outline-primary w-100 mt-2" disabled={processing}>
                                    Log in
                                </button>
                                <div className="mt-2 mb-3">
                                    <span>
                                        Don't have account, <Link href={route('register')} className='not-underline'>Create one</Link>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
