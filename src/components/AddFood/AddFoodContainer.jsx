import React, { Component } from 'react';
import AddFood from './AddFood';

class AddFoodContainer extends Component {

  typeFood = [
    {
      label : 'Lanche 4 Horas',
      value : 1
    },
    {
      label : 'Refeição/Sobremesa',
      value : 2
    },
    {
      label : 'Lanche 5/6 Horas',
      value : 3
    }
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
      value : 'Programa Contínuo - Mais Educação'
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
      <AddFood
                {...this.state}
                handleDate={this.handleDate.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
      />
    );
  }
}

export default AddFoodContainer
