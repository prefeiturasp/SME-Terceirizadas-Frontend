import React, { Component } from "react";
import { getDiasUteis } from "../../../services/diasUteis.service";
import { dataParaUTC } from "../../../helpers/utilities";
import SolicitacaoDeKitLanche from "./base";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: {},
      proximos_dois_dias_uteis: null,
      proximos_cinco_dias_uteis: null,
      enumKits: null
    };
  }

  componentDidMount() {
    getDiasUteis().then(response => {
      const proximos_cinco_dias_uteis = dataParaUTC(
        new Date(response.proximos_cinco_dias_uteis)
      );
      const proximos_dois_dias_uteis = dataParaUTC(
        new Date(response.proximos_dois_dias_uteis)
      );
      this.setState({
        proximos_dois_dias_uteis,
        proximos_cinco_dias_uteis
      });
    });
  }

  render() {
    return <SolicitacaoDeKitLanche {...this.state} {...this.props} />;
  }
}

export default Container;
