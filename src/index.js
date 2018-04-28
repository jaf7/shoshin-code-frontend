import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './reducers/rootReducer'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import './App.css'
import WebFontLoader from 'webfontloader';
WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const store = createStore( rootReducer )
store.subscribe( () => console.log('New state: ', store.getState() ))
console.log('---------------')

ReactDOM.render (

  <Provider store={store} >
    <App />
  </Provider>,

 document.getElementById('root')
 );

registerServiceWorker();
