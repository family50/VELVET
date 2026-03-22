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
    // استخدام ReturnType<typeof setTimeout> هو الحل الأمثل في TypeScript
    // ليتوافق مع المتصفح و Node.js بدون مشاكل الـ Namespace
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const hasLoadedInSession = sessionStorage.getItem('regalia_initial_load');
    const startTime: number = Date.now();

    const handleLoad = () => {
      const elapsedTime: number = Date.now() - startTime;
      const minimumDisplayTime: number = 2000;

      sessionStorage.setItem('regalia_initial_load', 'true');

      if (elapsedTime < minimumDisplayTime && !hasLoadedInSession) {
        timerId = setTimeout(() => {
          setIsLoading(false);
        }, minimumDisplayTime - elapsedTime);
      } else {
        setIsLoading((prev) => (prev ? false : prev));
      }
    };

    if (document.readyState === 'complete') {
      if (hasLoadedInSession) {
        // الـ 0ms هنا سحرية لأنها تخرج الـ setState من الـ Render Cycle الحالي
        timerId = setTimeout(() => setIsLoading(false), 0);
      } else {
        timerId = setTimeout(handleLoad, 2000);
      }
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      if (timerId) clearTimeout(timerId);
    };
  }, []);

  const isSingleProductPage: boolean = location.pathname.startsWith('/product/');
  const isPaymentPage: boolean = location.pathname === '/payment';
  const hideHeader: boolean = isSingleProductPage || isPaymentPage;

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <Loading />
      </div>
    );
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