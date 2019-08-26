import React, { Component } from "react";

import PainelPedidos from "../PainelPedidos";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <PainelPedidos {...this.state} />;
  }
}

export default Container;
