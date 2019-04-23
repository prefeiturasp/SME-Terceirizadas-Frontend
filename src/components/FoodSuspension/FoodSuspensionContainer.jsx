import React, { Component } from 'react';
import FoodSuspension from './FoodSuspension';

class FoodSuspensionContainer extends Component {

  typeFood = [
    {
      value : 1,
      label : 'Lanche 4 Horas'
    },
    {
      value : 2,
      label : 'Refeição/Sobremesa'
    },
    {
      value : 3,
      label : 'Lanche 5/6 Horas'
    },
    {
      value : 4,
      label : 'Todos'
    },
  ]

  reasons = [
    {
      value : 1,
      label : 'Descrição motivos 1'
    },
    {
      value : 2,
      label : 'Descrição motivos 2'
    },
    {
      value : 3,
      label : 'Descrição motivos 3'
    },

  ]

  periods = [

    {id : 1, value : "1º Período - Matutino"},
    {id : 2, value :"2º Período - Intermediário"},
    {id : 3, value :"3º Período - Vespertino"},
    {id : 4, value :"4º Período - Noturno"},
    {id : 5, value :"Integral"}

  ]
  constructor(props){
    super(props)
    this.state = {
      enrolled : 300,
      reasons : this.reasons,
      reason: null,
      day : new Date(),
      typeFood : this.typeFood,
      periods : this.periods,
      descripion : null,
      periodsList : []
    }

    this.handleSelectedReason = this.handleSelectedReason.bind(this)
  }


  handleDate(e){
    this.setState({day : e})
  }


  handleDescription(value){

    this.setState({
      descripion : value
    })
  }

  handleSelectedReason(value){

    this.setState({
      reason : value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("Motivo", this.state.reason)
    console.log("Date", this.state.day)
    console.log("Description", this.state.descripion)
    console.log("Periods", this.state.periodsList)
  }



  render() {
    return (
      <FoodSuspension
                {...this.state}
                handleDate={this.handleDate.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleSelectedReason={this.handleSelectedReason}
                handleDescription={this.handleDescription.bind(this)}
      />
    );
  }
}

export default FoodSuspensionContainer
