import { usePage } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const DashboardRedirect = () => {
    const { auth } = usePage().props;
    const history = useHistory();

    useEffect(() => {
        if (auth.user) {
            switch (auth.user.role) {
                case 'admin':
                    if (history.location.pathname !== '/admin/dashboard') {
                        history.push('/admin/dashboard');
                    }
                    break;
                case 'user':
                    if (history.location.pathname !== '/user/dashboard') {
                        history.push('/user/dashboard');
                    }
                    break;
                case 'manager':
                    if (history.location.pathname !== '/manager/dashboard') {
                        history.push('/manager/dashboard');
                    }
                    break;
                default:
                    if (history.location.pathname !== '/home') {
                        history.push('/home');
                    }
                    break;
            }
        } else {
            if (history.location.pathname !== '/login') {
                history.push('/login');
            }
        }
    }, [auth.user, history]);

    return null;
};

export default DashboardRedirect;
