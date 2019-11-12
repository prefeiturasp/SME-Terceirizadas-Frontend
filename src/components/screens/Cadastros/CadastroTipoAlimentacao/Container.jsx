import React, { Component } from "react";
import { meusDados } from "../../../../services/perfil.service";
import CadastroTipoAlimentacao from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      tiposUnidadesEscolar: null,
      tiposDeAlimentacao: null,
      periodosEscolares: null
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
    return <CadastroTipoAlimentacao {...this.state} />;
  }
}

export default Container;
