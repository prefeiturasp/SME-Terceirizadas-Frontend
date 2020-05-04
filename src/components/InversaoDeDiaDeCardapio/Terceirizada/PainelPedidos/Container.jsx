import React, { Component } from "react";
import { visaoPorComboSomenteDatas } from "../../../../constants/shared";
import PainelPedidos from "../PainelPedidos";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visaoPorCombo: visaoPorComboSomenteDatas,
      pedidosAutorizados: [],
      pedidosReprovados: []
    };
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
