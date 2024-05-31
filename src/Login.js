import React, { useState} from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from './firebase';

function Login(){

  //When the login button is pressed, the value of the states of textboxes are passed to Firebase to authenticate. Firebase does its magic, and if the authentication is successful returns a promise or throws an error.
  //The useHistory() is a hook from react-router-dom which helps you to redirect user from the actual code.

  const history = useHistory(); //programatically change url
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
 
  const signIn = e =>{
    e.preventDefault(); //no refreshing in react
    auth.signInWithEmailAndPassword(email, password)
    .then(auth =>{      //then comes back with auth object
      history.push('/'); 
    })
    .catch(error => alert(error.message))

    //firebase
  }

  const register = e =>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password) //literally creates a user with email and password
    .then((auth) => { //then comes back with auth object
      // it sucessfully created a new user
      console.log(auth);
      if(auth) //if not empty
      {
        history.push('/') //redirects to homepage
      }

    })
    .catch(error => alert(error.message))


    //firebase
  }


  return (
  <div className='login'>
    <Link to= '/'>
    <img className= "login__logo" src="https://www.versionmuseum.com/images/websites/amazon-website/amazon-website%5E2000%5Eamazon-logo-900.png"></img>
    </Link>

  <div className='login__container'>
    <h1>Sign in</h1>
    <form action="">

      <h5>E-mail</h5>

      <input type="text" value={email} onChange=
      {e => setEmail(e.target.value)}/> {/* what user typed in*/}

      <h5>Password</h5>

      <input type="password" value={password}
      onChange={e => setPassword(e.target.value)}/>

      <button type="submit" onClick={signIn}
       className='login__signInButton'>Sign in</button>

    </form>
    <p>By signing in you agree to Amazon's clone's Conditions of Use and Sale. Please see our Privacy Notice, our Cookies Notice and our Internet Based ads.</p>
    <button onClick={register}
    className='login__registerButton'>Create your Amazon account</button>
  </div>
  </div>
  );
}

export default Login;
