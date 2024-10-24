// src/components/PrivateRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const PrivateRoute = () => {
    const { token } = useAuth(); // Access token from AuthContext

    return (
        token ? <Outlet /> : <Navigate to="/" />
    );
};

export default PrivateRoute;
