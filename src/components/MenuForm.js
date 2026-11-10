import React, {useState} from "react";
import axiosInstance from "../api/axiosInstance";

const MenuForm = () => {
    const [formData, setFormData] = useState({
        name:'',
        price:'',
        description:'',
        imageUrl:'',
        category:'',
        isAvailable:true
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name] : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //  이름 공백, 가격 숫자만 입력 가능하게 처리, 
    
        try {
            const res = await axiosInstance.post('/api/menus', {
                name : formData.name,
                price: formData.price,
                description: formData.description,
                imageUrl: formData.imageUrl,
                category: formData.category,
                isAvailable: formData.isAvailable
            });

            if(res.data.success) {
                setMessage('✅ ! 메뉴 등록 성공.');
            } else{
                setMessage(res.data.message || '❌ 메뉴 등록 실패');
            }
        } catch (err) {
            console.error('Error:', err);
            setMessage(err.response?.data?.message || '❌ 메뉴 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="Integer" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="text" name="discription" placeholder="Description" value={formData.discription} onChange={handleChange} required />
            <input type="text" name="imageUrl" placeholder="Image Url" value={formData.imageUrl} onChange={handleChange} required />
            <input type="text" name="category" placeholder="category" value={formData.category} onChange={handleChange} required />
            <button type="submit">Add</button>
            {message && <p className="">{message}</p>}
        </form>
    )
}

export default MenuForm;