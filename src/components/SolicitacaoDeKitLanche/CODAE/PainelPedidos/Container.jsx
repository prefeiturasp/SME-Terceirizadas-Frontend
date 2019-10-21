import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import {
  getCodaePedidosDeKitLancheReprovados,
  getCodaePedidosDeKitLancheAutorizados
} from "../../../../services/solicitacaoDeKitLanche.service";

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
    let pedidosReprovados = [];
    let pedidosAutorizados = [];

    getCodaePedidosDeKitLancheAutorizados().then(response => {
      pedidosAutorizados = response.results;
      this.setState({ pedidosAutorizados });
    });

    getCodaePedidosDeKitLancheReprovados().then(response => {
      pedidosReprovados = response.results;
      this.setState({ pedidosReprovados });
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
