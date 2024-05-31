import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from "react-router-dom";

function Subtotal() {
    const history = useHistory();
    const [{basket},dispatch] = useStateValue();
  return(
  <div className='subtotal'>
      <CurrencyFormat
      renderText={(value) => ( //to render the code written inside it
          <>
          <p>
              Subtotal ({basket.length} items) : <strong>{value}</strong>
          </p>
          <small className='subtotal__gift'>
              <input type="checkbox"/>
              This order contains a gift
          </small>
          </>

      )}
      decimalScale={2} //will go to two decimal places, for ex. 233.67
      value={getBasketTotal(basket)} //amount getting passed
      displayType={"text"}
      thousandSeparator={true} //4,33,000
      prefix={"$"} //amount in $
      />
      <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
      </div>
  );
}

export default Subtotal;
