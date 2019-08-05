import React, { Component } from "react";
import { getPeriods } from "../../services/school.service";
import { getReasons } from "../../services/suspensaoDeAlimentacao.service";
import { getWorkingDays } from "../../services/workingDays.service";
import FoodSuspension from "./SuspensaoDeAlimentacao";

class FoodSuspensionContainer extends Component {
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
      two_working_days: null,
      five_working_days: null
    };
  }

  componentDidMount() {
    let _two,
      _five = null;
    getPeriods().then(resPeriods => {
      getReasons().then(resReasons => {
        this.setState({
          ...this.state,
          periods: resPeriods.content.school_periods,
          reasons_simple: resReasons.content.reasons_simple,
          reasons_continuous_program:
            resReasons.content.reasons_continuous_program
        });
      });
    });
    getWorkingDays().then(res => {
      this.setState({
        two_working_days: new Date(res.proximos_dois_dias_uteis),
        five_working_days: new Date(res.proximos_cinco_dias_uteis)
      });
    });
  }

  render() {
    return <FoodSuspension {...this.state} />;
  }
}

export default FoodSuspensionContainer;
