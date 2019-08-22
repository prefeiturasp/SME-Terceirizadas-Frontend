import React, { Component } from "react";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import {
  getDiretoriaRegionalPedidosAprovados as pedidosAprovadosNormais,
  getDiretoriaRegionalPedidosReprovados as pedidosReprovadosNormais
} from "../../../../services/alteracaoDecardapio.service";
import PainelPedidos from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visaoPorCombo: visaoPorComboSomenteDatas,
      pedidosAprovados: [],
      pedidosReprovados: []
    };
  }

  componentDidMount() {
    let pedidosAprovados = [];
    let pedidosReprovados = [];

    pedidosAprovadosNormais().then(response => {
      pedidosAprovados = response.results;
      this.setState({ pedidosAprovados });
    });

    pedidosReprovadosNormais().then(response => {
      pedidosReprovados = response.results;
      this.setState({ pedidosReprovados });
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
