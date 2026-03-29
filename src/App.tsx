import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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

// استيراد أدوات التحميل (التي راجعناها)
import Loading from './loding'; 
import AssetPreloader from './dateloding';
import { LoadingProvider, useLoading } from './LoadingProvider';
import { PAGE_ASSETS } from './assetsData';

const AppContent: React.FC = () => {
  const location = useLocation();
  const { isLoading, setIsLoading } = useLoading();

  // تجميع كل الصور والفيديوهات من assetsData لضمان تحميلها في الرامات (Cache)
  const allAssets = Object.values(PAGE_ASSETS).flat();

  // تحديد الصفحات التي يختفي فيها الهيدر
  const isSingleProductPage = location.pathname.startsWith('/product/');
  const isPaymentPage = location.pathname === '/payment';
  const hideHeader = isSingleProductPage || isPaymentPage;

  return (
    <>
      {/* 1. البريلودر: يسحب الداتا فعلياً للرامات ولا يتدخل في الشكل */}
      <AssetPreloader 
        assets={allAssets} 
        minWaitTime={3000} // حد أدنى 3 ثواني لتحميل الأصول تقنياً
        onComplete={() => {
          console.log("Assets are now in RAM");
        }} 
      />

      {/* 2. شاشة اللودينج: تظهر طالما isLoading = true وتختفي عند انتهاء GSAP */}
      {isLoading && (
        <Loading onFinish={() => setIsLoading(false)} />
      )}

      {/* 3. محتوى الموقع: لا يظهر إلا بعد انتهاء isLoading تماماً */}
      <div style={{ 
        visibility: isLoading ? 'hidden' : 'visible',
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.8s ease'
      }}>
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
      {/* تغليف التطبيق بالـ Provider لضمان عمل الـ Context في كل مكان */}
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </Router>
  );
}

export default App;