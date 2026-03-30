import { useEffect } from 'react';

interface PreloaderProps {
  assets: string[];
  onComplete: () => void;
}

const AssetPreloader: React.FC<PreloaderProps> = ({ assets, onComplete }) => {
  useEffect(() => {
    const loadAssets = async () => {
      const promises = assets.map((url) => {
        return new Promise((resolve) => {
          if (url.endsWith('.mp4') || url.endsWith('.webm')) {
            const video = document.createElement('video');
            video.src = url;
            video.onloadeddata = () => resolve(true);
            video.onerror = () => resolve(true); // كمل حتى لو في خطأ عشان الموقع ميقفش
          } else {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          }
        });
      });

      await Promise.all(promises);
      onComplete();
    };

    loadAssets();
  }, [assets, onComplete]);

  return null;
};

export default AssetPreloader;