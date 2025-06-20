import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const LoginForm = () => {
    const [ formData, setFormData ] = useState({ email: '', password: '' });
    const [ message, setMessage ] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axiosInstance.post('/api/auth/login', {
                email : formData.email,
                password: formData.password,    
            });

            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setMessage('로그인 성공 !');
            window.location.href = '/';
        } catch(err){
            setMessage('로그인 실패 : '+ (err.response?.data?.message || '에러 발생'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
            <input type="email" name="email" placeholder="이메일" onChange={handleChange} value={formData.email} required />
            <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} value={formData.password} required />
            <button type="submit" className="bg-black text-white py-2 rounded">로그인</button>
            {message && <p className="text-center text-sm text-red-500">{message}</p>}
        </form>
    );
};

export default LoginForm;