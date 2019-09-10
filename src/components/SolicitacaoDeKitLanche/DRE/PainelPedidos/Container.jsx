import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import { getDiretoriaRegionalPedidosDeKitLancheAprovados, getDiretoriaRegionalPedidosDeKitLancheReprovados } from "../../../../services/solicitacaoDeKitLanche.service";

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

    getDiretoriaRegionalPedidosDeKitLancheAprovados().then(
      response => {
        pedidosAprovados = response.results;
          this.setState({ pedidosAprovados });
      }
    );

    getDiretoriaRegionalPedidosDeKitLancheReprovados().then(
      response => {
        pedidosReprovados = response.results;
          this.setState({ pedidosReprovados });
      }
    );
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
