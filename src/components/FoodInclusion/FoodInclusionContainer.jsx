import React, { Component } from 'react';
import { getPeriods } from "../../services/school.service"
import { getReasons } from "../../services/foodInclusion.service";
import FoodInclusion from './FoodInclusion';

class FoodInclusionContainer extends Component {

  typeFoodContinuousProgram = [
    {
      label: 'Selecione',
      value: ''
    },
    {
      label : 'Lanche 4 Horas',
      value : 'Lanche 4 Horas'
    },
    {
      label : 'Refeição/Sobremesa',
      value : 'Refeição/Sobremesa'
    },
    {
      label : 'Lanche 5/6 Horas',
      value : 'Lanche 5/6 Horas'
    },
    {
      label: 'Sobremesa',
      label: 'Sobremesa'
    }
  ]

  constructor(props){
    super(props)
    this.state = {
      enrolled : 300,
      reasons : [],
      day : new Date(),
      periods : [],
      typeFoodContinuousProgram: this.typeFoodContinuousProgram,
    }
  }

  componentDidMount(){
    getPeriods('8b0673c4-34bb-4ca5-aaa6-d5ccc9588990').then(resPeriods => {
      getReasons('8b0673c4-34bb-4ca5-aaa6-d5ccc9588990').then(resReasons => {
        this.setState({
          ...this.state,
          periods: resPeriods.content.school_periods,
          reasons: resReasons.content.reasons
        })
      })
    })

  }

  render() {
    return (
      <FoodInclusion
        {...this.state}
      />
    );
  }
}

export default FoodInclusionContainer
