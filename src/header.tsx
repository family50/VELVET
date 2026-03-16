import { createPortal } from 'react-dom'; 
import { Crown } from 'lucide-react';
import './header.css';
import { NavLink } from 'react-router-dom'; // استيراد NavLink بدلاً من Link
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
function Header() {
    
    const headerRef = useRef(null);
    const mobileNavRef = useRef(null);
useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 1.5 },
        });

        // 1. أنميشن بار الموبايل (يبدأ أولاً الآن)
        if (mobileNavRef.current) {
            tl.fromTo(mobileNavRef.current,
                { 
                    y: 100,      // مخفي تحت تماماً
                    opacity: 0 
                },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 1.2, 
                    ease: "expo.out" 
                },
                0.3 // نقطة البداية الزمنية المطلقة (سيبدأ قبل الهيدر بـ 0.2ث)
            );

            // 2. أنميشن الأيقونات والنصوص (متزامنين مع بعضهم)
            tl.fromTo(".mobile-nav-item i",
                { y: -20, opacity: 0, scale: 0.5 },
                { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1, 
                    stagger: { amount: 0.4, from: "center" },
                    ease: "power4.out" 
                },
                "-=0.8" // تداخل مع صعود البار
            );

            tl.fromTo(".mobile-nav-item span",
                { y: 20, opacity: 0, letterSpacing: "0.5em" },
                { 
                    y: 0, 
                    opacity: 1, 
                    letterSpacing: "0.15em",
                    stagger: { amount: 0.4, from: "center" },
                    ease: "expo.out"
                },
                "<" // يبدأ مع الأيقونات بالظبط
            );
        }

        // 3. أنميشن الهيدر العلوي (يتأخر قليلاً عن البار السفلي)
        tl.fromTo(headerRef.current, 
            { y: -20, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1.2 },
            0.6 // يبدأ عند 0.5 ثانية (أي بعد البار السفلي بـ 0.2 ثانية)
        );

        // 4. عناصر الديسكتوب واللوجو (تظهر مع استقرار الهيدر)
        tl.fromTo(".logo-wrapper, .nav-item", 
            { y: 15, opacity: 0, scale: 0.95 }, 
            { y: 0, opacity: 1, scale: 1, stagger: 0.1 }, 
            "<"
        );

    }, document.body);

    return () => ctx.revert();
}, []);
    // محتوى بار الموبايل
    const mobileNavContent  = (
        <nav ref={mobileNavRef} className="mobile-bottom-nav">
            <NavLink to="/" className="mobile-nav-item">
                <i className="fa-solid fa-house nav-icon-effect"></i>
                <span>Home</span>
            </NavLink>
            
            <NavLink to="/That's us" className="mobile-nav-item">
                <i className="fa-solid fa-feather-pointed nav-icon-effect"></i>
                <span>That's us</span>
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
        <header  ref={headerRef} className="header-container">
            <div className="header-content">
                {/* روابط الديسكتوب يسار */}
                <nav className="desktop-nav nav-left">
                    <NavLink to="/" className="nav-item">Home</NavLink>
                    <NavLink to="/That's us" className="nav-item">That's us</NavLink>
                </nav>

                {/* اللوجو */}
                <div className="logo-wrapper">
                    <div className="crown-icon">
                        <Crown className="main-crown" /> 
                    </div>
                    <h1 className="logo-text">VELVET</h1>
                </div>

                {/* روابط الديسكتوب يمين */}
                <nav className="desktop-nav nav-right">
                    <NavLink to="/collections" className="nav-item">Collections</NavLink>
                    <NavLink to="/cart" className="nav-item">Cart (0)</NavLink>
                </nav>
            </div>

            {typeof document !== 'undefined' && createPortal(mobileNavContent, document.body)}
        </header>
    );
}

export default Header;