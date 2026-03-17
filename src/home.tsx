import './home.css'
import { FEATURED_PRODUCTS } from './collectionss';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Footer from './fotter';
function Home() {
    
// 1. تحديد نوع الـ Ref بدقة لتجنب "Object is possibly null"
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const grid = gridRef.current;
        // التحقق من وجود الجريد قبل البدء
        if (!grid) return;

        const cards = gsap.utils.toArray<HTMLElement>(".product-card");
        if (cards.length === 0) return;

        // حساب العرض الكلي
        const cardWidth = cards[0].offsetWidth + 30;
        const totalWidth = cardWidth * (FEATURED_PRODUCTS.length);

        // 2. وضع الأنميشن داخل متغير للتحكم به
        const loop = gsap.to(grid, {
            x: `-=${totalWidth}`,
            duration: 25,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((val) => parseFloat(val) % totalWidth)
            }
        });

        // 3. تعريف دوال الأحداث لسهولة مسحها
        const play = () => loop.play();
        const pause = () => loop.pause();

        grid.addEventListener("mouseenter", pause);
        grid.addEventListener("mouseleave", play);

        // 4. الحل النهائي لخطأ EffectCallback: 
        // يجب أن تعيد الدالة void أو دالة تنظيف فقط، لا تعيد Tween
        return () => {
            loop.kill();
            grid.removeEventListener("mouseenter", pause);
            grid.removeEventListener("mouseleave", play);
        };
    }, []);













    return (
        <div className="home-container">
            {/* 1. Hero Section - العرض الرئيسي */}
<section className="hero-section velvet-drapes">
    {/* الخلفية: الفيديو الملكي */}
    <div className="hero-bg-velvet">
        <video autoPlay muted loop playsInline className="bg-velvet-video">
            <source src="02177366724171500000000000000000000ffffc0a8981c5095fd.mp4" type="video/mp4" />
        </video>
        <div className="velvet-overlay"></div>
    </div>

    {/* المحتوى الإبداعي الجديد: نصوص ضخمة فقط */}
    <div className="hero-creative-layout">
        <div className="text-reveal-container">
            <span className="hero-tagline">THE NEW STANDARD OF REGALIA</span>
            <h1 className="hero-giant-title">
                <span className="line-one">TIMELESS</span>
                <span className="line-two">VELVET</span>
                <span className="line-three">EST. 1047</span>
            </h1>
            <p className="hero-statement">
                WHERE BRITISH TRADITION MEETS THE AVANT-GARDE.
            </p>
        </div>
    </div>
</section>

            {/* 2. Philosophy Section - فلسفة البراند (كلام بسيط وفخم) */}
<section className="philosophy-section">
    <div className="philosophy-container">
        {/* الزخرفة العلوية */}
        <div className="philosophy-ornament">
            <span className="ornament-line"></span>
            {/* استخدام FontAwesome - أيقونة التاج الملكي */}
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






            {/* 3. Featured Grid - شبكة المنتجات المميزة */}
       <section className="featured-section">
    <div className="section-header">
        <div className="title-wrapper">
            <small className="section-tag">CURATED LIST</small>
            <h2 className="section-main-title">Selected Items</h2>
        </div>
        <div className="view-all-btn">
            <a>Explore All</a>
            <i className="fa-solid fa-arrow-right-long"></i>
        </div>
    </div>

    <div className="products-grid" ref={gridRef}>
      {[...FEATURED_PRODUCTS, ...FEATURED_PRODUCTS].map((product, index) => (
        <div key={`${product.id}-${index}`} className="product-card">
            
            <div className="card-img-holder">
                <div className="product-platform"></div>
                {/* رابط الصورة سيكون فارغاً بانتظار صورك الـ 3D */}
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image" 
                />
            </div>
            <div className="card-info">
                <div className="info-top">
                    <h4>{product.name}</h4>
                    <div className="product-dot"></div>
                </div>
                <p className="product-description">{product.description}</p>
                <div className="info-bottom">
                    <span className="price">{product.price}</span>
                    <button className="add-to-cart-btn">
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    ))}
    </div>
</section>




            {/* 4. Lifestyle Video - سيكشن فيديو يعطي حياة للموقع */}
  <section className="lifestyle-section">
    {/* النص العملاق المتمركز في الخلفية */}
    <h2 className="lifestyle-giant-text">VELVET</h2>

    <div className="lifestyle-floating-container">
        <div className="lifestyle-image-wrapper">
            {/* القميص الكحلي - تأكد أن الصورة بدون خلفية PNG */}
            <img 
                src="/SILK-ARCHIVE-SHIRT.png" 
                className="floating-shirt" 
                alt="Royal Blue Shirt" 
            />
            {/* الظل الأرضي الديناميكي */}
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
    )
}

export default Home