import React, { Component } from "react";
import { meusDados } from "../../services/perfil.service";
import { getWorkingDays as getDiasUteis } from "../../services/workingDays.service";
import { getRefeicoesApi } from "../../services/solicitacaoDeKitLanche.service";
import { adapterEnumKits } from "./helper";
import SolicitacaoDeKitLanche from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      proximos_dois_dias_uteis: null,
      proximos_cinco_dias_uteis: null,
      enumKits: null
    };
  }

  componentDidMount() {
    meusDados().then(response => {
      const meusDados = response;
      this.setState({
        meusDados
      });
    });

    getRefeicoesApi().then(response => {
      this.setState({
        enumKits: adapterEnumKits(response)
      });
    });

    getDiasUteis().then(response => {
      const proximos_cinco_dias_uteis = new Date(
        response.proximos_cinco_dias_uteis
      );
      const proximos_dois_dias_uteis = new Date(
        response.proximos_dois_dias_uteis
      );
      this.setState({
        proximos_dois_dias_uteis,
        proximos_cinco_dias_uteis
      });
    });
  }

  render() {
    return <SolicitacaoDeKitLanche {...this.state} />;
  }
}

export default Container;
