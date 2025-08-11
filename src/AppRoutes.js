import React, { useState, useEffect } from 'react';
import './App.css';
import MenuList from './components/MenuList';
import Cart from './components/Cart'; // Assuming you have a Cart component
import SignupPage from './pages/SignupPage'; // Assuming you have a SignupPage component
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import axiosInstance from './api/axiosInstance';

function AppRoutes() {
    const location = useLocation();
    const navigate = useNavigate();
    const isMenu = location.pathname === '/';

    const [cart, setCart] = useState([]);
    const [userName, setUserName] = useState([]);

    useEffect(()=> {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if(storedUser?.name) setUserName(storedUser.name);
        const fetchCart = async () => {
            try {
                const res = await axiosInstance.get('/api/cart');
                if(res.data.items){
                    setCart (res.data.items);
                }
            } catch (err){
                console.error('장바구니 불러오기 실패: ', err.respose?.data?.message || err.message);
            }
        };
        fetchCart();
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserName('');
        navigate('/login');
    }

    const handleAddToCart = async (menuItem) => {
        const existingItem = cart.find((item) => item.productId === menuItem._id);
        const quantity = existingItem ? 1 : 1; // 그냥 하나씩 추가
        console.log('menuItem._id : ', menuItem._id)
        try {
            const res = await axiosInstance.post('/api/cart', {
                productId: menuItem._id,
                quantity: quantity,
            });

            setCart(res.data.cart.items);
        } catch (err) {
            console.error('서버에 장바구니 저장 실패', err.response?.data?.message || err.message)
        }
    };

    const handleIncrease = (id) => {
        setCart((prev) =>
        prev.map((item) =>
            item._id === id? { ...item, quantity: item.quantity + 1 } : item
        )
        );
    };
    
    const handleDecrease = (id) => {
        setCart((prev) =>
        prev.map((item) =>
            item._id === id? { ...item, quantity : item.quantity -1 } : item).filter((item) => item.quantity > 0)
        );
    };

    const total = cart.reduce((sum, item) => sum + item.productId?.price * item.quantity, 0);


    return (
        <div className="App">
            <header>
                <div>
                    <h1>morene-sukha 🧘‍♀️</h1>
                    <Link to={isMenu ? '/cart' : '/'}>
                        <button>
                            {isMenu ? '🛍 go to the cart' : '🍹 back to menu'}
                        </button>
                    </Link>
                </div>
                <div className="flex gap-3 items-center">
                    {userName ?(
                        <>
                            <span>{userName}</span>
                            <button onClick={handleLogout} className=""bg-red-500 text-white px-3 py-1 rounded>Logout</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')}>Login</button>
                            <button onClick={() => navigate('/signup')}>Register</button>
                        </>
                    )}
                </div>
            </header>

            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<MenuList onAddToCart={handleAddToCart} />} />
                    <Route path="/cart" element={<Cart cart={cart} handleIncrease={handleIncrease} handleDecrease={handleDecrease} setCart={setCart} />} />
                </Route>
            </Routes>
        </div>
    );
}

export default AppRoutes;
