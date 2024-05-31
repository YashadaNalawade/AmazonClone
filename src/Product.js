import React from 'react';
import "./Product.css";
import { useStateValue } from './StateProvider';

function Product({title, image, price, rating}) {

    const [{basket},dispatch] = useStateValue();

    const addToBasket = () => {
        // to dispath item into data layer
        // dispatch() is the method used to dispatch actions and trigger state changes to the data layer
        dispatch({
            type:'ADD_TO_BASKET', // defined in reducer
            item:{
                // id:id,
                title:title,
                image:image,
                price:price,
                rating:rating,
            },
        });
    };
  return (
  <div className="product">
      <div className="product__info">
          <p>{title}</p>
          <p className="product__price">
              <small>$</small>
              <strong>{price}</strong>
          </p>
          <div className="product__rating">
              {Array(rating).fill().map((_,i)=>(
                <p>🌟</p>
              ))}  
          </div>
      </div>
      <img src={image} alt="book" />
      <button onClick={addToBasket}>Add to Basket</button>

  </div>
  
  );
}

export default Product;
