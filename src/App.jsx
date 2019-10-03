import React, { Component } from "react";
import "./App.css";
import { meusDados as getMeusDados } from "./services/perfil.service";
import Routes from "./routes";

class App extends Component {
  async componentDidMount() {
    const meusDados = await getMeusDados();
    if (sessionStorage.getItem("tipo_perfil") !== meusDados.tipo_usuario) {
      sessionStorage.setItem(
        "tipo_perfil",
        JSON.stringify(meusDados.tipo_usuario)
      );
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default App;
