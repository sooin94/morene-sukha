import React, {useState} from "react";
import axiosInstance from "../api/axiosInstance";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        phone : '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name] : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage('❌ 비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const res = await axiosInstance.post('/api/auth/register', {
                name : formData.name,
                email : formData.email,
                phone : formData.phone,
                password : formData.password
            });

            if(res.data.success) {
                setMessage('✅ 회원가입 성공! 로그인 해주세요.');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: ''
                });
            } else{
                setMessage(res.data.message || '❌ 회원가입 실패');
            }
        } catch (err) {
            console.error('회원가입 오류:', err);
            setMessage(err.response?.data?.message || '❌ 회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
            <input type="text" name="name" placeholder="이름" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="이메일" value={formData.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="전화번호" value={formData.phone} onChange={handleChange} required />
            <input type="password" name="password" placeholder="비밀번호" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="비밀번호 확인" value={formData.confirmPassword} onChange={handleChange} required />
            <button type="submit">가입하기</button>
            {message && <p className="">{message}</p>}
        </form>
    )
}

export default SignupForm;