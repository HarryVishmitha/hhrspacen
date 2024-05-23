import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone_number: user.phone_number || 'N/A',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control"  id="name" placeholder="Jhon Due" value={data.name} autoComplete="name" isfocused={true} onChange={(e) => setData('name', e.target.value)} required/>
                    <label htmlFor="floatingInput">Full Name</label>
                    {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control"  id="email" placeholder="name@example.com" value={data.email} autoComplete="username" isfocused={true} onChange={(e) => setData('email', e.target.value)} required/>
                    <label htmlFor="floatingInput">Email address</label>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control"  id="phone_number" placeholder="+94112000000" value={data.phone_number} autoComplete="phone_number" isfocused={true} onChange={(e) => setData('phone_number', e.target.value)}/>
                    <label htmlFor="floatingInput">Whatsapp Number</label>
                    {data.phone_number == 'N/A' && <div className='text-danger'>Add Your Whatsapp number. If you don't use Whatsapp, Please add your phone number and we will contact using your email address in future. So Stay tuned with your email address if you don't have Whatsapp.</div>}
                    {errors.phone_number && <div className="text-danger">{errors.phone_number}</div>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-danger">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="btn btn-outline-secondary ms-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-success mb-3">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button className='btn btn-outline-primary' disabled={processing}>Save</button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="alert alert-success mt-2">Successfully Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
