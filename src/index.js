import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import Reducer from './Reducer';
import { loadState } from './Action';
import { createStore } from "redux";

const store = createStore(Reducer);

// Get Redux state from localStorage
const existingStoredData = localStorage.getItem('data');
if (existingStoredData) {
    store.dispatch(loadState(JSON.parse(existingStoredData)));
}

// Save Redux state to localStorage
store.subscribe(() => {
    localStorage.setItem('data', JSON.stringify(store.getState()));
})

ReactDOM.render(
    <Provider store={store}>
    <App /> 
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
