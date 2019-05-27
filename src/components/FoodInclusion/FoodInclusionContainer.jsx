import React, { Component } from "react";
import { getPeriods } from "../../services/school.service";
import { getReasons } from "../../services/foodInclusion.service";
import { getWorkingDays } from "../../services/workingDays.service";
import FoodInclusion from "./FoodInclusion";

class FoodInclusionContainer extends Component {
  USER_ID = "c6582290-a344-470c-aad9-5630af8be4f9";

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
      user_id: this.USER_ID,
      typeFoodContinuousProgram: this.typeFoodContinuousProgram,
      two_working_days: null,
      five_working_days: null
    };
  }

  componentDidMount() {
    let _two, _five = null;
    getPeriods(this.USER_ID).then(resPeriods => {
      getReasons(this.USER_ID).then(resReasons => {
        this.setState({
          ...this.state,
          periods: resPeriods.content.school_periods,
          reasons_simple: resReasons.content.reasons_simple,
          reasons_continuous_program: resReasons.content.reasons_continuous_program
        });
      });
    });
    getWorkingDays().then(res => {
      _two = res[0].date_two_working_days.split("/");
      _five = res[0].date_five_working_days.split("/");
      this.setState({
        ...this.state,
        two_working_days: new Date(_two[2], _two[1] - 1, _two[0]),
        five_working_days: new Date(_five[2], _five[1] - 1, _five[0])
      });
    });
  }

  render() {
    return <FoodInclusion {...this.state} />;
  }
}

export default FoodInclusionContainer;
