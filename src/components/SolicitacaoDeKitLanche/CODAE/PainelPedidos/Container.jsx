import React, { Component } from "react";
import PainelPedidos from ".";
import { visaoPorComboSomenteDatas } from "../../../../constants/shared";

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
