import React, { Component } from "react";
import "./App.css";
import MenuChange from "./components/AddFood";
import Router from './routes'
import { MenuChangePage } from "./pages/MenuChangePage";

class App extends Component {
  render() {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

export default App;
