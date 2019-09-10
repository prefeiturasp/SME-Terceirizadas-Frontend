import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import { getDiretoriaRegionalPedidosAprovados } from "../../../../services/inversaoDeDiaDeCardapio.service";

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
    getDiretoriaRegionalPedidosAprovados().then(response => {
      this.setState({ pedidosAprovados: response.results });
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
