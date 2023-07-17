"use client"
import { AuthContext } from '@/app/context/authcontext';
import { useEffect, useContext } from 'react';

const withAuth = (WrappedComponent) => {
    return ({ router, ...props }) => {
        // Check if user is authenticated, otherwise redirect to login
        const { isAuthenticated, login, logout } = useContext(AuthContext);
        useEffect(() => {
            if (!isAuthenticated && router) {
                router.push('/components/login');
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return <p style={{ textAlign: "center" }}>Not authorized</p>; // Or render a loading state if desired
        }

        return <WrappedComponent {...props} router={router} />;
    };
};

export default withAuth;
