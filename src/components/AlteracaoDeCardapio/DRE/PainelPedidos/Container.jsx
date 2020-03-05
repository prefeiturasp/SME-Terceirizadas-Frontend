import React, { Component } from "react";
import { visaoPorComboSomenteDatas } from "../../../../constants";
import PainelPedidos from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visaoPorCombo: visaoPorComboSomenteDatas
    };
  }

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
