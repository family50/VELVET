import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';
import './index.css';

// استيراد المكونات الأساسية
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

// استيراد أدوات التحميل الاحترافية
import Loading from './loding'; 
import AssetPreloader from './dateloding';
import { LoadingProvider, useLoading } from './LoadingProvider';
import { PAGE_ASSETS } from './assetsData';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { isLoading, setIsLoading } = useLoading();

  // تجميع كافة الأصول لضمان وجودها في الـ RAM Cache (باستخدام نظام Fetch الجديد)
  const allAssets = Object.values(PAGE_ASSETS).flat();

  // منطق إخفاء الهيدر في صفحات معينة
  const isSingleProductPage = location.pathname.startsWith('/product/');
  const isPaymentPage = location.pathname === '/payment';
  const hideHeader = isSingleProductPage || isPaymentPage;

  return (
    <>
      {/* 1. البريلودر: يقوم بعملية الـ Fetch في الخلفية لضمان تحميل الفيديو بالكامل */}
      <AssetPreloader 
        assets={allAssets} 
        minWaitTime={3000} // ضمان بقاء اللودر لمدة 3 ثوانٍ على الأقل للبراندينج
        onComplete={() => {
          console.log("Memory Assets: Ready");
        }} 
      />

      {/* 2. شاشة اللودينج: تظهر طالماisLoading = true */}
      {isLoading && (
        <Loading onFinish={() => setIsLoading(false)} />
      )}

      {/* 3. محتوى الموقع الرئيسي */}
      {/* استخدمنا display: none بدلاً من opacity للحفاظ على خصائص الـ CSS الخاصة بك */}
  
<div 
  className="vlv-main-site-container"
  style={{ 
    // بدل display: isLoading ? 'none' : 'block'
    visibility: isLoading ? 'hidden' : 'visible',
    opacity: isLoading ? 0 : 1,
    height: isLoading ? '100vh' : 'auto', // عشان السكرول ميبقاش طويل وقت اللودينج
    overflow: isLoading ? 'hidden' : 'visible',
    transition: 'opacity 1s ease-in-out'
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