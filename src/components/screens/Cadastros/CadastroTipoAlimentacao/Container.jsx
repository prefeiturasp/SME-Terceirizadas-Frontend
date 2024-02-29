import React, { Component } from "react";
import { meusDados } from "../../../../services/perfil.service";
import { getTiposUnidadeEscolar } from "../../../../services/cadastroTipoAlimentacao.service";
import CadastroTipoAlimentacao from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      tiposUnidadesEscolar: null,
      tiposDeAlimentacao: null,
      periodosEscolares: null,
    };
  }

  componentDidMount() {
    meusDados().then((response) => {
      this.setState({
        meusDados: response,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tiposUnidadesEscolar === this.state.tiposUnidadesEscolar) {
      getTiposUnidadeEscolar().then((response) => {
        const tiposUnidadesEscolar = response.data.results;
        this.setState({ tiposUnidadesEscolar });
      });
    }
  }

  render() {
    return (
      <CadastroTipoAlimentacao
        meusDados={this.state.meusDados}
        tiposUnidadesEscolar={this.state.tiposUnidadesEscolar}
      />
    );
  }
}

export default Container;
