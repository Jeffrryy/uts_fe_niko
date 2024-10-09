import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Shop from './page/shop/Shop';
import Order from './page/order/order.jsx'
import Payment from './page/payment/payment.jsx'
import Listmenu from './page/listmenu/listmenu.jsx'
import {Cart} from './page/cart/Cart.jsx';
import { ShopContenxProvider, ShopContext } from './context/shop-contenx';

const App = () => {
  return (
    <div className='app'>
      <ShopContenxProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/order' element={<Order/>}/>
          <Route path='/' element={<Shop/>} />
          <Route path='/cart' element={<Cart/>} />  
          <Route path='/payment' element={<Payment/>} />
          <Route path='/listmenu' element={<Listmenu/>} />
        </Routes>
      </Router>
      </ShopContenxProvider>
     

    </div>
  )
}

export default App 