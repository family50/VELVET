import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap'; // تأكد من استيراد GSAP هنا
import './cart.css';

interface CartItem {
  id: number;
  uniqueId: string;
  name: string;
  image: string;
  quantity: number;
  size: string;
  basePrice: number;
  totalPrice: number;
  color: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('regalia_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // المرجع الخاص بالعناصر لتطبيق الأنميشن
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // تنظيف مصفوفة الـ Refs عند تغيير العناصر
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, cartItems.length);
  }, [cartItems]);

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const removeItem = (uniqueId: string, index: number) => {
    const element = itemsRef.current[index];

    if (element) {
      // تنفيذ الأنميشن أولاً
      gsap.to(element, {
        x: -50,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => {
          // الحذف من الـ State بعد انتهاء الأنميشن
          const updatedCart = cartItems.filter(item => item.uniqueId !== uniqueId);
          setCartItems(updatedCart);
          localStorage.setItem('regalia_cart', JSON.stringify(updatedCart));
        }
      });
    } else {
      // في حال فشل الوصول للـ Ref (احتياطي)
      const updatedCart = cartItems.filter(item => item.uniqueId !== uniqueId);
      setCartItems(updatedCart);
      localStorage.setItem('regalia_cart', JSON.stringify(updatedCart));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state15">
        <h2 className="empty-title15">YOUR ARCHIVE IS EMPTY</h2>
        <p className="empty-subtitle15">Discover our latest masterpieces and start your collection.</p>
        <Link to="/collections" className="continue-shopping-btn15">EXPLORE COLLECTIONS</Link>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <header className="cart-header">
        <h1 className="cart-title">SELECTED PIECES</h1>
        <p className="cart-count">({cartItems.length} ITEMS)</p>
      </header>

      <div className="cart-content-grid">
        <div className="cart-items-list">
          {cartItems.map((item, index) => {
            const itemStyle = {
              '--item-accent': item.color,
            } as React.CSSProperties;

            return (
              <div 
                key={item.uniqueId} 
                className="cart-item-card" 
                style={itemStyle} 
                // --- السطر الأهم: ربط العنصر بالـ Ref ---
                ref={(el) => { itemsRef.current[index] = el; }}
              >
                <div className="item-image-box">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.uniqueId, index)} 
                      className="remove-btn"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="item-spec">SIZE: <span>{item.size}</span></p>
                  <p className="item-spec">QUANTITY: <span>{item.quantity}</span></p>
                  
                  <div className="item-footer">
                    <span className="item-price" style={{ color: 'var(--item-accent)' }}>
                      ${item.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="cart-summary-side">
          <div className="summary-card">
            <h2 className="summary-title">SUMMARY</h2>
            <div className="summary-row">
              <span>SUBTOTAL</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>SHIPPING</span>
              <span className="free-shipping">COMPLIMENTARY</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>TOTAL</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <Link to="/payment" >
              <button className="checkout-cta-btn">PROCEED TO ACQUISITION</button>
            </Link>
           
            <p className="summary-note">Taxes and duties calculated at next step.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;