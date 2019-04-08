import React, { Component } from "react";
import "./App.css";
import MenuChange from "./components/AddFood";
import Router from './routes'

class App extends Component {
  render() {
    return (
      <div>
        <MenuChange />
      </div>
    );
  }
}

export default App;
