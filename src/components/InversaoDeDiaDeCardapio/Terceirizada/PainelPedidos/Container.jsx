import React, { Component } from "react";
import { FiltroEnum } from "../../../../constants/filtroEnum";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import { getTerceirizadaPedidosDeInversoes } from "../../../../services/inversaoDeDiaDeCardapio.service";
import PainelPedidos from "../PainelPedidos";

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
    let pedidosAprovados = [];

    getTerceirizadaPedidosDeInversoes(FiltroEnum.SEM_FILTRO).then(response => {
      pedidosAprovadosRetornados += 1;
      pedidosAprovados = pedidosAprovados.concat(response.results);
      let todosPedidosAprovadosRetornados = pedidosAprovadosRetornados === 4;
      if (todosPedidosAprovadosRetornados) {
        this.setState({ pedidosAprovados, pedidosCarregados: true });
      }
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
