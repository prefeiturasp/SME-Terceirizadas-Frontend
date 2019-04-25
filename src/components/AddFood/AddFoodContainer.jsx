import React, { Component } from 'react';
import AddFood from './AddFood';

class AddFoodContainer extends Component {

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

  periods = [
    {
      label: "1º Período - Matutino",
      value: "first_period"
    },
    {
      label: "2º Período - Intermediário",
      value: "second_period"
    },
    {
      label: "3º Período - Vespertino",
      value: "third_period"
    },
    {
      label: "4º Período - Noturno",
      value: "fourth_period"
    },
    {
      label: "Integral",
      value: "integrate"
    }
  ]
  constructor(props){
    super(props)
    this.state = {
      enrolled : 300,
      reasons : this.reasons,
      day : new Date(),
      typeFood : this.typeFood,
      typeFoodMulti: this.typeFoodMulti,
      periods : this.periods
    }

  }

  render() {
    return (
      <AddFood
        {...this.state}
      />
    );
  }
}

export default AddFoodContainer
