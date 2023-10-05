import React, { useContext } from 'react'
import { ShopContext } from '../../context/shop-contenx';

export const Product = (props) => {
    const {id,name,price,productImages} = props.data;
    const {addToCart, cartItems} = useContext(ShopContext);

    const cartItemAmount = cartItems[id];
  return (
    <div className='product'>
        <img src={productImages}  alt='product'/>
        <div className='description'>
            <p> <b>{name}</b></p>
            <p>Rp{price}</p>
        </div>
        <button className='addToCartBttn' onClick={() => addToCart(id)}>Add To Cart {cartItemAmount > 0 && <>({cartItemAmount})</>  }</button>
    </div>
  )
}

