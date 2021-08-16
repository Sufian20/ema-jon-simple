import React from 'react';

const ReviewItem = (props) => {
 
    const {name, quantity, key, price} = props.product;

    const reviwStyle = {
        borderBottom: "1px solid lightgray",
        marginBottom: "5px",
        paddingBottom: "5px",
        marginLeft: "200px"
    }
    return (
        <div style={reviwStyle} className="review-item">
            <h4 style={{color:"blue"}}>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>
                <samall>Pricee: $ {price}</samall>
            </p>
            <button className="main-button" onClick={()=>props.reomoveProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;