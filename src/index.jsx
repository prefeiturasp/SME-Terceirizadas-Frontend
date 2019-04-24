import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// Redux
import { applyMiddleware, createStore } from "redux";
import multi from "redux-multi";
// Middleware
import promise from "redux-promise";
import thunk from "redux-thunk";
import App from "./App";
import reducers from "./reducers";
import * as serviceWorker from "./serviceWorker";
import "./styles/custom.css";
// import 'bootstrap/dist/css/bootstrap.css';
// import 'startbootstrap-sb-admin-2/css/sb-admin-2.css'
import "./styles/sb-admin-2.css";

// see https://github.com/zalmoxisus/redux-devtools-extension
let devTools = undefined;
if (process.env.NODE_ENV === "development") {
  devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

// foram aplicados 3 middlewares no createstore.
// thunk: para que os actionCreators poderem chamar metodos (ideal para usar promises)
// multi: para retornar uma lista de ações em vez de 1
// promise: para poder usar o componentWillMount no componente

const store = applyMiddleware(thunk, multi, promise)(createStore)(
  reducers,
  devTools
);

// store é o carinha que recebe todos os estados
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 