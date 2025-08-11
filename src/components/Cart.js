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
      console.log(res.data.message);
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
          <h2>🛍 cart</h2>
          {cart.length === 0 ? (
              <p>Your cart is empty</p>
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
                {(item.productId.price * item.quantity).toLocaleString()}won
              <button onClick={() => handleRemove(item.productId._id)}>❌ delete</button>
              </div>
            </div>
          </div>
        ))}
        <div className="cart-total">total: {total.toLocaleString()}원</div>
        <button className="cart-order-btn">make an order</button>
        <button onClick={clearCart} className="bg-red-500 text-white py-1 px-3 rounded mt-4">clear cart</button>
      </>
    )}
  </div>
  );
}

export default Cart;