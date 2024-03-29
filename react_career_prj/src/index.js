import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import reportWebVitals from './reportWebVitals';
import './index.css';
import configureStore from './redux/configureStore';

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * Start Project : yarn start
 */
