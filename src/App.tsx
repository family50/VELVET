import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// الاستايلات الأساسية
import './index.css';

// المكونات (Components)
import Home from './home'; 
import Header from './header';
import Thats from './thats'; 
import Collections from './collections';  
import Cart from './cart';
import Pieces from './Clothings-pieces';
import SingleProduct from './single-product';
import Payment from './payment';
import ScrollToTop from './scrol';
import Mouse from './mouse'; 
import Loading from './loding';

// الأدوات الجديدة (التحميل المسبق والـ Context)
import { LoadingProvider, useGlobalLoading } from './LoadingContext';
import AssetPreloader from './AssetPreloader';
import { PAGE_ASSETS } from './assetsData';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { setIsLoading, isReady } = useGlobalLoading();
  const [assetsReady, setAssetsReady] = useState<boolean>(false);

  // 1. تحديد الملفات المطلوب تحميلها مسبقاً (الهوم + الملفات العامة)
  const homeAssets = useMemo(() => {
    return [
      ...(PAGE_ASSETS.HOME || []),
      ...(PAGE_ASSETS.GLOBAL || [])
    ];
  }, []);

  // 2. التحكم في إخفاء الهيدر في صفحات معينة
  const isSingleProductPage = location.pathname.startsWith('/product/');
  const isPaymentPage = location.pathname === '/payment';
  const hideHeader = isSingleProductPage || isPaymentPage;

  // 3. الشرط النهائي لعرض الموقع:
  // لازم الأنميشن يخلص (isReady) وكمان الصور تتحمل (assetsReady)
  const canShowSite = isReady && assetsReady;

  return (
    <>
      {/* مشغل التحميل المسبق في الخلفية */}
      <AssetPreloader 
        assets={homeAssets} 
        onComplete={() => setAssetsReady(true)} 
      />

      {/* شاشة اللودينج تظل ظاهرة حتى يتحقق الشرطان */}
      {!canShowSite && (
        <Loading onFinish={() => setIsLoading(false)} />
      )}

      {/* محتوى الموقع - يظهر بـ Fade In بسيط لما يجهز */}
      <div 
        className="app-main-content"
        style={{ 
          opacity: canShowSite ? 1 : 0,
          visibility: canShowSite ? 'visible' : 'hidden',
          transition: 'opacity 1s ease-in-out',
          height: canShowSite ? 'auto' : '100vh',
          overflow: canShowSite ? 'visible' : 'hidden'
        }}
      >
        <ScrollToTop />
        <Mouse />
        {!hideHeader && <Header />}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/That's us" element={<Thats />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pieces/:categoryName" element={<Pieces />} />
          <Route path="/product/:productId" element={<SingleProduct />} /> 
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </Router>
  );
}

export default App;