import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Crown } from 'lucide-react';
interface LoadingProps {
  onFinish?: () => void; // إضافة البروب ده عشان نبلغ الـ Provider
}
const Loading: React.FC<LoadingProps> = ({ onFinish }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
           // هنا بنعمل fade out للودر نفسه قبل ما نبلغ الأب
           gsap.to(wrapperRef.current, {
             opacity: 0,
             duration: 0.8,
             onComplete: () => onFinish?.() // دي اللي بتمسح اللودر من الـ DOM
           });
        }
      });

      gsap.set(".vlv-loader-content", { opacity: 1, y: 0 });

      tl.to(progressBarRef.current, { 
        width: "100%", 
        duration: 2.5, 
        ease: "power2.inOut",
      });

      // باقي الأنميشن المستمر (التاج والنقط)
      gsap.to(".vlv-loader-main-crown", { scale: 1.1, repeat: -1, yoyo: true, duration: 1.5 });
      gsap.to(".vlv-loader-dot", { opacity: 0, repeat: -1, stagger: 0.2, duration: 0.8 });

    }, wrapperRef);

    return () => ctx.revert();
  }, [onFinish]);

  return (
    <div className="vlv-loader-wrapper" ref={wrapperRef}>
      <style>{`
        .vlv-loader-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background-color: #F0F2F5;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999999;
          font-family: 'Cinzel', serif;
          overflow: hidden;
        }

        .vlv-loader-wrapper::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(175, 137, 54, 0.05) 0%, transparent 70%);
          filter: blur(60px);
        }

        .vlv-loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        }

        .vlv-loader-logo-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .vlv-loader-crown-box {
          margin-bottom: 5px;
        }

        .vlv-loader-main-crown {
          width: 50px;
          height: 50px;
          color: #AF8936;
          filter: drop-shadow(0 0 8px rgba(175, 137, 54, 0.4));
        }

        .vlv-loader-text {
          font-size: 3.5rem;
          letter-spacing: 0.7em;
          color: #101E42;
          margin: 0;
          text-transform: uppercase;
          font-weight: 400;
          padding-left: 0.7em;
        }

        .vlv-loader-dots-wrap {
          display: flex;
          justify-content: center;
          margin-top: -10px;
        }

        .vlv-loader-dot {
          font-size: 2.5rem;
          color: #AF8936;
          font-weight: bold;
        }

        .vlv-loader-progress-bg {
          width: 350px;
          height: 2px;
          background-color: rgba(16, 30, 66, 0.1);
          margin-top: 40px;
          overflow: hidden;
          position: relative;
          border-radius: 1px;
        }

        .vlv-loader-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #AF8936, #C5A059, #AF8936);
          background-size: 200% auto;
          box-shadow: 0 0 15px rgba(175, 137, 54, 0.6);
          animation: vlv-loader-shine 2s infinite linear;
        }

        @keyframes vlv-loader-shine {
          to { background-position: 200% center; }
        }

        @media (max-width: 500px) {
          .vlv-loader-text {
            font-size: 2rem;
            letter-spacing: 0.4em;
            padding-left: 0.4em;
          }
          .vlv-loader-main-crown {
            width: 35px;
            height: 35px;
          }
          .vlv-loader-progress-bg {
            width: 250px;
            margin-top: 30px;
          }
          .vlv-loader-dot {
            font-size: 1.8rem;
          }
          .vlv-loader-dots-wrap {
            margin-top: -5px;
          }
        }
      `}</style>

      <div className="vlv-loader-content">
        <div className="vlv-loader-logo-area">
          <div className="vlv-loader-crown-box">
            <Crown className="vlv-loader-main-crown" />
          </div>
          <h1 className="vlv-loader-text">VELVET</h1>
        </div>

        <div className="vlv-loader-dots-wrap">
          <span className="vlv-loader-dot">.</span>
          <span className="vlv-loader-dot">.</span>
          <span className="vlv-loader-dot">.</span>
        </div>

        <div className="vlv-loader-progress-bg">
          <div ref={progressBarRef} className="vlv-loader-progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;