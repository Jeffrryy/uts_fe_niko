import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../../context/shop-contenx';
export const CartItem = (props) => {
    const {id,name,price,productImages} = props.data;
    const {cartItems,addToCart,removeFromCart,updateCartItemCount} = useContext(ShopContext);
  return  (<div className='cartItem'>
    <img src={productImages} />
    <div className='description'>
        <p>
            <b>{name}</b>
        </p>
        <p>
            Rp{price}
        </p>
        <div className='countHandler'>
            <button onClick={() => removeFromCart(id)}>-</button>
            <input  value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value),id)}/>
            <button onClick={() => addToCart(id)}>+</button>
        </div>

    </div>
  </div>

  )
}