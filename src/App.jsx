import React, { Component } from "react";
import "./App.css";
import "./components/Shareable/custom.css";
import Routes from "./routes";

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
