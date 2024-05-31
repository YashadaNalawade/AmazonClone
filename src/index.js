import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}> 
    {/*initial state- what data layer looks like in the beginning, and reducer is how we manipulate the data layer*/}
    {/*We pass in the reducer and initialState to the StateProvider.
Now the State knows what is the initial state and which reducer too.*/}
    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
