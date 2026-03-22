import './collections.css';
import { useLayoutEffect, useRef } from 'react'; // تغيير useEffect إلى useLayoutEffect
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

function Collections() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
            // 1. الحالة المبدئية (لتجنب الرمش)
            gsap.set(".collection-card", { 
                y: 100, 
                autoAlpha: 0 
            });

            // 2. أنيميشن ظهور الكروت عند السكرول
            gsap.to(".collection-card", {
                y: 0,
                autoAlpha: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: ".collections-grid",
                    start: "top 80%",
                    // toggleActions: "play none none reverse" // اختياري لو عايز الأنميشن يتكرر
                }
            });

            // 3. حركة تتبع الماوس (Parallax)
            const cards = document.querySelectorAll(".collection-card");
            cards.forEach(card => {
                const img = card.querySelector("img");
                
                const handleMouseMove = (e: Event) => {
                    const mouseEvent = e as MouseEvent;
                    const rect = card.getBoundingClientRect();
                    const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
                    const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;

                    if (img) {
                        gsap.to(img, {
                            x: x * 20,
                            y: y * 20,
                            duration: 0.6,
                            ease: "power2.out"
                        });
                    }
                };

                const handleMouseLeave = () => {
                    if (img) {
                        gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: "power2.out" });
                    }
                };

                card.addEventListener("mousemove", handleMouseMove);
                card.addEventListener("mouseleave", handleMouseLeave);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="collections-page" ref={sectionRef} style={{ overflowX: 'hidden' }}>
            <header className="collections-header">
                <span className="subtitle">THE CURATED ARCHIVE</span>
                <h1 className="main-title">Collections</h1>
            </header>

            <section className="collections-grid">
                {/* قسم الرجال */}
                <Link to="/pieces/men" className="collection-card landscape" style={{ textDecoration: 'none' }}>
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

                {/* قسم النساء */}
                <Link to="/pieces/women" className="collection-card portrait" style={{ textDecoration: 'none' }}>
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
                <Link to="/pieces/archive" className="collection-card portrait small" style={{ textDecoration: 'none' }}>
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