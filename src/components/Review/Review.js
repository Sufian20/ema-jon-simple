import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';

const Review = () => {

    const[ cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history  = useHistory();

    const handelProcedCheckout = () => {
       /* 
       setCart([]);
        setOrderPlaced(true);
       processOrder();
       */
      history.push('/shipment');  
    }

    const reomoveProduct = (productKye) => {
        const newCart = cart.filter(pd => pd.key !== productKye);
        setCart(newCart);
        removeFromDatabaseCart(productKye);
    }
    useEffect(()=>{
       const savedCard = getDatabaseCart();
       const productKeys = Object.keys(savedCard);
       const cartProduct = productKeys.map(key => {
           const product = fakeData.find(pd => pd.key === key);
           product.quantity = savedCard[key];
           return product;
       });
       setCart(cartProduct);
    }, [])

    let thankyou;
    if(orderPlaced){
      thankyou =  <img src={happyImage} alt="" />
    }
    return (
        <div className="twin-container"> 
        <Grid container>
          <Grid item xs={10}>
           <div className="prodcut-container">
           {
               cart.map(pd => <ReviewItem
                 product={pd} key={pd.key}
                 reomoveProduct={reomoveProduct}
                 ></ReviewItem>)
           }
           {
               thankyou
           }
           </div>
           </Grid>
           <Grid item xs={2}>
           <div className="card-container">
               <Cart cart={cart}>
                   <button className="main-button" onClick={handelProcedCheckout}>
                      Proced Checkout
                   </button>
               </Cart>
           </div>
           </Grid>
           </Grid>
        </div>
    );
};

export default Review;