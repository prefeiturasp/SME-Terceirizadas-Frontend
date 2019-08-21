import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import { getDiretoriaRegionalPedidosDeInversoes } from "../../../../services/inversaoDeDiaDeCardapio.service";

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

    getDiretoriaRegionalPedidosDeInversoes("sem_filtro").then(response => {
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
