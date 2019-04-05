import React, { Component } from "react";
import MenuChange from "./components/MenuChange";
import DayChange from "./components/DayChange";
import "./App.css";
import Routes from "./routes";

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
