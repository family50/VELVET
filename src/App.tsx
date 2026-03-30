import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import { useLayoutEffect } from 'react';
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

  // --- التعديل السحري هنا ---
  useLayoutEffect(() => {
    // لو المسار هو صفحة "That's us"، اطفئ اللودينج فوراً قبل ما المتصفح يرسم أي حاجة
    if (location.pathname === "/That's us") {
      setIsLoading(false);
    }
  }, [location.pathname, setIsLoading]);

  // تجميع كافة الأصول
  const allAssets = Object.values(PAGE_ASSETS).flat();

  // منطق إخفاء الهيدر
  const isSingleProductPage = location.pathname.startsWith('/product/');
  const isPaymentPage = location.pathname === '/payment';
  const hideHeader = isSingleProductPage || isPaymentPage;

  // هل نظهر اللودر؟ 
  // شرط إضافي: لا تظهر اللودر أبداً لو كنا في صفحة That's us
  const showLoadingScreen = isLoading && location.pathname !== "/That's us";

  return (
    <>
      {/* البريلودر يشتغل في الخلفية فقط بدون تعطيل الصفحة لو كنا في That's us */}
      <AssetPreloader 
        assets={allAssets} 
        minWaitTime={location.pathname === "/That's us" ? 0 : 3000} // إلغاء وقت الانتظار للصفحة دي
        onComplete={() => {
          console.log("Memory Assets: Ready");
        }} 
      />

      {/* شاشة اللودينج تظهر فقط لو مش في صفحة That's us */}
      {showLoadingScreen && (
        <Loading onFinish={() => setIsLoading(false)} />
      )}

      <div 
        className="vlv-main-site-container"
        style={{ 
          // لو في صفحة That's us، اجعل كل شيء مرئي فوراً
          visibility: showLoadingScreen ? 'hidden' : 'visible',
          opacity: showLoadingScreen ? 0 : 1,
          height: showLoadingScreen ? '100vh' : 'auto',
          overflow: showLoadingScreen ? 'hidden' : 'visible',
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