import { Navigate, useLocation } from 'react-router-dom';
import { useStoreState } from '@/state/hooks';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default ({ children }: Props) => {
    const location = useLocation();
    const isAuthenticated = useStoreState((state) => !!state.user.data?.uuid);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};
