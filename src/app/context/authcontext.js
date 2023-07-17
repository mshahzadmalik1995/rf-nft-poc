"use client"
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const flag = localStorage.getItem('isAuthenticated');
        if (flag) {
            setIsAuthenticated(flag);
        }
    }, []);

    const login = () => {
        // Implement your login logic here
        localStorage.setItem('isAuthenticated', true);
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Implement your logout logic here
        localStorage.setItem('isAuthenticated', false);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
