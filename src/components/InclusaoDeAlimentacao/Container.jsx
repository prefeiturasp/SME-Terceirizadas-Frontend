import React, { Component } from "react";
import { getMotivosInclusaoNormal } from "../../services/inclusaoDeAlimentacaoAvulsa.service";
import { getMotivosInclusaoContinua } from "../../services/inclusaoDeAlimentacaoContinua.service";
import { meusDados } from "../../services/perfil.service";
import { getDiasUteis } from "../../services/diasUteis.service";
import { formatarPeriodos } from "./helper";
import { dataParaUTC } from "../../helpers/utilities";
import InclusaoDeAlimentacao from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      motivos_simples: [],
      motivos_continuos: [],
      periodos: [],
      proximos_dois_dias_uteis: null,
      proximos_cinco_dias_uteis: null
    };
  }

  componentDidMount() {
    meusDados().then(response => {
      const meusDados = response;
      this.setState({
        meusDados,
        periodos: formatarPeriodos(response.escolas[0].periodos_escolares)
      });
    });

    getMotivosInclusaoContinua().then(response => {
      const motivos_continuos = response.results;
      this.setState({
        motivos_continuos
      });
    });

    getMotivosInclusaoNormal().then(response => {
      const motivos_simples = response.results;
      this.setState({
        motivos_simples
      });
    });

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
    return <InclusaoDeAlimentacao {...this.state} />;
  }
}

export default Container;
