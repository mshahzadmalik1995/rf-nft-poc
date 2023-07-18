"use client"
import { AuthContext } from '@/app/context/authcontext';
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent) => {
    return ({ ...props }) => {
        // Check if user is authenticated, otherwise redirect to login
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const router = useRouter();
        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/components/login');
            }
        }, [isAuthenticated]);

        if (!isAuthenticated) {
            return <p style={{ textAlign: "center" }}>Loading the page..</p>; // Or render a loading state if desired
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
