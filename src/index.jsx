import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'startbootstrap-sb-admin-2/css/sb-admin-2.css'

import './styles/sb-admin-2.css';
import './styles/custom.css';
import reducers from './reducers'
// Redux
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

// Middleware
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

// see https://github.com/zalmoxisus/redux-devtools-extension
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()

// foram aplicados 3 middlewares no createstore.
// thunk: para que os actionCreators poderem chamar metodos (ideal para usar promises)
// multi: para retornar uma lista de ações em vez de 1
// promise: para poder usar o componentWillMount no componente

const store = applyMiddleware(thunk, multi, promise)(createStore)(reducers, devTools)

// store é o carinha que recebe todos os estados
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
