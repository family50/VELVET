import './home.css'
import { FEATURED_PRODUCTS } from './collectionss';
import { useLayoutEffect, useRef } from 'react'; // التغيير هنا: استيراد useLayoutEffect
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './fotter'; 
import { Link } from 'react-router-dom';
// 1. استورد useLoading من البروفايدر بتاعك
import { useGlobalLoading } from './LoadingContext'; // تأكد من الاسم هنا // ✅ ده المكان الصح بعد ما فصلناهم
import LuxeMedia from './LuxeMedia';

function Home() {
    const gridRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const philosophyRef = useRef<HTMLDivElement>(null);
    const featuredRef = useRef<HTMLDivElement>(null);
    const lifestyleRef = useRef<HTMLDivElement>(null);
const { isReady } = useGlobalLoading();

    // التغيير الرئيسي: استخدام useLayoutEffect لضمان تنفيذ الأنميشن قبل رسم المتصفح للشاشة
// التغيير الرئيسي: استخدام useLayoutEffect مع إضافة isLoading كمراقب (Dependency)
    useLayoutEffect(() => {
        // منع تنفيذ الأنميشن طالما الموقع في حالة تحميل
        if (!isReady) return;

        gsap.registerPlugin(ScrollTrigger);
        const currentGrid = gridRef.current;
        
        let pauseHandler: () => void;
        let playHandler: () => void;

        // 1. الإخفاء الأولي الفوري (Initial State) لجميع العناصر
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
        
        // ضبط الحالة المبدئية: شفافية 0 وإزاحة بسيطة للأسفل للنصوص
        gsap.set(allElements, { autoAlpha: 0 });
        gsap.set([".hero-tagline", ".hero-giant-title span", ".hero-statement"], { y: 30 });

        // 2. Hero Section - أنميشن الدخول (يبدأ بعد اختفاء اللودر مباشرة)
        const heroTl = gsap.timeline({ 
            delay: 0.5 // تأخير بسيط ليتناغم مع Fade-in الصفحة الرئيسية في App.tsx
        });

        heroTl
            // إظهار الخلفية والفيديو
            .to([".bg-velvet-video", ".velvet-overlay", ".bottom-white-shroud22"], {
                autoAlpha: 1,
                duration: 1.2,
                ease: "power2.inOut"
            })
            // دخول التاج لاين
            .to(".hero-tagline", { 
                autoAlpha: 1, 
                y: 0, 
                duration: 1, 
                ease: "power3.out" 
            }, "-=0.4")
            // دخول العنوان الرئيسي (TIMELESS VELVET...) بـ Stagger احترافي
            .to(".hero-giant-title span", { 
                autoAlpha: 1, 
                y: 0, 
                stagger: 0.15, 
                duration: 1.2, 
                ease: "power4.out" 
            }, "-=0.6")
            // دخول الجملة الوصفية الأخيرة
            .to(".hero-statement", { 
                autoAlpha: 1, 
                y: 0, 
                duration: 1, 
                ease: "power3.out" 
            }, "-=0.8");

        // 3. Philosophy Section - ScrollTrigger
        if (philosophyRef.current) {
            gsap.fromTo(philosophyRef.current, 
                { autoAlpha: 0, y: 50 },
                {
                    scrollTrigger: {
                        trigger: philosophyRef.current,
                        start: "top 80%", // يبدأ بدري شوية عشان اليوزر يلحق يشوفه
                        toggleActions: "play none none reverse",
                    },
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out"
                }
            );
        }

        // 4. Featured Section - Stagger Cards
        if (featuredRef.current) {
            gsap.fromTo(".product-card", 
                { autoAlpha: 0, y: 100 },
                {
                    scrollTrigger: {
                        trigger: featuredRef.current,
                        start: "top 60%",
                    },
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power2.out"
                }
            );
        }

        // 5. Lifestyle Section - Timeline
        if (lifestyleRef.current) {
            const lifestyleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: lifestyleRef.current,
                    start: "top 50%",
                }
            });

            lifestyleTl.fromTo(".lifestyle-giant-text", 
                { autoAlpha: 0, y: 50 }, 
                { autoAlpha: 1, y: 0, duration: 1.2 }
            )
            .fromTo(".lifestyle-image-wrapper", 
                { autoAlpha: 0, y: 150 }, 
                { autoAlpha: 1, y: 0, duration: 1.2, ease: "power4.out" }, 
                "-=0.8"
            )
            .fromTo(".lifestyle-info-overlay", 
                { autoAlpha: 0, y: 30 }, 
                { autoAlpha: 1, y: 0, duration: 0.8 }, 
                "-=0.4"
            );
        }

        // 6. Horizontal Loop Logic
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
        }, 1500); // زيادة الوقت قليلاً لضمان استقرار الـ DOM

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", setupLoop);
            ScrollTrigger.getAll().forEach(t => t.kill());
            if (currentGrid && pauseHandler && playHandler) {
                currentGrid.removeEventListener("mouseenter", pauseHandler);
                currentGrid.removeEventListener("mouseleave", playHandler);
            }
        };
    }, [isReady]); // الاعتماد على isLoading أساسي هنا

    return (
        <div className="home-container" style={{ overflowX: 'hidden' }}>
          {/* 1. Hero Section */}
<section className="hero-section velvet-drapes" ref={heroRef}>
    <div className="hero-bg-velvet">
        {/* استبدال الـ video بـ LuxeMedia لتحقيق أداء الرامات والسكيلتون */}
        <LuxeMedia 
            type="video"
            src="/02177366724171500000000000000000000ffffc0a8981c5095fd.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto" 
            className="bg-velvet-video"
        />
        
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
                        <Link to="/collections" >
                            <a>Explore All</a>
                            <i className="fa-solid fa-arrow-right-long"></i>
                        </Link>
                    </div>
                </div>
                <div className="products-grid" ref={gridRef}>
                    {[...FEATURED_PRODUCTS, ...FEATURED_PRODUCTS].map((product, index) => (
                        <div key={`${product.id}-${index}`} className="product-card">
                            <div className="card-img-holder">
                                <div className="product-platform"></div>
                                <LuxeMedia src={product.image} alt={product.name} className="product-image" />
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
                        <LuxeMedia src="/SILK-ARCHIVE-SHIRT.png" className="floating-shirt" alt="Royal Blue Shirt" />
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