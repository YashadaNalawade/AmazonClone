import React, { useState, useEffect } from 'react';
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { getBasketTotal } from './reducer';
import CurrencyFormat from "react-currency-format";
import axios from './axios';
import { db } from "./firebase";




//A promise is an object that may produce a single value some time in the future

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();


    const stripe = useStripe();  
    const elements = useElements();

    const[succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error,setError] = useState(null);  //pretty much how we declare variables in react
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect (() => {  //runs when payment component loads or when the dependencies change
        //generate the special stripe secret which allows us to charge a customer

        //whenever basket changes it will make the below request and update the stripe secret

        const getClientSecret = async () => {
            const response = await axios({ // axios is a way to make request, like fetch api thingy
            method : 'post',
            // stripe expects the total in a currencies subunits, if 10$ then 10000 cents
            url : `/payments/create?total=${getBasketTotal(basket)*100}`
        });
        setClientSecret(response.data.clientSecret) //we get a secret back, stripe secret allows us to charge customer the current amount
    }

        getClientSecret(); // that's how u run an async function inside useEffect

    }, [basket]) // <- dependancies

    console.log('the secret is', clientSecret);



    const handleSubmit = async (event) => {
        // some fancy stripe stuff...

        event.preventDefault();
        setProcessing(true);  //will basically stop user from clicking buy now button multiple times, click once, then blocked


        const payload = await stripe.confirmCardPayment(clientSecret, { //2nd arg is an obj
            payment_method : {   // 2nd arg takes an obj as well
                card : elements.getElement(CardElement) // card is which we use, we find the card element with this line of code
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db
            .collection('user') // reach into collection of user
            .doc(user?.uid)// to a user        sequel dtabases data structure
            .collection('orders') // to the orders of the user
            .doc(paymentIntent.id) //created a doc with this id
            .set({                 // and add this information in
                basket : basket,
                amount :paymentIntent.amount,
                created : paymentIntent.created // gives a time stamp for when the order was created
            })




            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
         // The await operator is used to wait for a Promise

    }

    const handleChange = event => {
        // Listen for changes inside CardElement
        // and display any errors as the customer types card details
        setDisabled(event.empty);  // if event is empty, disable the button
        setError(event.error ? event.error.message : "");  // if error, show error, otherwise, show nothing

    }
  
  return <div className='payment'>
      <div className="payment__container">
          <h1>
              Checkout (<Link to = "/checkout">{basket?.length} items
              </Link>)
          </h1>
          {/* delivery address*/}
          <div className="payment__section">
              <div className="payment__title">
                  <h3>Delivery Address</h3>
              </div>
              <div className="payment__address">
                  <p>{user?.email}</p> {/* optional chaining - ? is used in case the user is undefined*/}
                  <p>123 React Lane</p>
                  <p>Los Angeles, California</p>
              </div>
          </div>

          {/* review items*/}
          <div className="payment__section">
          <div className="payment__title">
              <h3>Review items and delivery</h3>
          </div>
          
          <div className="payment__items">
              {basket.map(item => (   // for every item inside basket return checkout component
                  <CheckoutProduct 
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  ></CheckoutProduct>
              ))}
          </div>
          </div>
   
          {/* payment method*/}
          <div className="payment__section">
          <div className="payment__title">
              <h1>Payment Method</h1>
          </div>
          <div className="payment__details">
              {/* stripe stuff */}

              <form onSubmit={handleSubmit}>
                  <CardElement onChange={handleChange}/>

                 <div className="payment__priceContainer">
                     <CurrencyFormat
                     renderText = {(value) => (
                         <h3>Order Total : {value} </h3>
                     )}
                     decimalScale = {2}
                     value={getBasketTotal(basket)} 
                     displayType={"text"}
                     thousandSeparator={true}
                     prefix={"$"}
                     />
                     <button disabled={processing || disabled || succeeded}>
                         <span>{processing ? <p>Processing</p> :
                         "Buy Now"}</span> {/* if it's processing say processing else say buy now */}
                     </button>
                 </div>
                 {error && <div>{error}</div>} {/* if there's an error only then show the error */}
              </form>

          </div>
          </div>
          </div>
      </div>
}

export default Payment;
