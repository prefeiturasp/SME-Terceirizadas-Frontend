import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import { getCodaePedidosDeKitLancheReprovados, getCodaePedidosDeKitLancheAprovados } from "../../../../services/solicitacaoDeKitLanche.service";

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
    let pedidosReprovados = [];
    let pedidosAprovados = [];

    getCodaePedidosDeKitLancheAprovados().then(response => {
      pedidosAprovados = response.results
      this.setState({pedidosAprovados})
    })

    getCodaePedidosDeKitLancheReprovados().then(response => {
      pedidosReprovados = response.results
      this.setState({pedidosReprovados})
    })

  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
