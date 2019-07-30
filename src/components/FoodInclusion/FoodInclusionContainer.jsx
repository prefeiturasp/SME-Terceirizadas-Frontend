import React, { Component } from "react";
import {
  getMotivosInclusaoContinua,
  getMotivosInclusaoNormal
} from "../../services/foodInclusion.service";
import { getWorkingDays as getDiasUteis } from "../../services/workingDays.service";
import { getPeriods } from "../../services/school.service";
import { formatarPeriodos } from "./helper";
import FoodInclusion from "./FoodInclusion";

class FoodInclusionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enrolled: 300,
      reasons_simple: [],
      reasons_continuous_program: [],
      day: new Date(),
      periodos: [],
      proximos_dois_dias_uteis: null,
      proximos_cinco_dias_uteis: null
    };
  }

  componentDidMount() {
    getMotivosInclusaoContinua().then(response => {
      const reasons_continuous_program = response.results;
      this.setState({
        // periods: resPeriods.content.school_periods,
        reasons_continuous_program
      });
    });

    getMotivosInclusaoNormal().then(response => {
      const reasons_simple = response.results;
      this.setState({
        reasons_simple
      });
    });

    getPeriods().then(response => {
      const periodos = response.results;
      this.setState({
        periodos: formatarPeriodos(periodos)
      });
    });

    getDiasUteis().then(res => {
      const proximos_cinco_dias_uteis = new Date(res.proximos_cinco_dias_uteis);
      const proximos_dois_dias_uteis = new Date(res.proximos_dois_dias_uteis);
      this.setState({
        proximos_dois_dias_uteis,
        proximos_cinco_dias_uteis
      });
    });
  }

  render() {
    return <FoodInclusion {...this.state} />;
  }
}

export default FoodInclusionContainer;
