import React, { Component } from "react";
import { visaoPorComboSomenteDatas } from "../../../../constants/shared";
import PainelPedidos from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visaoPorCombo: visaoPorComboSomenteDatas,
      filtros: this.props.filtros,
    };
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
