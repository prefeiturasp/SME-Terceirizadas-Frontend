import React, { Component } from 'react';
import FoodSuspension from './FoodSuspension';

class FoodSuspensionContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      enrolled : 300,
      reasons : [
        { key : "Motivo 1" ,value :  "Descrição do motivo 1" },
        { key : "Motivo 2" ,value :  "Descrição do motivo 2" },
        { key : "Motivo 3" ,value :  "Descrição do motivo 3" },
        { key : "Motivo 4" ,value :  "Descrição do motivo 4" },
        { key : "Motivo 5" ,value :  "Descrição do motivo 5" },
        { key : "Motivo 6" ,value :  "Descrição do motivo 6" },
      ],
      dia : new Date()
    }

  }

  handleDate(e){
    // e.preventDefault();
    const dia = this.state.dia
    console.log(dia)
    this.setState({dia : e})
  }

  state = {  }
  render() {
    return (
      <FoodSuspension
                enrolled={this.state.enrolled}
                reasons={this.state.reasons}
                handleDate={this.handleDate.bind(this)}
                day={this.state.dia}
      />
    );
  }
}

export default FoodSuspensionContainer
