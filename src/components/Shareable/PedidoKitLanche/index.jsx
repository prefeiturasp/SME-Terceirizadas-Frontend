import React, { Component } from "react";
import { TempoPasseio } from "./TempoPasseio";
import { OpcoesKits } from "./OpcoesKits";

export class PedidoKitLanche extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempoPasseio: ""
    };
    this.onTempoPasseioChanged = this.onTempoPasseioChanged.bind(this);
  }

  onTempoPasseioChanged(event) {
    this.setState({ tempoPasseio: event.target.value });
    this.props.onPasseioChanged && this.props.onPasseioChanged(event);
  }

  render() {
    return (
      <div className="kit-lanche-order">
        <TempoPasseio
          onTempoPasseioChanged={this.onTempoPasseioChanged}
          {...this.props}
        />
        <OpcoesKits {...this.state} {...this.props} />
      </div>
    );
  }
}

export default PedidoKitLanche;
