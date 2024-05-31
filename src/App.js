import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout'; 
import Login from './Login';
import { auth } from "./firebase";
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import Orders from './Orders';

const promise = loadStripe('pk_test_51KOOUvSDjYDA7PyPQ94IbDAhdLs75LWaaJca1wLCozsdmSr70xk3i1NxKcieCQVyhO1ZM0ePh4o7CD3QTmHEchwq00ZkcmQZo0');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('the user is >>>', authUser);

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, [dispatch]); // Adding dispatch to the dependency array

  return (
    <Router>
      <div className="app">
        <Switch> 
          <Route path="/orders">
            <Header/>
            <Orders/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/checkout">
            <Header/>
            <Checkout/> 
          </Route>
          <Route path="/payment"> 
            <Header/> 
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/"> {/* default root at bottom */}
            <Header/> 
            <Home/> 
          </Route>
        </Switch>
      </div>
    </Router> 
  );
}

export default App;
