import React, { Component } from 'react';
import { getPeriods } from "../../services/school.service"
import FoodInclusion from './FoodInclusion';

class FoodInclusionContainer extends Component {

  typeFood = [
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
    }
  ]

  typeFoodMulti = [
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
    }
  ]

  reasons = [
    {
      key : 1,
      value : 'Descrição motivos 1',
      label : 'Descrição motivos 1'
    },
    {
      key : 2,
      value : 'Descrição motivos 2',
      label : 'Descrição motivos 2'
    },
    {
      key : 3,
      value : 'Programa Contínuo - Mais Educação',
      label : 'Programa Contínuo - Mais Educação'
    },

  ]

  constructor(props){
    super(props)
    this.state = {
      enrolled : 300,
      reasons : this.reasons,
      day : new Date(),
      typeFood : this.typeFood,
      typeFoodMulti: this.typeFoodMulti,
      periods : []
    }
  }

  componentDidMount(){
    getPeriods('8b0673c4-34bb-4ca5-aaa6-d5ccc9588990').then(res => {
      this.setState({
        ...this.state,
        periods: res.content.school_periods
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
