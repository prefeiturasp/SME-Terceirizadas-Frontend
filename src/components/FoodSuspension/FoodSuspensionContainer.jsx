import React, { Component } from 'react';
import FoodSuspension from './FoodSuspension';

class FoodSuspensionContainer extends Component {

  typeFood = [
    {
      key : 1,
      value : 'Lanche 4 Horas'
    },
    {
      key : 2,
      value : 'Refeição/Sobremesa'
    },
    {
      key : 1,
      value : 'Lanche 5/6 Horas'
    },
    {
      key : 3,
      value : 'Todos'
    },
  ]

  reasons = [
    {
      key : 1,
      value : 'Descrição motivos 1'
    },
    {
      key : 2,
      value : 'Descrição motivos 2'
    },
    {
      key : 3,
      value : 'Descrição motivos 3'
    },

  ]

  periods = [
    "1º Período - Matutino",
    "2º Período - Intermediário",
    "3º Período - Vespertino",
    "4º Período - Noturno",
    "Integral"
  ]
  constructor(props){
    super(props)
    this.state = {
      enrolled : 300,
      reasons : this.reasons,
      day : new Date(),
      typeFood : this.typeFood,
      periods : this.periods
    }

  }


  handleDate(e){
    this.setState({day : e})
  }

  handleSubmit(e){
    e.preventDefault();

    console.log(e)
  }


  render() {
    return (
      <FoodSuspension
                {...this.state}
                handleDate={this.handleDate.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
      />
    );
  }
}

export default FoodSuspensionContainer
