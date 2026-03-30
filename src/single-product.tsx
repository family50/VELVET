import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLayoutEffect } from 'react';
import { 
  MEN_COLLECTION, 
  WOMEN_COLLECTION, 
  LIMITED_ARCHIVE, 
  FEATURED_PRODUCTS 
} from './collectionss'; 
import './single-product.css';
import LuxeMedia from './LuxeMedia';
// تعريف الـ Interface الخاص بمنتج السلة لتجنب خطأ الـ any
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

const SingleProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  // --- 1. استدعاء كل الـ Hooks في البداية دائماً (قواعد ريأكت) ---
  const imageRef = useRef<HTMLImageElement>(null);
  const buyBtnRef = useRef<HTMLButtonElement>(null);
  const [quantity, setQuantity] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
const [selectedSize, setSelectedSize] = useState<string>('S');
// داخل الكومبوننت...
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ 
      defaults: { ease: "expo.out", duration: 1.2 } 
    });

    // 1. الحاوية تبدأ من شفافية 0 وتظهر
    tl.fromTo(containerRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1.5 }
    );

    // 2. دخول الصورة بـ Slide ناعم من الشمال و Scale خفيف
    tl.fromTo(".sp-visual-side", 
      { x: -100, opacity: 0, scale: 0.9 }, 
      { x: 0, opacity: 1, scale: 1, duration: 1.8 }, 
      "-=1.2"
    );

    // 3. ظهور النصوص بتتابع (Stagger) من الأسفل
    tl.fromTo([
        ".sp-breadcrumb", 
        ".sp-title", 
        ".sp-price", 
        ".sp-divider", 
        ".sp-description", 
        ".sp-size-section", 
        ".sp-actions",
        ".sp-meta"
      ],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, ease: "power4.out" },
      "-=1.4"
    );
  }, containerRef);

  return () => ctx.revert();
}, []);
  // --- 2. دمج البيانات والبحث عن المنتج ---
  const allProducts = [...MEN_COLLECTION, ...WOMEN_COLLECTION, ...LIMITED_ARCHIVE, ...FEATURED_PRODUCTS];
  const product = allProducts.find(p => p.id === Number(productId));

  // --- 3. الـ Early Return بعد استدعاء الـ Hooks ---
  if (!product) return <div className="error-view">PIECE NOT FOUND</div>;

  // --- 4. العمليات الحسابية والـ Styles (تعتمد على وجود المنتج) ---
  const basePrice = Number(product.price.replace(/[^0-9.-]+/g, ""));
  const totalPrice = basePrice * quantity;

  const dynamicStyle = {
    '--product-theme': product.color,
    borderColor: product.color,
  } as React.CSSProperties;

  const infoSideStyle = {
    borderColor: product.color,
    boxShadow: `0 30px 60px rgba(0, 0, 0, 0.15), 0 10px 40px ${product.color}33`, 
  } as React.CSSProperties;

  const dynamicShadowStyle = {
    background: `radial-gradient(circle, ${product.color} 0%, rgba(0,0,0,0) 70%)`,
  } as React.CSSProperties;

  const combinedStyle = {
    ...dynamicStyle,
    ...infoSideStyle,
  } as React.CSSProperties;

  const imageDynamicStyle = {
    filter: `drop-shadow(0 20px 40px ${product.color}4D) drop-shadow(0 5px 15px rgba(0,0,0,0.1))`,
  } as React.CSSProperties;

  // --- 5. وظائف التحكم (Logic) ---
  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

 const handleAddToCart = () => {
  // بما أن selectedSize أصبح له قيمة افتراضية 'S'، لا حاجة للتحقق هنا
  const cartItem: CartItem = {
    id: product.id,
    uniqueId: `${product.id}-${selectedSize}`,
    name: product.name,
    image: product.image,
    quantity: quantity,
    size: selectedSize,
    basePrice: basePrice,
    totalPrice: totalPrice,
    color: product.color
  };

  const existingCart: CartItem[] = JSON.parse(localStorage.getItem('regalia_cart') || '[]');
  
  const existingItemIndex = existingCart.findIndex(
    (item) => item.id === product.id && item.size === selectedSize
  );

  if (existingItemIndex > -1) {
    existingCart[existingItemIndex].quantity += quantity;
    existingCart[existingItemIndex].totalPrice = existingCart[existingItemIndex].quantity * basePrice;
  } else {
    existingCart.push(cartItem);
  }

  localStorage.setItem('regalia_cart', JSON.stringify(existingCart));

  // أنميشن النجاح (GSAP)
  const btn = buyBtnRef.current;
  if (btn) {
    const tl = gsap.timeline();
    tl.to(btn, { scale: 0.95, duration: 0.1 })
      .to(btn, { backgroundColor: "#27ae60", textContent: "PIECE ACQUIRED ✓", duration: 0.3 })
      .to(btn, { 
        scale: 1, 
        backgroundColor: product.color, 
        textContent: "ACQUIRE PIECE", 
        delay: 1.5,
        duration: 0.3,
        onComplete: () => {
          setQuantity(1);
          // هنا لا نقوم بتصفير المقاس بل نتركه 'S' أو المقاس المختار حالياً
        }
      });
  }
};

  return (
    <div className="sp-wrapper" ref={containerRef}>
      <div className="sp-container">
        
        {/* الجانب الأيسر: عرض المنتج */}
        <div className="sp-visual-side">
          <div className="floating-container">
            <LuxeMedia 
              ref={imageRef}
              src={product.image} 
              alt={product.name} 
              style={imageDynamicStyle}
              className="sp-main-image" 
            />
            <div className="sp-image-shadow" style={dynamicShadowStyle}></div>
          </div>
        </div>

        {/* الجانب الأيمن: البيانات */}
        <div className="sp-info-side" style={combinedStyle}>
          <nav className="sp-breadcrumb">
            <Link to="/" style={{ color: product.color }}>HOME</Link> / <span style={{ color: product.color }}>{product.category}</span>
          </nav>

          <h1 className="sp-title" style={{ color: product.color }}>{product.name}</h1>
          <p className="sp-price" style={{ color: product.color }}>
            ${totalPrice.toLocaleString()}
          </p>
          
          <div className="sp-divider" style={{ backgroundColor: product.color }}></div>

          <div className="sp-description">
            <h3 style={{ color: product.color }}>THE CRAFT</h3>
            <p style={{ color: product.color }}>{product.description}</p>
          </div>

          {/* اختيار المقاسات */}
          <div className="sp-size-section">
            <label style={{ color: product.color }}>SELECT SIZE</label>
            <div className="size-grid">
              {['S', 'M', 'L', 'XL'].map(size => (
                <div 
                  key={size} 
                  className={`size-item ${selectedSize === size ? 'active-size' : ''}`}
                  onClick={() => setSelectedSize(size)}
                  style={{ 
                    '--product-color': product.color, 
                    color: selectedSize === size ? '#fff' : product.color,
                    backgroundColor: selectedSize === size ? product.color : 'transparent',
                    borderColor: product.color,
                  } as React.CSSProperties}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* العداد وزر الشراء */}
          <div className="sp-actions">
            <div className="quantity-selector" style={{ borderColor: product.color }}>
              <button className="q-btn" onClick={handleDecrement} style={{ color: product.color }}>-</button>
              <span className="q-value" style={{ color: product.color }}>{quantity}</span>
              <button className="q-btn" onClick={handleIncrement} style={{ color: product.color }}>+</button>
            </div>
            
            <button 
              ref={buyBtnRef}
              className="buy-now-btn" 
              onClick={handleAddToCart}
              style={{ backgroundColor: product.color }}
            >
              ACQUIRE PIECE
            </button>
          </div>

          <div className="sp-meta">
            <p>HEX CODE: <span style={{ color: product.color, fontWeight: 'bold' }}>{product.color}</span></p>
            <p>MATERIAL: 100% ARCHIVAL FIBERS</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleProduct;