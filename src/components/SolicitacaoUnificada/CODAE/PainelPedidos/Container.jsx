import React, { Component } from "react";
import PainelPedidos from ".";
import { FiltroEnum } from "../../../../constants/filtroEnum";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import { getCODAEPedidosDeInversoes } from "../../../../services/inversaoDeDiaDeCardapio.service";

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
    getCODAEPedidosDeInversoes(FiltroEnum.SEM_FILTRO).then(response => {
      this.setState({ pedidosAprovados: response });
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
