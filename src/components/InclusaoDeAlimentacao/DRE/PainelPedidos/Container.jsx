import React, { Component } from "react";
import { visaoPorCombo } from "../../../../constants/painelPedidos.constants";
import {
  getDiretoriaRegionalPedidosPrioritarios,
  getDiretoriaRegionalPedidosNoPrazoLimite,
  getDiretoriaRegionalPedidosNoPrazoRegular
} from "../../../../services/inclusaoDeAlimentacaoContinua.service";
import PainelPedidos from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pedidosCarregados: 0,
      pedidosPrioritarios: [],
      pedidosNoPrazoLimite: [],
      pedidosNoPrazoRegular: [],
      visaoPorCombo: visaoPorCombo
    };
  }

  componentDidMount() {
    getDiretoriaRegionalPedidosPrioritarios().then(response => {
      const pedidosPrioritarios = response.results;
      this.setState({
        pedidosPrioritarios,
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });

    getDiretoriaRegionalPedidosNoPrazoLimite().then(response => {
      const pedidosNoPrazoLimite = response.results;
      this.setState({
        pedidosNoPrazoLimite,
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });

    getDiretoriaRegionalPedidosNoPrazoRegular().then(response => {
      const pedidosNoPrazoRegular = response.results;
      this.setState({
        pedidosNoPrazoRegular,
        pedidosCarregados: this.state.pedidosCarregados + 1
      });
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
