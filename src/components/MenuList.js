import { useEffect, useState } from 'react';
import './MenuList.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom';

const MenuList = ({ onAddToCart }) => {
    const navigate = useNavigate();
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/menus')
            .then((res) => res.json())
            .then((data) => setMenus(data))
            .catch((err) => console.error('❌ 메뉴 불러오기 실패:', err));
    }, [])

    const handleAdd = (menu) => {
        onAddToCart(menu);
        navigate('/cart'); // Redirect to cart after adding item
    }
    
    return (
        <div className="menu-grid">
            <h2>🍸 메뉴 리스트</h2>
            {menus.map((menu) => (
                <div key={menu._id} className="menu-card">
                <div className="menu-image-wrapper">
                    <img src={menu.imageUrl} alt={menu.name} className="menu-image" />
                </div>
                <div className="menu-card-content">
                    <span className="menu-name">{menu.name}</span>
                    <span className="menu-price">{menu.price.toLocaleString()}원</span>
                </div>
                <p className="menu-description">{menu.description}</p>
                <button className="menu-button" onClick={() => handleAdd(menu)}>
                    🛒 담기
                </button>
                </div>
            ))}
        </div>
    )
};

export default MenuList;
