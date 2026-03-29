import './home.css'
import { FEATURED_PRODUCTS } from './collectionss';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './fotter'; 
import { Link } from 'react-router-dom';

function Home() {
    const gridRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const philosophyRef = useRef<HTMLDivElement>(null);
    const featuredRef = useRef<HTMLDivElement>(null);
    const lifestyleRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const currentGrid = gridRef.current;
        
        let pauseHandler: () => void;
        let playHandler: () => void;

        // 1. الإخفاء الأولي وتجهيز الحالة البصرية (Pre-animation state)
        const allElements = [
            ".bg-velvet-video", 
            ".velvet-overlay", 
            ".bottom-white-shroud22", 
            ".hero-tagline", 
            ".hero-giant-title span", 
            ".hero-statement",
            philosophyRef.current, 
            ".product-card", 
            ".lifestyle-giant-text", 
            ".lifestyle-image-wrapper", 
            ".lifestyle-info-overlay"
        ];
        
        // ضبط الحالة الابتدائية: مخفي ومنزاح للأسفل قليلاً
        gsap.set(allElements, { autoAlpha: 0, y: 30 });

        // 2. Hero Section Timeline (يظهر فور تحميل الصفحة)
        const heroTl = gsap.timeline({ delay: 0.2 });
        heroTl
            .to([".bg-velvet-video", ".velvet-overlay", ".bottom-white-shroud22"], {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power2.inOut"
            })
            .to(".hero-tagline", { 
                autoAlpha: 1, 
                y: 0, 
                duration: 1.5, 
                ease: "power3.out" 
            }, "-=0.5")
            .to(".hero-giant-title span", { 
                autoAlpha: 1, 
                y: 0, 
                stagger: 0.15, 
                duration: 1, 
                ease: "power3.out" 
            }, "-=0.7")
            .to(".hero-statement", { 
                autoAlpha: 1, 
                y: 0, 
                duration: 1, 
                ease: "power3.out" 
            }, "-=0.8");

        // 3. Philosophy Section - استخدام .to لأننا عملنا set في البداية
        if (philosophyRef.current) {
            gsap.to(philosophyRef.current, {
                scrollTrigger: {
                    trigger: philosophyRef.current,
                    start: "top 85%", 
                    toggleActions: "play none none reverse",
                },
                autoAlpha: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        }

        // 4. Featured Section (Product Cards)
        if (featuredRef.current) {
            gsap.to(".product-card", {
                scrollTrigger: {
                    trigger: featuredRef.current,
                    start: "top 85%",
                },
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out"
            });
        }

        // 5. Lifestyle Section
        if (lifestyleRef.current) {
            const lifestyleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: lifestyleRef.current,
                    start: "top 80%",
                }
            });

            lifestyleTl
                .to(".lifestyle-giant-text", { autoAlpha: 1, y: 0, duration: 1.2 })
                .to(".lifestyle-image-wrapper", { autoAlpha: 1, y: 0, duration: 1.2, ease: "power4.out" }, "-=0.8")
                .to(".lifestyle-info-overlay", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.4");
        }

        // 6. Horizontal Loop
        let loop: gsap.core.Tween;
        const setupLoop = () => {
            if (currentGrid) {
                if (loop) loop.kill(); 
                const cards = gsap.utils.toArray<HTMLElement>(".product-card");
                if (cards.length === 0) return;

                const cardWidth = cards[0]?.offsetWidth + 30 || 300;
                const totalWidth = cardWidth * (FEATURED_PRODUCTS.length);

                loop = gsap.to(currentGrid, {
                    x: `-=${totalWidth}`,
                    duration: 25,
                    ease: "none",
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.unitize((val) => parseFloat(val) % totalWidth)
                    }
                });
            }
        };

        const timer = setTimeout(() => {
            setupLoop();
            window.addEventListener("resize", setupLoop);

            if (currentGrid) {
                pauseHandler = () => loop && loop.pause();
                playHandler = () => loop && loop.play();
                currentGrid.addEventListener("mouseenter", pauseHandler);
                currentGrid.addEventListener("mouseleave", playHandler);
            }
        }, 1000);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", setupLoop);
            ScrollTrigger.getAll().forEach(t => t.kill());
            if (currentGrid && pauseHandler && playHandler) {
                currentGrid.removeEventListener("mouseenter", pauseHandler);
                currentGrid.removeEventListener("mouseleave", playHandler);
            }
        };
    }, []);

    return (
        <div className="home-container" style={{ overflowX: 'hidden' }}>
            {/* 1. Hero Section */}
            <section className="hero-section velvet-drapes" ref={heroRef}>
                <div className="hero-bg-velvet">
                    <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        preload="auto"
                        className="bg-velvet-video"
                        src="02177366724171500000000000000000000ffffc0a8981c5095fd.mp4" 
                    >
                        <source src="02177366724171500000000000000000000ffffc0a8981c5095fd.mp4" type="video/mp4" />
                    </video>
                    <div className="velvet-overlay"></div>
                    <div className="bottom-white-shroud22"></div>
                </div>
                <div className="hero-creative-layout">
                    <div className="text-reveal-container">
                        <span className="hero-tagline">THE NEW STANDARD OF REGALIA</span>
                        <h1 className="hero-giant-title">
                            <span className="line-one">TIMELESS</span>
                            <span className="line-two">VELVET</span>
                            <span className="line-three">EST. 1047</span>
                        </h1>
                        <p className="hero-statement">WHERE BRITISH TRADITION MEETS THE AVANT-GARDE.</p>
                    </div>
                </div>
            </section>

            {/* 2. Philosophy Section */}
            <section className="philosophy-section" ref={philosophyRef}>
                <div className="philosophy-container">
                    <div className="philosophy-ornament">
                        <span className="ornament-line"></span>
                        <i className="fa-solid fa-crown ornament-icon"></i>
                        <span className="ornament-line"></span>
                    </div>
                    <div className="philosophy-content">
                        <h2 className="philosophy-quote">
                            "Design is not just what it <span className="gold-shimmer">looks like</span>, 
                            it’s how it <span className="gold-shimmer">feels</span>."
                        </h2>
                        <p className="philosophy-author">— THE VELVET ARCHIVE PHILOSOPHY</p>
                    </div>
                </div>
            </section>

            {/* 3. Featured Grid */}
            <section className="featured-section" ref={featuredRef}>
                <div className="section-header">
                    <div className="title-wrapper">
                        <small className="section-tag">CURATED LIST</small>
                        <h2 className="section-main-title">Selected Items</h2>
                    </div>
                    <div className="view-all-btn">
                        <Link to="/collections">
                            <span>Explore All</span>
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </Link>
                    </div>
                </div>
                <div className="products-grid" ref={gridRef}>
                    {[...FEATURED_PRODUCTS, ...FEATURED_PRODUCTS].map((product, index) => (
                        <div key={`${product.id}-${index}`} className="product-card">
                            <div className="card-img-holder">
                                <div className="product-platform"></div>
                                <img src={product.image} alt={product.name} className="product-image" />
                            </div>
                            <div className="card-info">
                                <div className="info-top">
                                    <h4>{product.name}</h4>
                                    <div className="product-dot"></div>
                                </div>
                                <p className="product-description">{product.description}</p>
                                <div className="info-bottom">
                                    <span className="price">{product.price}</span>
                                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                        <button className="add-to-cart-btn">
                                            <i className="fa-solid fa-plus" style={{ fontSize: '0.8rem' }}></i>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Lifestyle Section */}
            <section className="lifestyle-section" ref={lifestyleRef}>
                <h2 className="lifestyle-giant-text">VELVET</h2>
                <div className="lifestyle-floating-container">
                    <div className="lifestyle-image-wrapper">
                        <img src="/SILK-ARCHIVE-SHIRT.png" className="floating-shirt" alt="Royal Blue Shirt" />
                        <div className="shirt-ground-shadow"></div>
                    </div>
                    <div className="lifestyle-info-overlay">
                        <small className="vision-tag">THE ART OF ATTIRE</small>
                        <h3 className="lifestyle-subtitle">THE EXPERIENCE</h3>
                    </div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
}

export default Home;