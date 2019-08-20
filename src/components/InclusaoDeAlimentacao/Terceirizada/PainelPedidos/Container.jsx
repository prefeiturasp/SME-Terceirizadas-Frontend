import React, { Component } from "react";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import {
  getTerceirizadaPedidosAprovados as pedidosAprovadosContinuos,
  getTerceirizadaPedidosReprovados as pedidosReprovadosContinuos
} from "../../../../services/inclusaoDeAlimentacaoContinua.service";
import {
  getTerceirizadaPedidosAprovados as pedidosAprovadosNormais,
  getTerceirizadaPedidosReprovados as pedidosReprovadosNormais
} from "../../../../services/inclusaoDeAlimentacaoAvulsa.service";
import PainelPedidos from ".";

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
    let pedidosAprovadosRetornados = 0;
    let pedidosReprovadosRetornados = 0;
    let pedidosAprovados = [];
    let pedidosReprovados = [];

    pedidosAprovadosContinuos().then(response => {
      pedidosAprovadosRetornados += 1;
      pedidosAprovados = pedidosAprovados.concat(response.results);
      let todosPedidosAprovadosRetornados = pedidosAprovadosRetornados === 2;
      if (todosPedidosAprovadosRetornados) {
        this.setState({ pedidosAprovados });
      }
    });

    pedidosAprovadosNormais().then(response => {
      pedidosAprovadosRetornados += 1;
      pedidosAprovados = pedidosAprovados.concat(response.results);
      let todosPedidosAprovadosRetornados = pedidosAprovadosRetornados === 2;
      if (todosPedidosAprovadosRetornados) {
        this.setState({ pedidosAprovados });
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
