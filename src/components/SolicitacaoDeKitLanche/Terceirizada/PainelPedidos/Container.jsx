import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants";
import { getPedidosDeKitLancheAutorizadosTerceirizada } from "../../../../services/solicitacaoDeKitLanche.service";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visaoPorCombo: visaoPorComboSomenteDatas,
      pedidosAutorizados: []
    };
  }

  componentDidMount() {
    let pedidosAutorizados = [];

    getPedidosDeKitLancheAutorizadosTerceirizada().then(response => {
      pedidosAutorizados = response.results;
      this.setState({ pedidosAutorizados });
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
