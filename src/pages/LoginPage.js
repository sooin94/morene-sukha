import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div className="p-8">
            <h1 className="text-xl font-bold text-center mb-6">Login</h1>
            <LoginForm />
        </div>
    );
};

export default LoginPage;

