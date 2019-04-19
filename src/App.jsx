import React, { Component } from "react";
import "./App.css";
import "./components/Shareable/custom.css";
import Routes from "./components/MenuChange";

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
