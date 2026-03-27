import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';
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

const AppContent: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    // 1. وظيفة إنهاء التحميل
    const handleLoad = () => {
      // نترك اللودر يعمل لمدة 2.5 ثانية على الأقل ليتمكن مستخدم Velvet 
      // من رؤية أنميشن بار التحميل والتاج بالكامل
      timerId = setTimeout(() => {
        setIsLoading(false);
      }, 2500); 
    };

    // 2. التحقق من حالة المستند
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // 3. التنظيف (Cleanup)
    return () => {
      window.removeEventListener('load', handleLoad);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  // تحديد الصفحات التي يختفي فيها الهيدر
  const isSingleProductPage = location.pathname.startsWith('/product/');
  const isPaymentPage = location.pathname === '/payment';
  const hideHeader = isSingleProductPage || isPaymentPage;

  if (isLoading) {
    return <Loading />; // لا داعي لـ div إضافي إذا كان اللودر يغطي الشاشة بالفعل
  }

  return (
    <>
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
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;