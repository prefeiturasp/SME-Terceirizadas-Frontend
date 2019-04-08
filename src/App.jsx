import React, { Component } from "react";
import "./App.css";
import MenuChange from "./components/Permissions/Permissions";
import Router from './routes'

class App extends Component {
  render() {
    return (
      <div>
        <Router></Router>
        {/* <MenuChange /> */}
      </div>
    );
  }
}

export default App;
