import React, { Component } from "react";
import { visaoPorComboSomenteDatas } from "../../../../constants";
import {
  getTerceirizadaPedidosAutorizados as pedidosAutorizadosContinuos,
  getTerceirizadaPedidosReprovados as pedidosReprovadosContinuos
} from "../../../../services/inclusaoDeAlimentacaoContinua.service";
import {
  getTerceirizadaPedidosAutorizados as pedidosAutorizadosNormais,
  getTerceirizadaPedidosReprovados as pedidosReprovadosNormais
} from "../../../../services/inclusaoDeAlimentacaoAvulsa.service";
import PainelPedidos from ".";

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
    let pedidosAutorizadosRetornados = 0;
    let pedidosReprovadosRetornados = 0;
    let pedidosAutorizados = [];
    let pedidosReprovados = [];

    pedidosAutorizadosContinuos().then(response => {
      pedidosAutorizadosRetornados += 1;
      pedidosAutorizados = pedidosAutorizados.concat(response.results);
      let todosPedidosAutorizadosRetornados =
        pedidosAutorizadosRetornados === 2;
      if (todosPedidosAutorizadosRetornados) {
        this.setState({ pedidosAutorizados });
      }
    });

    pedidosAutorizadosNormais().then(response => {
      pedidosAutorizadosRetornados += 1;
      pedidosAutorizados = pedidosAutorizados.concat(response.results);
      let todosPedidosAutorizadosRetornados =
        pedidosAutorizadosRetornados === 2;
      if (todosPedidosAutorizadosRetornados) {
        this.setState({ pedidosAutorizados });
      }
    });

    pedidosReprovadosContinuos().then(response => {
      pedidosReprovadosRetornados += 1;
      pedidosReprovados = pedidosReprovados.concat(response.results);
      let todosPedidosReprovadosRetornados = pedidosReprovadosRetornados === 2;
      if (todosPedidosReprovadosRetornados) {
        this.setState({ pedidosReprovados });
      }
    });

    pedidosReprovadosNormais().then(response => {
      pedidosReprovadosRetornados += 1;
      pedidosReprovados = pedidosReprovados.concat(response.results);
      let todosPedidosReprovadosRetornados = pedidosReprovadosRetornados === 2;
      if (todosPedidosReprovadosRetornados) {
        this.setState({ pedidosReprovados });
      }
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
