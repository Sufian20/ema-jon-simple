import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
const Product = (props) => {
    
    const {img, name, seller, price, stock, key} = props.product;
    
   
    return (
        <div className="product">  
            <div>
                <img src={img} alt="" />
            </div>
            <div>
               <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
               <br />
               <p><small>by: {seller}</small></p>
               <br />
               <p><small>${price}</small></p>
               <p><small>Only {stock} left in stock -Order soon</small></p>
              { props.ShowAddToCard === true && 
              <div className="main-button">
              <Button  onClick={() => props.handelAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} />    add to cart</Button>
              </div>
              }
           
            </div>
            
        </div>
    );
};

export default Product;