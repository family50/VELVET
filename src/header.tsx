import { createPortal } from 'react-dom'; 
import { Crown } from 'lucide-react';
import './header.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

function Header() {
    const location = useLocation();
        const headerRef = useRef(null);
    const mobileNavRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // 1. التحقق إذا كنا في صفحة Collections أو Cart لتطبيق الثيم الخاص بهما
  // التعديل: إضافة '/' (Home) للقائمة ليكون لها التنسيق المميز افتراضياً
const isSpecialPage = 
    (location.pathname === '/' && !isScrolled) || 
    location.pathname === '/collections' || 
    location.pathname === '/cart';
    

    
    // 2. حالة لجلب عدد المنتجات في السلة
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // تحديث عدد السلة عند التحميل
        const updateCartCount = () => {
            const savedCart = JSON.parse(localStorage.getItem('regalia_cart') || '[]');
            setCartCount(savedCart.length);
        };

        updateCartCount();
        // الاستماع لتغييرات الـ storage في حال تم المسح من صفحة أخرى
        window.addEventListener('storage', updateCartCount);
        return () => window.removeEventListener('storage', updateCartCount);
    }, [location]); // التحديث عند تغيير المسار أيضاً

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  useLayoutEffect(() => {
    // 1. تحقق إذا كان الأنميشن تم تنفيذه مسبقاً في هذه الجلسة
    const hasHeaderAnimated = sessionStorage.getItem('header_animated');

    // إذا تم تنفيذه، لا تشغل GSAP واخرج فوراً
    if (hasHeaderAnimated) {
        // نضمن أن العناصر ظاهرة مباشرة بدون أنميشن
        gsap.set([headerRef.current, mobileNavRef.current, ".logo-wrapper", ".nav-item", ".mobile-nav-item i", ".mobile-nav-item span"], {
            opacity: 1,
            y: 0,
            scale: 1,
            letterSpacing: "0.15em"
        });
        return;
    }

    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 1.5 },
            onComplete: () => {
                // 2. عند انتهاء الأنميشن لأول مرة، سجل ذلك في الـ sessionStorage
                sessionStorage.setItem('header_animated', 'true');
            }
        });

        // أنميشن الـ Mobile Navigation
        if (mobileNavRef.current) {
            tl.fromTo(mobileNavRef.current,
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
                0.3
            );

            tl.fromTo(".mobile-nav-item i",
                { y: -20, opacity: 0, scale: 0.5 },
                { y: 0, opacity: 1, scale: 1, stagger: { amount: 0.4, from: "center" }, ease: "power4.out" },
                "-=0.8"
            );

            tl.fromTo(".mobile-nav-item span",
                { y: 20, opacity: 0, letterSpacing: "0.5em" },
                { y: 0, opacity: 1, letterSpacing: "0.15em", stagger: { amount: 0.4, from: "center" }, ease: "expo.out" },
                "<"
            );
        }

        // أنميشن الـ Header الرئيسي
        tl.fromTo(headerRef.current, 
            { y: -20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1.2 },
            0.6
        );

        tl.fromTo(".logo-wrapper, .nav-item", 
            { y: 15, opacity: 0, scale: 0.95 }, 
            { y: 0, opacity: 1, scale: 1, stagger: 0.1 }, 
            "<"
        );
        
    }, headerRef);

    return () => ctx.revert();
}, []); // مصفوفة فارغة ليعمل عند أول Load فقط

    const mobileNavContent = (
        <nav ref={mobileNavRef}
        className={`mobile-bottom-nav ${isSpecialPage ? 'collections-theme' : ''}`}
        >
            <NavLink to="/" className="mobile-nav-item">
                <i className="fa-solid fa-house nav-icon-effect"></i>
                <span>Home</span>
            </NavLink>
            
           <NavLink 
    to="/That's us" 
    className="nav-item"
    onClick={(e) => {
        // لو المستخدم أصلاً في صفحة That's us وداس تاني، اعمل ريفرش
        if (location.pathname === "/That's us") {
            e.preventDefault();
            window.location.reload();
        }
    }}
>
    That's us
</NavLink>
            
            <NavLink to="/collections" className="mobile-nav-item">
                <i className="fa-solid fa-store nav-icon-effect"></i>
                <span>Collections</span>
            </NavLink>

            <NavLink to="/cart" className="mobile-nav-item">
                <i className="fa-solid fa-cart-shopping nav-icon-effect"></i>
                <span>Cart</span>
            </NavLink>
        </nav>
    );

    return (
        <header ref={headerRef} 
        className={`header-container ${isScrolled ? 'scrolled' : ''} ${isSpecialPage ? 'collections-theme' : ''}`}>
            <div className="header-content">
                <nav className="desktop-nav nav-left">
                    <NavLink to="/" className="nav-item">Home</NavLink>
                    <NavLink to="/That's us" className="nav-item">That's us</NavLink>
                </nav>

                <div className="logo-wrapper">
                    <div className="crown-icon">
                        <Crown className="main-crown" /> 
                    </div>
                    <h1 className="logo-text">VELVET</h1>
                </div>

                <nav className="desktop-nav nav-right">
                    <NavLink to="/collections" className="nav-item">Collections</NavLink>
                    <NavLink to="/cart" className="nav-item">Cart ({cartCount})</NavLink>
                </nav>
            </div>

            {typeof document !== 'undefined' && createPortal(mobileNavContent, document.body)}
        </header>
    );
}

export default Header;