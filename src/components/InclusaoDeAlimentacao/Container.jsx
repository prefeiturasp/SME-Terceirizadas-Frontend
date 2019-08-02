import React, { Component } from "react";
import {
  getMotivosInclusaoContinua,
  getMotivosInclusaoNormal
} from "../../services/inclusaoDeAlimentacao.service";
import { meusDados } from "../../services/perfil.service";
import { getWorkingDays as getDiasUteis } from "../../services/workingDays.service";
import { getPeriods } from "../../services/school.service";
import { formatarPeriodos } from "./helper";
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
        meusDados
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

    getPeriods().then(response => {
      const periodos = response.results;
      this.setState({
        periodos: formatarPeriodos(periodos)
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
    return <InclusaoDeAlimentacao {...this.state} />;
  }
}

export default Container;
