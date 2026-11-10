import './Cart.css'; // Assuming you have some styles in Cart.css
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Cart = ({cart, handleIncrease, handleDecrease, setCart }) => {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity, 0
  );

  const createOrder = async() => {
    try{
      // 결제
      const res = await axiosInstance.post('/api/pay', {
        items: cart,
      });
      console.log(res);
      createPayment(res.data.order);
    }catch(err){
      console.error('장바구니 주문 실패 : ', err.response?.data?.message || err.message);
    }
  }

  const createPayment = async(order) => {
    console.log("orderUid", order.orderUid);
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_IMP_CODE); // 너 가맹점 식별코드

    IMP.request_pay(
      {
        channelKey: process.env.REACT_APP_PORTONE_CHANNEL_KEY,
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: order.orderUid,              // ✅ orderUid
        name: "sooin",
        amount: order.totalAmount,                    // ✅ 서버가 내려준 totalAmount
        buyer_email: "kimsoongni1@gmail.com",
        buyer_name: "김수인",
        m_redirect_url:"/cart"
        // buyer_tel 등도 가능
      },
      async (rsp) => {
        if (rsp.success) {
          // ③ 결제 검증 요청 (서버)
          await axiosInstance.post("/api/pay", {
            imp_uid: rsp.imp_uid,
            orderUid: rsp.orderUid, // == orderUid
          });

          // ④ 성공 처리 (장바구니 비우기/완료 페이지 이동 등)
          alert("결제 완료!");
          // Send Admin Alert 
          
        } else {
          alert(`결제 실패: ${rsp.error_msg}`);
        }
      }
    );
  }


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
        <button onClick={createOrder} className="cart-order-btn">make an order</button>
        <button onClick={clearCart} className="bg-red-500 text-white py-1 px-3 rounded mt-4">clear cart</button>
      </>
    )}
  </div>
  );
}

export default Cart;