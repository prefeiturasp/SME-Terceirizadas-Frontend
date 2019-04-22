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
