import React, { Component } from "react";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import {
  getDiretoriaRegionalPedidosAutorizados as pedidosAutorizadosNormais,
  getDiretoriaRegionalPedidosReprovados as pedidosReprovadosNormais
} from "../../../../services/alteracaoDecardapio.service";
import PainelPedidos from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visaoPorCombo: visaoPorComboSomenteDatas,
      pedidosAutorizados: [],
      pedidosReprovados: []
    };
  }

  componentDidMount() {
    let pedidosAutorizados = [];
    let pedidosReprovados = [];

    pedidosAutorizadosNormais().then(response => {
      pedidosAutorizados = response.results;
      this.setState({ pedidosAutorizados });
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
