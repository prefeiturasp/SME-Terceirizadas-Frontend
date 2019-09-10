import React, { Component } from "react";
import { visaoPorComboSomenteDatas } from "../../../../constants/painelPedidos.constants";
import { getTerceirizadaPedidosAprovados} from "../../../../services/inversaoDeDiaDeCardapio.service";
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
    getTerceirizadaPedidosAprovados().then(response => {
      this.setState({ pedidosAprovados: response.results });
    });
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
