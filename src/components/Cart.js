import './Cart.css'; // Assuming you have some styles in Cart.css
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';


const Cart = ({cart, handleIncrease, handleDecrease, setCart }) => {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity, 0
  );

  const clearCart = async () => {
    try {
      const res = await axiosInstance.delete('/api/cart');
      console.log(res.data.message);
      setCart([]); //프론트 상태도 초기화
      navigate('./menu');
    } catch (err){
      console.error('장바구니 비우기 실패 : ', err.response?.data?.message || err.message);
    }
  }
  const handleRemove = async(productId) => {
    try{
      const res = await axiosInstance.delete(`/api/cart/${productId}`);
      setCart(res.data.cart.items);
    } catch(err){
      console.error('삭제 실패: ', err.response?.data?.message || err.message);
    }
  }
  
  const handleQuantity = async (productId, newQuantity) => {
    try {
      if(newQuantity <= 0 ) {
        handleRemove(productId);
      }
      const res = await axiosInstance.put(`/api/cart/${productId}`, {
        quantity: newQuantity
      });
      setCart(res.data.items);
    } catch(err) {
      console.error('수량 변경 실패:', err.response?.data?.message || err.message);
    }
  }
  
  return (
      <div className="cart-wrapper">
          <h2>🛍 장바구니</h2>
          {cart.length === 0 ? (
              <p>장바구니가 비어있어요</p>
          ) : (
              <>
                  {cart.map((item) => (
                      <div key={item._id} className="cart-item">
            <img src={item.productId.imageUrl} alt={item.productId.name} className="cart-thumb" />
            <div className="cart-info">
              <div className="cart-name">{item.productId.name}</div>
              <div className="cart-controls">
                <button onClick={() => handleQuantity(item.productId._id, item.quantity-1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantity(item.productId._id, item.quantity+1)}>+</button>
              </div>
              <div className="cart-price">
                {(item.productId.price * item.quantity).toLocaleString()}원
              <button onClick={() => handleRemove(item.productId._id)}>❌ 삭제</button>
              </div>
            </div>
          </div>
        ))}
        <div className="cart-total">총합: {total.toLocaleString()}원</div>
        <button className="cart-order-btn">주문하기</button>
        <button onClick={clearCart} className="bg-red-500 text-white py-1 px-3 rounded mt-4">장바구니 비우기</button>
      </>
    )}
  </div>
  );
}

export default Cart;