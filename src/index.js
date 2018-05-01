import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './configureStore'
import registerServiceWorker from './registerServiceWorker'

import './index.css'
import './App.css'
import WebFontLoader from 'webfontloader';
WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Noto', 'Roboto Mono', 'Cutive', 'Cutive Mono', 'PT Mono', 'Material Icons'],
  },
})

const store = configureStore()
store.subscribe( () => console.log('New state: ', store.getState() ))
console.log('---------------')

ReactDOM.render (
  <Router>
    <Provider store={store} >
      <App />
    </Provider>
  </Router>,
 document.getElementById('root')
 );

registerServiceWorker();
 