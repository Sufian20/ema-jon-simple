import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [prodcuts, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);

    const handelAddProduct = (product) =>{
       
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div>
            <div className="shop-container">
                <div className="prodcut-container">
                  
                        {
                            prodcuts.map(pd => <Product handelAddProduct={handelAddProduct} product={pd}></Product>)
                        }
                   
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;