import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer } from './reducers/rootReducer'
import thunk from 'redux-thunk'

const configureStore = () => {
  return createStore (
    rootReducer,
    compose (
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}

export default configureStore