import React, { Component } from "react";
import "./App.css";
import MenuChange from "./components/TourRequest";
import Router from './routes'
import { MenuChangePage } from "./pages/MenuChangePage";

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
