import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import AddFood from './components/AddFood'
import MenuChange from './components/MenuChange'
import Permissions from './components/Permissions/Permissions'
import PermissionsCheckBoxes from './components/Permissions/PermissionsCheckBoxes'

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
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRouter path="/add-food" component={AddFood} />
      <PrivateRouter path="/menu-change" component={MenuChange} />
      <PrivateRouter path="/permissions-root/permissions/:type/:subtype" component={PermissionsCheckBoxes}/>
      <PrivateRouter path="/permissions-root" component={Permissions}/>
    </Switch>
  </BrowserRouter>
)

export default Routes;
