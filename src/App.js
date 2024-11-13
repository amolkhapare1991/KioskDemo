import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import { Home } from './pages/home';
import { ProductDescription } from './pages/productDescription';
import { Cart } from './pages/cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="pdp/:productId" element={<ProductDescription/>}/>
          <Route path="cart/:cartId" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
