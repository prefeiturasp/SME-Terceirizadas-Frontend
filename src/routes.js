import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import AddFood from './components/AddFood'
import MenuChange from './components/MenuChange'
import Permissions from './components/Permissions/Permissions'
import PermissionsCheckBoxes from './components/Permissions/PermissionsCheckBoxes'
import {MenuChangePage} from './pages/MenuChangePage'

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
      <Route exact path="/login" component={Login} />
      <PrivateRouter exact path="/add-food" component={AddFood} />
      <PrivateRouter exact path="/menu-change" component={MenuChangePage} />
      <PrivateRouter exact path="/permissions-root" component={Permissions} />
      <PrivateRouter exact path="/permissions-root" component={Permissions} />
    </Switch>
  </BrowserRouter>
)

export default Routes;
