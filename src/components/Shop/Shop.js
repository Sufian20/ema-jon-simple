import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [prodcuts, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCard = getDatabaseCart();
        const productkeys = Object.keys(savedCard);
        const previusCard = productkeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCard[existingKey];
            return product;
        });
        setCart(previusCard);
    }, [])

    const handelAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);


        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }

        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }



    return (
        <div>
            <div className="twin-container">
                <div className="prodcut-container">

                    {
                        prodcuts.map(pd => <Product ShowAddToCard={true} handelAddProduct={handelAddProduct} product={pd} key={pd.key}></Product>)
                    }

                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                    <Link to="/review">
                        <button className="main-button">Review order</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Shop;