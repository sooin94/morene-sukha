import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
    return (
        <div className="p-8"> 
            <h1 className="text-xl font-bold text-center mb-6">회원가입</h1>
            <SignupForm />
            <p>이미 계정이 있으신가요? <a href="/login">로그인</a></p>
        </div>
    );
};

export default SignupPage;