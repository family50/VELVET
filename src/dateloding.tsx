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
      
      if (uniqueAssets.length === 0) {
        onComplete && onComplete();
        return;
      }

      const promises = uniqueAssets.map((url) => {
        return new Promise((resolve) => {
          if (url.endsWith('.mp4') || url.endsWith('.webm')) {
            const video = document.createElement('video');
            video.src = url;
            video.preload = 'auto';
            video.oncanplaythrough = () => resolve(true);
            video.onerror = () => resolve(true);
          } else {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          }
        });
      });

      const minTimePromise = new Promise((res) => setTimeout(res, minWaitTime));
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