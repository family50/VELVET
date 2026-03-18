import './collections.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
function Collections() {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            // انيميشن ظهور الكروت عند السكرول
            gsap.from(".collection-card", {
                y: 100,
                autoAlpha: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".collections-grid",
                    start: "top 80%",
                }
            });

            // حركة تتبع الماوس خفيفة للصور (Parallax)
            const cards = document.querySelectorAll(".collection-card");
            cards.forEach(card => {
                card.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent; // "Type Assertion" لتحويله إلى MouseEvent
        const img = card.querySelector("img");
        const rect = card.getBoundingClientRect();
                   // الآن يمكنك استخدام clientX و clientY بدون أخطاء
        const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
        const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
                    gsap.to(img, {
                        x: x * 20,
                        y: y * 20,
                        duration: 0.6,
                        ease: "power2.out"
                    });
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="collections-page" ref={sectionRef}>
            {/* 1. Header Section */}
            <header className="collections-header">
                <span className="subtitle">THE CURATED ARCHIVE</span>
                <h1 className="main-title">Collections</h1>
                
            </header>

            {/* 2. Grid System */}
            <section className="collections-grid">
                
                {/* قسم الرجال - كارت عرضي كبير */}
{/* قسم الرجال - كارت عرضي كبير */}
<Link to="/Clothings-pieces" className="collection-card landscape" style={{ textDecoration: 'none' }}>
    <div className="card-image-wrapper">
        <img src="./Men-Collection.png" alt="Men's Collection" className="col-img" />
        <div className="card-overlay"></div>
    </div>
    <div className="card-content">
        <small>EST. 1047</small>
        <h2>THE SOVEREIGN <br /> <span>TAILORING</span></h2>
        <p>British tradition tailored for the modern gentleman.</p>
        <span className="explore-link">
            Explore Monsieur <i className="fa-solid fa-arrow-right-long"></i>
        </span>
    </div>
</Link>

{/* قسم النساء - كارت طولي */}
<Link to="/Clothings-pieces" className="collection-card portrait" style={{ textDecoration: 'none' }}>
    <div className="card-image-wrapper">
        <img src="./Women-Collection.png" alt="Women's Collection" className="col-img" />
        <div className="card-overlay"></div>
    </div>
    <div className="card-content">
        <h2>THE DUCHESS <br /> <span>SILHOUETTE</span></h2>
        <span className="explore-link">Explore Madame</span>
    </div>
</Link>

{/* قسم الإصدارات المحدودة */}
<Link to="/Clothings-pieces" className="collection-card portrait small" style={{ textDecoration: 'none' }}>
    <div className="card-image-wrapper">
        <img src="./Limited-Edition-Collection.png" alt="Limited Edition Collection" className="col-img" />
        <div className="card-overlay"></div>
    </div>
    <div className="card-content">
        <h2>LIMITED <br /> <span>EDITIONS</span></h2>
        <span className="explore-link">Enter Archive</span>
    </div>
</Link>

            </section>
            
        </div>
    );
}

export default Collections;