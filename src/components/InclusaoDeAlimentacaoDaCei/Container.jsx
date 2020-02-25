import React, { Component } from "react";
import { meusDados } from "../../services/perfil.service";
import InclusaoDeAlimentacaoDaCei from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null
    };
  }

  componentDidMount() {
    meusDados().then(response => {
      const meusDados = response;
      this.setState({
        meusDados
      });
    });
  }

  render() {
    return <InclusaoDeAlimentacaoDaCei {...this.state} />;
  }
}

export default Container;
