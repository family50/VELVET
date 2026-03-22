import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Clothings-pieces.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { 
  MEN_COLLECTION, 
  WOMEN_COLLECTION, 
  LIMITED_ARCHIVE, 
  COLLECTION_HERO_ASSETS 
} from './collectionss'; 
import type { Product } from './collectionss'; 
import Footer from './fotter';

interface HeroAsset {
    heroTitle: string;
    heroSubtitle: string;
    heroTagline: string;
    heroImage: string;
}

const Pieces: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const productsGridRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const productsSectionRef = useRef<HTMLDivElement>(null);
  const artisanSectionRef = useRef<HTMLDivElement>(null);
  const valuesSectionRef = useRef<HTMLDivElement>(null);

  // 1. تحديد البيانات
  let allCategoryProducts: Product[] = [];
  let currentHero: HeroAsset | undefined;

  switch (categoryName?.toLowerCase()) {
    case 'men':
      allCategoryProducts = MEN_COLLECTION;
      currentHero = COLLECTION_HERO_ASSETS.men;
      break;
    case 'women':
      allCategoryProducts = WOMEN_COLLECTION;
      currentHero = COLLECTION_HERO_ASSETS.women;
      break;
    case 'archive':
      allCategoryProducts = LIMITED_ARCHIVE;
      currentHero = COLLECTION_HERO_ASSETS.archive;
      break;
    default:
      allCategoryProducts = LIMITED_ARCHIVE;
      currentHero = COLLECTION_HERO_ASSETS.archive;
  }

  const totalPages = Math.ceil(allCategoryProducts.length / productsPerPage);

  // استخدام useCallback لحل مشكلة الـ Dependency
  const updateProductsPerPage = useCallback(() => {
    if (productsGridRef.current) {
      const gridComputedStyle = window.getComputedStyle(productsGridRef.current);
      const gridColumns = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ");
      const gridColumnCount = gridColumns.length;
      const newCount = gridColumnCount > 0 ? gridColumnCount * 3 : 9;
      if (newCount !== productsPerPage) {
        setProductsPerPage(newCount);
      }
    }
  }, [productsPerPage]);

  let adjustedCurrentPage = currentPage;
  if (currentPage > totalPages && totalPages > 0) {
      adjustedCurrentPage = 1;
      setCurrentPage(1); 
  }

  const [prevCategory, setPrevCategory] = useState(categoryName);
  if (categoryName !== prevCategory) {
    setPrevCategory(categoryName);
    setCurrentPage(1);
  }

  const indexOfLastProduct = adjustedCurrentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const displayedProducts = allCategoryProducts.slice(indexOfFirstProduct, indexOfLastProduct);
// 2. الأنميشن وإدارة القياسات
useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  // تحديث الحسابات فوراً
  const timeoutId = requestAnimationFrame(() => {
    updateProductsPerPage();
  });

  window.addEventListener('resize', updateProductsPerPage);

  const ctx = gsap.context(() => {
    
    // 1. HERO ANIMATION
    gsap.fromTo(heroRef.current, 
      { autoAlpha: 0, y: 100 },
      { autoAlpha: 1, y: 0, duration: 1.5, ease: "expo.out" }
    );

    // 2. PRODUCTS GRID - استهداف الكروت بدقة أعلى
    // أضفنا delay بسيط لضمان أن React انتهى من رسم المنتجات
    setTimeout(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.product-card-link11');
      if (cards.length > 0) {
        cards.forEach((card) => {
          gsap.fromTo(card, 
            { autoAlpha: 0, y: 80 },
            { 
              autoAlpha: 1, 
              y: 0, 
              duration: 1, 
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%", // يبدأ الأنميشن مبكراً قليلاً
                toggleActions: "play none none reverse",
              }
            }
          );
        });
      }
    }, 100);

// 3. ARTISAN SECTION - حركة متقابلة (النص من اليسار والفيديو من اليمين)
if (artisanSectionRef.current) {
  const textElement = artisanSectionRef.current.querySelector('.artisan-text');
  const visualElement = artisanSectionRef.current.querySelector('.artisan-visual');

  // أنميشن النص (يأتي من اليسار X: -100)
  gsap.fromTo(textElement, 
    { autoAlpha: 0, x: -100 }, 
    { 
      autoAlpha: 1, 
      x: 0, 
      duration: 1.5, 
      ease: "power4.out",
      scrollTrigger: {
        trigger: artisanSectionRef.current,
        start: "top 75%",
      }
    }
  );

  // أنميشن الفيديو (يأتي من اليمين X: 100)
  gsap.fromTo(visualElement, 
    { autoAlpha: 0, x: 100 }, 
    { 
      autoAlpha: 1, 
      x: 0, 
      duration: 1.5, 
      ease: "power4.out",
      scrollTrigger: {
        trigger: artisanSectionRef.current,
        start: "top 75%",
      }
    }
  );
}
   // 4. VALUES SECTION - تأثير الـ Scale (الظهور من المركز)
if (valuesSectionRef.current) {
  const boxes = valuesSectionRef.current.querySelectorAll('.value-box');
  
  gsap.fromTo(boxes, 
    { 
      autoAlpha: 0, 
      scale: 0.5, // يبدأ من نصف حجمه الطبيعي
      transformOrigin: "center center" // التأكد من أن التوسع يبدأ من المنتصف
    }, 
    { 
      autoAlpha: 1, 
      scale: 1, // يصل لحجمه الطبيعي
      duration: 1, 
  
      ease: "back.out(1.7)", // الـ Back ease يجعل العنصر يتمدد قليلاً ثم يعود لحجمه، مما يعطي حركة حيوية
      scrollTrigger: {
        trigger: valuesSectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse" 
      }
    }
  );
}

    // تحديث ScrollTrigger مرتين لضمان استقرار الأبعاد
    ScrollTrigger.refresh();
    setTimeout(() => ScrollTrigger.refresh(), 500);

  }, heroRef); 

  return () => {
    cancelAnimationFrame(timeoutId);
    window.removeEventListener('resize', updateProductsPerPage);
    ctx.revert();
  };
}, [categoryName, adjustedCurrentPage, productsPerPage, updateProductsPerPage, displayedProducts]); 
// ملاحظة: أضفنا displayedProducts للتأكد من إعادة تشغيل الأنميشن عند تغيير الصفحة
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const element = document.querySelector('.section-products11');
    if (element) {
      const topPosition = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  };



  // دالة التعامل مع المفضلة
const toggleFavorite = (e: React.MouseEvent, productId: number) => {
  e.preventDefault(); // منع الانتقال لصفحة المنتج
  e.stopPropagation(); // منع وصول الحدث للعناصر الأب

  const storageKey = `fav_${productId}`;
  const isCurrentlyFav = localStorage.getItem(storageKey) === 'true';
  const nextFavState = !isCurrentlyFav;

  // 1. حفظ في LocalStorage
  localStorage.setItem(storageKey, String(nextFavState));

  // 2. أنميشن فخم باستخدام GSAP (تأثير النبض واللون)
  const heartIcon = e.currentTarget.querySelector('i');
  if (heartIcon) {
    if (nextFavState) {
      heartIcon.classList.remove('far');
      heartIcon.classList.add('fas', 'active-heart'); // 'fas' للقلب الممتلئ
      
      // أنميشن النبض
      gsap.fromTo(heartIcon, 
        { scale: 1 }, 
        { scale: 1.4, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    } else {
      heartIcon.classList.remove('fas', 'active-heart');
      heartIcon.classList.add('far');
      gsap.to(heartIcon, { scale: 1, duration: 0.2 });
    }
  }
};

  return (
    <div className="pieces-page">
      {currentHero && (
        <>
          <section className="regalia-hero" ref={heroRef}>
            <div className="hero-bg-image" style={{ backgroundImage: `url(${currentHero.heroImage})` }}></div>
            <div className="hero-vignette"></div>
            <div className="hero-container">
              <div className="hero-content-wrapper">
                <div className="hero-badge">
                   <span className="line"></span>
                   <span className="badge-text">{currentHero.heroTagline}</span>
                </div>
                <h1 className="hero-main-title">
                  {currentHero.heroTitle.split(' ').map((word: string, i: number) => (
                    <span key={i} className="title-word">{word} </span>
                  ))}
                </h1>
                <div className="hero-footer-info">
                  <p className="hero-description">{currentHero.heroSubtitle}</p>
                  <div className="hero-divider"></div>
                  <div className="hero-location">EST. 2026 — CAIRO / LONDON</div>
                </div>
              </div>
              <div className="hero-scroll-control">
                <span className="scroll-text">DISCOVER</span>
                <div className="scroll-line-container"><div className="scroll-line"></div></div>
              </div>
            </div>
          </section>





          <section className="section-products11" ref={productsSectionRef}>
            <div className="section-header-minimal11"><h2>SELECTED PIECES</h2></div>
            <div className="products-container11">
              <div className="products-grid11" ref={productsGridRef}>
                {displayedProducts.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="product-card-link11">
                    <div className="product-card11">
                      <div className="image-wrapper-3d11">
                        <div className="product-shadow-3d11"></div>
                        <img src={product.image} alt={product.name} className="floating-clothing11" />
                        <div className="quick-action-overlay11">
                          <button 
  className="action-btn11" 
  onClick={(e) => toggleFavorite(e, product.id)}
>
  <i className={`${localStorage.getItem(`fav_${product.id}`) === 'true' ? 'fas active-heart' : 'far'} fa-heart`}></i>
</button>
                        </div>
                      </div>
                      <div className="product-info-minimal11">
                        <div className="info-top11">
                          <span className="p-category11">{product.category}</span>
                          <span className="p-price11">{product.price}</span>
                        </div>
                        <h3 className="p-name11">{product.name}</h3>
                        <div className="p-details11">
                           <div className="p-color11" style={{ backgroundColor: product.color }}></div>
                           <p className="p-desc11">{product.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination-regalia">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`page-item ${currentPage === number ? 'active' : ''}`}
                    >
                      <span className="page-number">{number < 10 ? `0${number}` : number}</span>
                      <div className="page-indicator"></div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="section-artisan" ref={artisanSectionRef}>
            <div className="artisan-layout">
              <div className="artisan-text">
                <span className="label">THE CRAFT</span>
                <h2>ARCHITECTURAL TEXTURES</h2>
                <p>Each fiber is selected to maintain the structural integrity of the silhouette. We use 24k gold threads and Italian heritage silk.</p>
                <div className="stats-grid">
                  <div className="stat-item"><span>100%</span><small>Organic Silk</small></div>
                  <div className="stat-item"><span>Hand</span><small>Finished</small></div>
                </div>
              </div>
              <div className="artisan-visual">
                <div className="macro-shot-container">
                  <video className="artisan-video-player" loop muted autoPlay playsInline>
                    <source src="/02177396161758100000000000000000000ffffc0a8981c3c8805.mp4" type="video/mp4" />
                  </video>
                  <div className="video-overlay-cinematic"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-values" ref={valuesSectionRef}>
            <div className="values-grid">
              <div className="value-box">
                <i className="fas fa-gem"></i>
                <h3>Exclusivity</h3>
                <p>Limited run editions never to be reproduced.</p>
              </div>
              <div className="value-box">
                <i className="fas fa-feather-alt"></i>
                <h3>Lightweight</h3>
                <p>Structure without the weight of tradition.</p>
              </div>
              <div className="value-box">
                <i className="fas fa-history"></i>
                <h3>Legacy</h3>
                <p>Pieces designed to be archived for decades.</p>
              </div>
            </div>
          </section>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Pieces;