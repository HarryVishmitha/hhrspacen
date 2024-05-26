import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Adminnav from "../../Layouts/navs/adminnav";
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <>
            <Adminnav user={auth.user} />
            <Head title="Update Profile" />
            <div className="py-12 container mt-3 bg-light">
                <div className="h2 be-vietnam-pro-semibold adti pt-2 pb-2">
                    Edit Profile Details
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>
                    { auth.user.role != 'admin' &&
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 sm:rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    }
                </div>
            </div>
        </>

    );
}
