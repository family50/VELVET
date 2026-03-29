/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react';

interface PreloaderProps {
  assets: string[];
  onComplete?: () => void;
  minWaitTime?: number;
}

const AssetPreloader: React.FC<PreloaderProps> = ({
  assets,
  onComplete,
  minWaitTime = 0
}) => {
  useEffect(() => {
    const preload = async () => {
      const uniqueAssets = Array.from(new Set(assets)).filter(url => !!url);
      
      const promises = uniqueAssets.map((url) => {
        return new Promise((resolve) => {
          if (url.endsWith('.mp4') || url.endsWith('.webm')) {
            // استخدام Fetch لضمان تحميل الفيديو بالكامل في الكاش/الرامات
            fetch(url)
              .then(response => response.blob())
              .then(() => resolve(true))
              .catch(() => resolve(true)); // حتى لو فشل كمل عشان الموقع ميعلقش
          } else {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          }
        });
      });

      const minTimePromise = new Promise((res) => setTimeout(res, minWaitTime));
      
      // لن يتم التنفيذ إلا بعد انتهاء تحميل كل الملفات (بما فيها الفيديوهات) + مرور 3 ثواني
      await Promise.all([...promises, minTimePromise]);

      if (onComplete) {
        onComplete();
      }
    };

    preload();
  }, [assets, onComplete, minWaitTime]);

  return null;
};

export default AssetPreloader;