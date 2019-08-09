import React, { Component } from "react";
import { getMotivosSuspensaoCardapio } from "../../services/suspensaoDeAlimentacao.service";
import { meusDados } from "../../services/perfil.service";
import { getWorkingDays as getDiasUteis } from "../../services/workingDays.service";
import { getPeriods } from "../../services/escola.service";
import { agregarDefault, dataParaUTC } from "../../helpers/utilities";
import SuspensaoDeAlimentacao from ".";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meusDados: null,
      motivos: [],
      periodos: [],
      proximos_dois_dias_uteis: null,
      proximos_cinco_dias_uteis: null
    };
  }

  componentDidMount() {
    meusDados().then(response => {
      this.setState({
        meusDados: response
      });
    });

    getPeriods().then(response => {
      this.setState({
        periodos: response.results
      });
    });

    getMotivosSuspensaoCardapio().then(response => {
      this.setState({
        motivos: agregarDefault(response.results)
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
    return <SuspensaoDeAlimentacao {...this.state} />;
  }
}

export default Container;
