import React, { Component } from "react";
import AlteracaoDeCardapio from ".";
import { agregarDefault, dataParaUTC } from "../../helpers/utilities";
import { getMotivosAlteracaoCardapio } from "services/alteracaoDeCardapio";
import { getDiasUteis, getFeriadosAno } from "../../services/diasUteis.service";
import { meusDados } from "../../services/perfil.service";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      motivos: [],
      periodos: [],
      proximos_dois_dias_uteis: null,
      proximos_cinco_dias_uteis: null,
      feriados_ano: null,
    };
  }

  componentDidMount() {
    meusDados().then((response) => {
      this.setState({
        meusDados: response,
        periodos: response.vinculo_atual.instituicao.periodos_escolares,
      });
    });

    getMotivosAlteracaoCardapio().then((response) => {
      this.setState({
        motivos: agregarDefault(response.data.results),
      });
    });

    getDiasUteis().then((response) => {
      const proximos_cinco_dias_uteis = dataParaUTC(
        new Date(response.data.proximos_cinco_dias_uteis)
      );
      const proximos_dois_dias_uteis = dataParaUTC(
        new Date(response.data.proximos_dois_dias_uteis)
      );
      this.setState({
        proximos_dois_dias_uteis,
        proximos_cinco_dias_uteis,
      });
    });

    getFeriadosAno().then((response) => {
      const feriados_ano = response.data.results;
      this.setState({ feriados_ano });
    });
  }

  render() {
    return <AlteracaoDeCardapio {...this.state} />;
  }
}

export default Container;
