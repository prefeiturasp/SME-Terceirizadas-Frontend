import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import { getPedidosDeKitLancheAprovadosTerceirizada } from "../../../../services/solicitacaoDeKitLanche.service";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visaoPorCombo: visaoPorComboSomenteDatas,
      pedidosAprovados: [],
    };
  }
  
  componentDidMount() {
    let pedidosAprovados = [];

    getPedidosDeKitLancheAprovadosTerceirizada().then(response => {
      pedidosAprovados = response.results
      this.setState({pedidosAprovados})
    })
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
