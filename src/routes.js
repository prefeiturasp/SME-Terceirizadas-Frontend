import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import RoutesConfig from "./configs/RoutesConfig";
import ConfirmarEmailPage from "./pages/ConfirmarEmailPage";
import NotFoundPage from "./pages/NotFoundPage";
import RecuperarSenhaPage from "./pages/RecuperarSenhaPage";
import SemPermissaoPage from "./pages/SemPermissaoPage";
import authService from "./services/auth";

const PrivateRouter = ({
  component: Component,
  tipoUsuario: tipoUsuario,
  ...rest
}) => (
  <Route {...rest}>
    {authService.isLoggedIn() ? (
      tipoUsuario ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/403" }} />
      )
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    )}
  </Route>
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      {RoutesConfig.map((value, key) => {
        return (
          <PrivateRouter
            key={key}
            path={value.path}
            exact={value.exact}
            component={value.component}
            tipoUsuario={value.tipoUsuario}
          />
        );
      })}
      <Route path="/confirmar-email">
        <ConfirmarEmailPage />
      </Route>
      <Route path="/recuperar-senha">
        <RecuperarSenhaPage />
      </Route>
      <Route path="/403">
        <SemPermissaoPage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
