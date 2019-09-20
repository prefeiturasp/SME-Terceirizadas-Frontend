import React, { Component } from "react";
import { TempoPasseio } from "./TempoPasseio";
import { OpcoesKits } from "./OpcoesKits";

export class PedidoKitLanche extends Component {
  render() {
    return (
      <div className="kit-lanche-order">
        <TempoPasseio {...this.props} />
        <OpcoesKits {...this.props} />
      </div>
    );
  }
}

export default PedidoKitLanche;
