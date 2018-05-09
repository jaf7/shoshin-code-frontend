import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ActionCableProvider } from 'react-actioncable-provider'
import App from './App'
import configureStore from './configureStore'
import registerServiceWorker from './registerServiceWorker'
import { API_WS_ROOT } from './services/api' 

import './index.css'
import './App.css'
import WebFontLoader from 'webfontloader';
WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Noto', 'Roboto Mono', 'Cutive', 'Cutive Mono', 'PT Mono', 'Material Icons'],
  },
})

const store = configureStore()
// store.subscribe( () => console.log('store.getState() --> ', store.getState() ))

ReactDOM.render (
  <ActionCableProvider url={API_WS_ROOT}> 
    <Router>
      <Provider store={store} >
        <App /> 
      </Provider>
    </Router>
  </ActionCableProvider>,
 document.getElementById('root')
 );

registerServiceWorker();
 