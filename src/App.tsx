import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './home'; 
import Header from './header';
import Thats from './thats'; 
import Collections from './collections';  
import Cart from './cart';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* لاحظ أن المسار يجب أن يطابق ما كتبناه في الـ Header تماماً */}
        <Route path="/That's us" element={<Thats />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;