import React, { Component } from "react";

import FormFiltros from "./FormFiltros";
import Painel from "./Painel";

export default class AtivasInativasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDietasAtivas: 68,
      totalDietasInativas: 25,
      count: 150
    };
  }
  render() {
    return (
      <div>
        <FormFiltros />
        <Painel {...this.state} />
      </div>
    );
  }
}
