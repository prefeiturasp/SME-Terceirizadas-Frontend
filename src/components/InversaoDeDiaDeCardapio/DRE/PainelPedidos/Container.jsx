import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants";
import {
  getDiretoriaRegionalPedidosAutorizados,
  getDiretoriaRegionalPedidosReprovados
} from "../../../../services/inversaoDeDiaDeCardapio.service";

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
    let pedidosAutorizados;
    let pedidosReprovados;

    getDiretoriaRegionalPedidosAutorizados().then(response => {
      pedidosAutorizados = response.results;
      this.setState({ pedidosAutorizados });
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
