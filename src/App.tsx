import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-900 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
