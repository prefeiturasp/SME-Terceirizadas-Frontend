import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import RoutesConfig from './configs/RoutesConfig'
import NotFoundPage from './pages/NotFoundPage';

const isAuthenticate = () => {
  if (localStorage.getItem('user')) {
    return true
  }
  return false;
}


const PrivateRouter = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      isAuthenticate() ? (
        <Component {...props} />
      ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />

        {RoutesConfig.map((value, key)=>{
          return <PrivateRouter key={key} path={value.path} exact={value.exact} component={value.component} />
        })}
        <Route path="*" component={NotFoundPage} />

    </Switch>
  </BrowserRouter>
)

export default Routes;
