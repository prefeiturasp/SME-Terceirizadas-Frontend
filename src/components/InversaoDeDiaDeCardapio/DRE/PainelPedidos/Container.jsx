import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import { getDiretoriaRegionalPedidosAprovados, getDiretoriaRegionalPedidosReprovados } from "../../../../services/inversaoDeDiaDeCardapio.service";

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
    let pedidosAprovados;
    let pedidosReprovados;

    getDiretoriaRegionalPedidosAprovados().then(response => {
      pedidosAprovados = response.results;
      this.setState({ pedidosAprovados });
    });

    getDiretoriaRegionalPedidosReprovados().then(response => {
      pedidosReprovados = response.results;
      this.setState({ pedidosReprovados });
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
