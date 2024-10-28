import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const user = useSelector((state: RootState) => state.user);

    if (user.role !== 'admin') {
        return <Navigate to="/courses" />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
