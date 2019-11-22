import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import RoutesConfig from "./configs/RoutesConfig";
import ConfirmarEmailPage from "./pages/ConfirmarEmailPage";
import NotFoundPage from "./pages/NotFoundPage";
import RecuperarSenhaPage from "./pages/RecuperarSenhaPage";
import authService from "./services/auth";

const PrivateRouter = (
  { component: Component, ...rest } // eslint-disable-line
) => (
  <Route
    {...rest}
    render={props =>
      authService.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }} // eslint-disable-line
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />

      {RoutesConfig.map((value, key) => {
        return (
          <PrivateRouter
            key={key}
            path={value.path}
            exact={value.exact}
            component={value.component}
          />
        );
      })}
      <Route path="/confirmar-email" component={ConfirmarEmailPage} />
      <Route path="/recuperar-senha" component={RecuperarSenhaPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
