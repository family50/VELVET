import React, { useState, forwardRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface CustomMediaProps {
  src: string;
  type?: 'img' | 'video';
  aspectRatio?: string;
  className?: string;
}

type LuxeMediaProps = CustomMediaProps & 
  React.ImgHTMLAttributes<HTMLImageElement> & 
  React.VideoHTMLAttributes<HTMLVideoElement>;

const LuxeMedia = forwardRef<HTMLImageElement | HTMLVideoElement, LuxeMediaProps>(
  ({ src, type = 'img', className, aspectRatio, style, ...rest }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. الحاوية الخارجية: شيلنا الـ overflow: hidden والـ inline-block
    // عشان نسمح للصور تخرج بره الإطار (للـ floating effects)
    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      height: '100%',
      aspectRatio,
      ...style // يورث الـ style الممرر من الـ CSS بتاعك (زي الـ Filter أو الـ Transform)
    };

    // 2. الميديا الفعلية: بنستخدم 'inherit' عشان تأخد كل تفاصيل الـ CSS الأصلية
    const mediaStyle: React.CSSProperties = {
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 0.8s ease-in-out',
      width: '100%',
      height: '100%',
      display: 'block',
      objectFit: style?.objectFit || 'inherit', // لو مبعتش objectFit سيبه لـ CSS الملف الأصلي
      // نمرر أي transform أو filter جاي من الـ CSS
      pointerEvents: 'none', 
    };

    return (
      <div className={`luxe-media-container ${className || ''}`} style={containerStyle}>
        {!isLoaded && (
          <Skeleton 
            height="100%" 
            baseColor="#E8E1D3" 
            highlightColor="#F4F1EA" 
            containerClassName="skeleton-fix"
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                zIndex: 1,
                borderRadius: 'inherit' // يورث انحناء الحواف من الأب
            }} 
          />
        )}
        
        {type === 'img' ? (
          <img
            ref={ref as React.RefObject<HTMLImageElement>}
            src={src}
            onLoad={() => setIsLoaded(true)}
            {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)} 
            style={mediaStyle}
          />
        ) : (
          <video
            ref={ref as React.RefObject<HTMLVideoElement>}
            src={src}
            onLoadedData={() => setIsLoaded(true)}
            {...(rest as React.VideoHTMLAttributes<HTMLVideoElement>)}
            style={mediaStyle}
          />
        )}
      </div>
    );
  }
);

LuxeMedia.displayName = 'LuxeMedia';

export default LuxeMedia;