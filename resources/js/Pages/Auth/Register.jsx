import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <Head title='Register'/>
            <div className="d-flex justify-content-center align-items-center static-div-center">
                <div className="border col-sm-3">
                    <div className='branding d-flex justify-content-center align-items-center mt-2 mb-3'>
                        <Link href={route('home')} className='nav-link d-flex align-items-center justify-content-center'>
                            <img src="img/wg-logo.png" alt="Logo" className="login-brand"/>
                        </Link>
                    </div>
                    <div className="register m-2">
                        {errors._message && <div className="text-danger">{errors._message}</div>}
                        <form onSubmit={submit}>
                            <div className='form-floating mb-3'>
                                <input type='text' className='form-control' id='name' name='name' placeholder='Jhon Due' value={data.name} autoComplete="name" isFocused={true} onChange={(e) => setData('name', e.target.value)} required/>
                                <label htmlFor='name'>Full Name</label>
                                {errors.name && <div className='text-danger'>{errors.name}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control"  id="email" placeholder="name@example.com" name='email' value={data.email} autoComplete="username" isFocused={true} onChange={(e) => setData('email', e.target.value)} required/>
                                <label htmlFor="email">Email address</label>
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control"  id="password" placeholder="password123" name='password' value={data.password} autoComplete="new-password" onChange={(e) => setData('password', e.target.value)} required/>
                                <label htmlFor="password">Password</label>
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control"  id="password_confirmation" placeholder="password123" name='password_confirmation' value={data.password_confirmation} autoComplete="new-password" onChange={(e) => setData('password_confirmation', e.target.value)} required/>
                                <label htmlFor="password_confirmation">Confirm Password</label>
                                {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation}</div>}
                            </div>
                            <button className="btn btn-outline-primary w-100 mt-2" disabled={processing}>
                                Register
                            </button>
                                <div className="mt-2 mb-3">
                                    <span>
                                        Already have an account, <Link href={route('login')} className='not-underline'>Log-in</Link>
                                    </span>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
