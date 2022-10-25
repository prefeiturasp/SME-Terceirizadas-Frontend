import { GlobalContext } from "context";
import React, { Component } from "react";
import "./App.css";
import Routes from "./routes";

class App extends Component {
  render() {
    return (
      <GlobalContext>
        <Routes />
      </GlobalContext>
    );
  }
}

export default App;
