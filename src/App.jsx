import React, { Component } from "react";
import "./App.css";
import MenuChange from "./components/MenuChange";
import Routes from './routes'
import Main from "./components/Main/Main";

class App extends Component {
  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;
