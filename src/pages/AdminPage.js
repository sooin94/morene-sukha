import React from 'react';
import MenuForm from '../components/MenuForm.js';
import MerchForm from '../components/MerchForm.js';
import EnableNotification from '../components/EnableNotification.jsx';

const AdminPage = () => {
    return (
        <div className="p-8"> 
            <h1 className="text-xl font-bold text-center mb-6">메뉴 등록</h1>
            <MenuForm />
            <h1 className="text-xl font-bold text-center mb-6">굿즈 등록</h1>
            <MerchForm />
            <EnableNotification/>
        </div>
    );
};

export default AdminPage;