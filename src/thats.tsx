import { useLayoutEffect, useRef } from 'react'; // التغيير هنا
import './thats.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './fotter'; 

function Thats() {
    const component = useRef<HTMLDivElement>(null); // Ref شامل للكونتينر
    const horizontalSectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const manifestoTextRef = useRef<HTMLDivElement>(null);
    const heritageSectionRef = useRef<HTMLElement>(null);
    const pillarsSectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
        
// --- أنميشن السيكشن الأول (Manifesto) ---

// 1. Flicker Prevention 
            gsap.set([".heritage-image-wrapper", ".heritage-text-box", ".model-item"], { 
                autoAlpha: 0 
            });

            // --- أنميشن السيكشن الأول (Manifesto) ---
            
            // التأكد من وجود الـ Refs أولاً
            if (manifestoTextRef.current && component.current) {
                
                const manifestoLines = manifestoTextRef.current.querySelectorAll(
                    '.manifesto-pre-title, .manifesto-title, .horizontal-divider, .manifesto-philosophy, .content-footer'
                );

                const manifestoBackground = component.current.querySelectorAll(
                    '.manifesto-bg-video, .light-wash-overlay, .bottom-white-shroud, .fine-grain'
                );

                // التحقق من أن القوائم ليست فارغة لتجنب تمرير undefined لـ GSAP
                if (manifestoLines.length > 0 && manifestoBackground.length > 0) {
                    const tl = gsap.timeline();

                    // أنميشن الخلفية
                    tl.fromTo(manifestoBackground, 
                        { autoAlpha: 0 }, 
                        { autoAlpha: 1, duration: 2.5, ease: "power2.inOut" }
                    );

                    // أنميشن النصوص
                    tl.fromTo(manifestoLines, 
                        { 
                            autoAlpha: 0, 
                            y: 40, 
                            filter: "blur(15px)",
                            scale: 0.95
                        }, 
                        {
                            autoAlpha: 1,
                            y: 0,
                            filter: "blur(0px)",
                            scale: 1,
                            duration: 1.8,
                            ease: "expo.out",
                            stagger: 0.2,
                            clearProps: "all"
                        }, 
                        "-=1.5"
                    );
                }
            }
        // --- أنميشن السيكشن الثاني (Heritage) ---
            const heritageTL = gsap.timeline({
                scrollTrigger: {
                    trigger: heritageSectionRef.current,
                    start: "top 50%",
                    end: "20% top",
                    toggleActions: "play reverse play reverse",
                }
            });

            heritageTL.to(".heritage-image-wrapper", { 
                x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.out" 
            }).to(".heritage-text-box", { 
                x: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.8, ease: "expo.out" 
            }, "<");

            // --- أنميشن السيكشن الثالث (Horizontal Scroll) ---
       gsap.to(horizontalSectionRef.current, {
                x: "-200vw",
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: "2000 top",
                }
            });

            // --- أنميشن السيكشن الرابع (Pillars) ---
            gsap.to(".model-item", {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                stagger: 0.6,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: pillarsSectionRef.current,
                    start: "top 40%",
                    toggleActions: "play none none reverse"
                }
            });

            // --- أنميشن السيكشن الخامس (Royal Gate) ---
            const gateTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".royal-gate",
                    start: "top senter",
                  end: "bottom+=600% bottom",
                  
                  pinSpacing: false,
                  markers: {
            startColor: "red",
            endColor: "red",
            fontSize: "18px"
        },
                    pin: true,
                    scrub: 1,
                    onEnter: () => videoRef.current?.play(),
                    onLeaveBack: () => videoRef.current?.pause(),
                }

            });

            gateTl.fromTo(".floating-video-container", 
                { y: 200, autoAlpha: 0, scale: 0.8 }, 
                { y: 0, autoAlpha: 1, scale: 1.1, ease: "power2.out" }
            ).fromTo(".gate-container", 
                { y: 60, autoAlpha: 0 }, 
                { y: 0, autoAlpha: 1, ease: "power2.out" },
                "<0.2"
            );

        }, component); // حصر السياق داخل الكونتينر الرئيسي

   // الحل السحري للقفزات: إعادة الحساب بعد التحميل
    const refreshAll = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshAll);

    return () => {
        window.removeEventListener('load', refreshAll);
        ctx.revert();
    };
}, []);








    return (
      <div className="thats-page-wrapper" ref={component} style={{ overflowX: 'hidden' }}>
            
            {/* 1. The Manifesto Section */}
     {/* 1. The Manifesto Section */}
            <section className="manifesto-section">
                <div className="manifesto-video-overlay">
                    <video 
  autoPlay 
  muted 
  loop 
  playsInline 
  preload="auto" // تأكد إن دي موجودة
  className="manifesto-bg-video"
>
  <source src="/02177378036414400000000000000000000ffffc0a8981c4abb5d.mp4" type="video/mp4" />
</video>
                    <div className="light-wash-overlay"></div>
                    <div className="bottom-white-shroud"></div>
                    <div className="fine-grain"></div>
                </div>
                
                <div className="manifesto-content" ref={manifestoTextRef}>
                    <div className="main-text-wrapper">
                        <h2 className="manifesto-pre-title">The Art of Precision</h2>
                        <h1 className="manifesto-title">
                            A Legacy Woven in <br/> 
                            <span className="italic-text">Silk & Shadow</span>
                        </h1>
                        <div className="horizontal-divider"></div>
                        <p className="manifesto-philosophy">
                            Where the whispers of heritage meet the cutting edge <br/>
                            of mechanical soul. Crafted for the eternal few.
                        </p>
                    </div>
                    <footer className="content-footer">
                        <p className="manifesto-subtitle">THE VELVET ARCHIVE — EST. 1047</p>
                    </footer>
                </div>
            </section>




            {/* 2. Our Heritage Section */}
<section className="heritage-section" ref={heritageSectionRef}>
                <div className="heritage-container">
                    <div className="heritage-grid">
                        <div className="heritage-image-wrapper" style={{ transform: 'translateX(-150px)' }}>
                            <div className="image-border-gold"></div>
                            <div className="heritage-image-box">
                                <img src="./Heritage-Portrait.png" alt="Heritage Portrait" className="heritage-img" />
                                <div className="image-overlay-glow"></div>
                            </div>
                            <span className="image-caption">© VELVET ARCHIVE 1047</span>
                        </div>

                        <div className="heritage-text-box" style={{ transform: 'translateX(150px)' }}>
                            <div className="heritage-header">
                                <span className="section-label">OUR STORY</span>
                                <div className="label-line-gold"></div>
                            </div>
                            <h2 className="heritage-title">
                                Born from the <br/> 
                                <span className="gold-italic">Royal Archives</span>
                            </h2>
                            <div className="heritage-divider-long"></div>
                            <p className="heritage-desc">
                                Founded in the heart of London, our house has spent centuries perfecting 
                                the art of textile manipulation.
                            </p>
                            <div className="heritage-footer">
                                <div className="heritage-signature">The Velvet Protocol</div>
                                <div className="heritage-year">EST. 1047</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>











            {/* 3. The Craftsmanship (Horizontal Scroll) */}
           {/* 3. The Craftsmanship (Horizontal Scroll) */}
<section ref={triggerRef} className="horizontal-overflow-wrapper">
    
    <div ref={horizontalSectionRef} className="horizontal-inner">
        
      {/* Slide 1 - Updated Description */}
<div className="craft-slide">
    <div className="slide-content-3d">
        <div className="image-container-3d">
            <img src="./Macro-Fabric.png" alt="Velvet Craft Monolith" className="floating-img" />
            <div className="floating-shadow"></div>
        </div>
        <div className="slide-info-3d">
            <span className="slide-number">01</span>
            <h3>Handmade Dream</h3> {/* تم تغيير العنوان */}
            <p>Fusion of Traditional Craft & Visionary Precision.</p> {/* تم تغيير الوصف */}
        </div>
    </div>
</div>

       {/* Slide 2 - Updated Description for Image 7 */}
<div className="craft-slide">
    <div className="slide-content-3d">
        <div className="image-container-3d">
            <img src="./Precision-Stitching.png" alt="Tailoring Endurance" className="floating-img" />
            <div className="floating-shadow"></div>
        </div>
        <div className="slide-info-3d">
            <span className="slide-number">02</span>
            <h3>Enduring Legacy</h3> {/* تم تغيير العنوان */}
            <p>Every thread connects centuries of British Soul.</p> {/* تم تغيير الوصف */}
        </div>
    </div>
</div>

       {/* Slide 3 - Updated Description for Image 8 */}
<div className="craft-slide">
    <div className="slide-content-3d">
        <div className="image-container-3d">
            <img src="./Gold-Thread.png" alt="Exploded Velvet Suit" className="floating-img" />
            <div className="floating-shadow"></div>
        </div>
        <div className="slide-info-3d">
            <span className="slide-number">03</span>
            <h3>Sculpted Integrity</h3> {/* تم تغيير العنوان */}
            <p>An exploded view of precision. 18 panels aligned with mathematical soul.</p> {/* تم تغيير الوصف */}
        </div>
    </div>
</div>

    </div>
</section>















            {/* 4. Core Pillars Section */}
       {/* 4. The Pillars of Philosophy */}
{/* 4. The Pillars of Philosophy - Models Version */}
<section className="philosophy-pillars-section models-layout" ref={pillarsSectionRef}>
    <div className="pillars-container">
        <div className="pillars-header">
            <span className="section-label">THE MANIFESTO</span>
            <h2 className="pillars-main-title">Principles of <span className="gold-italic">Prestige</span></h2>
        </div>

        <div className="pillars-grid models-grid">
            {/* Pillar I - Ancestral Innovation */}
            <div className="pillar-item model-item">
                {/* العنصر العائم: الأيقونة والرقم */}
                <span className="pillar-index floating-meta">
                    <i className="fa-solid fa-compass-drafting"></i> 
                    I
                </span>
                
                {/* حاوية الصورة - يجب أن تكون PNG بدون خلفية */}
                <div className="model-image-container">
                    <img src="./Ancestral-Innovation-Model.png" alt="Ancestral Innovation Model" className="model-img" />
                    <div className="image-shadow-gold"></div> {/* ظل ذهبي خلف المودل */}
                </div>

                {/* العنوان أسفل المودل */}
                <h3 className="model-title">Ancestral <br/> Innovation</h3>
            </div>

            {/* Pillar II - Radical Rarity */}
            <div className="pillar-item model-item">
                <span className="pillar-index floating-meta">
                    <i className="fa-solid fa-gem"></i> 
                    II
                </span>
                
                <div className="model-image-container">
                    <img src="./model-rarity.png" alt="Radical Rarity Model" className="model-img" />
                    <div className="image-shadow-gold"></div>
                </div>

                <h3 className="model-title">Radical <br/> Rarity</h3>
            </div>

            {/* Pillar III - Sustainable Soul */}
            <div className="pillar-item model-item">
                <span className="pillar-index floating-meta">
                    <i className="fa-solid fa-leaf"></i> 
                    III
                </span>
                
                <div className="model-image-container">
                    <img src="./model-sustainability.png" alt="Sustainable Soul Model" className="model-img" />
                    <div className="image-shadow-gold"></div>
                </div>

                <h3 className="model-title">Sustainable <br/> Soul</h3>
            </div>
        </div>

    </div>
</section>

            {/* 5. The Curators Section */}
<section className="archive-cta-section royal-gate">
                <div className="floating-video-container">
                    <video ref={videoRef} className="floating-element-video" muted loop playsInline preload="auto">
                        <source src="./02177383855846600000000000000000000ffffc0a8981c55fafa.mp4" type="video/mp4" />
                    </video>
                    <div className="video-ground-shadow"></div>
                </div>
                <div className="gate-container">
        
        {/* الجانب الأيسر: العنوان الأيقوني */}
        <div className="gate-left">
            <h2 className="cta-title">
                The Archive <br/> 
                <span className="is-waiting">Is Waiting</span>
            </h2>
        </div>

        {/* الجانب الأيمن: الأكشن والوصف */}
        <div className="gate-right">
            {/* الفاصل الذهبي الرأسي الذي يوجه العين للزر */}
            <div className="vertical-divider-gold"></div>
            
            <div className="cta-action-box">
                <p className="cta-desc">
                    A curated realm for the modern rebel. <br/> 
                    Where <strong>Silk</strong> meets <strong>Shadow</strong>.
                </p>
                
                {/* الزر الملكي الجديد (Minimalist Luxury) */}
                <button className="gate-button">
                    <span className="gate-text">ENTER THE REALM</span>
                    {/* خطوط الحدود التي تتمدد عند الهوفر */}
                    <div className="gate-border-top"></div>
                    <div className="gate-border-bottom"></div>
                </button>
            </div>
        </div>

    </div>

    {/* عنصر فني خلفي إضافي لعمق التصميم */}
    <div className="portal-glow-field"></div>
</section>
 <Footer />

        </div>
    );
}

export default Thats;