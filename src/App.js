import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './page/shop/Shop';
import {Cart} from './page/cart/Cart.jsx';
import { ShopContenxProvider, ShopContext } from './context/shop-contenx';

const App = () => {
  return (
    <div className='app'>
      <ShopContenxProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </Router>
      </ShopContenxProvider>
     

    </div>
  )
}

export default App 