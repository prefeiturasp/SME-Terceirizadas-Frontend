import React, { Component } from "react";
import { meusDados } from "../../../../services/perfil.service";
import CadastroHorarioComboAlimentacao from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null
    };
  }

  componentDidMount() {
    meusDados().then(response => {
      this.setState({
        meusDados: response
      });
    });
  }

  render() {
    return <CadastroHorarioComboAlimentacao {...this.state} />;
  }
}

export default Container;
