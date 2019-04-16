import React, { Component } from "react";
import "./App.css";
import "./components/Shareable/custom.css";
import Routes from "./components/DayChange";

class App extends Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
