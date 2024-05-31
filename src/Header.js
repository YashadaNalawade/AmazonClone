import React from 'react';
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Link} from "react-router-dom";
import { useStateValue } from './StateProvider';
import {auth} from "./firebase"

function Header() {
    const [{basket, user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) { //if user exists
            auth.signOut(); 

        }
    }

  return (
  <div className='header'>
      <Link to ="/">  {/*when u click on amazon logo it'll redirect to home page now*/}
      <img className='header__logo' src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'/>   {/*for amazon logo*/}
      </Link> 
      {/* Link - The primary way to allow users to navigate around your application*/}

      <div className='header__search'>
          <input className="header__searchInput" type="text"></input>  {/*search bar beside it*/}
          <SearchIcon className="header__searchIcon"/>
      </div>

      <div onClick={handleAuthentication} className='header__nav'>
          <Link to={!user && '/login'}> {/* if there's no user only then we push to the login page */}
      <div className='header__option'>
          <span className='header__OptionLineOne'>Hello {!user ? 'Guest ' : user.email}</span>
          <span className='header__OptionLineTwo'>{user ? 'Sign out' : 'Sign in'}</span> {/* conditional statement, if user is present then it'll say sign in else sign out*/}
      </div>
      </Link>

      <div className='header__option'>
      <span className='header__OptionLineOne'>Returns</span>
      <span className='header__OptionLineTwo'>And orders</span>
      </div>

      <div className='header__option'>
      <span className='header__OptionLineOne'>Your</span>
      <span className='header__OptionLineTwo'>Prime</span>
      </div>

      <Link to="/checkout"> {/* when clicked on basket icon, it'll redirect to checkout page*/}
      <div className='header__optionBasket'>
          <ShoppingBasketIcon/>
          <span className='header__optionLineTwo header__basketCount'> {basket?.length}</span> {/*can have 2 different class names and ? cause if it's undefined the result won't be messed up*/}
      </div>   
      </Link>

      </div>
  </div>
  )
}

export default Header;
