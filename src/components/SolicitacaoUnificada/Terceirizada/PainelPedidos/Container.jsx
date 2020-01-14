import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants";
import { getTerceirizadaPedidosAutorizadosKitLancheUnificado } from "../../../../services/solicitacaoUnificada.service";

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
    getTerceirizadaPedidosAutorizadosKitLancheUnificado().then(response => {
      this.setState({ pedidosAutorizados: response.results });
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
