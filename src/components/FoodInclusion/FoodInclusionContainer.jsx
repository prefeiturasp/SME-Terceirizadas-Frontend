import React, { Component } from "react";
import { getMotivosInclusaoContinua } from "../../services/foodInclusion.service";
import { getWorkingDays as getDiasUteis } from "../../services/workingDays.service";
import FoodInclusion from "./FoodInclusion";

class FoodInclusionContainer extends Component {
  typeFoodContinuousProgram = [
    {
      label: "Lanche 4 Horas",
      value: "Lanche 4 Horas"
    },
    {
      label: "Refeição/Sobremesa",
      value: "Refeição/Sobremesa"
    },
    {
      label: "Lanche 5/6 Horas",
      value: "Lanche 5/6 Horas"
    },
    {
      label: "Sobremesa",
      value: "Sobremesa"
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      enrolled: 300,
      reasons_simple: [],
      reasons_continuous_program: [],
      day: new Date(),
      periods: [],
      typeFoodContinuousProgram: this.typeFoodContinuousProgram,
      proximos_dois_dias_uteis: null,
      proximos_cinco_dias_uteis: null
    };
  }

  componentDidMount() {
    getMotivosInclusaoContinua().then(reasons_continuous_program => {
      // debugger;
      this.setState({
        // periods: resPeriods.content.school_periods,
        // reasons_simple: resReasons.content.reasons_simple,
        reasons_continuous_program
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
