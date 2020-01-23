import React, { Component } from "react";

import FormFiltros from "./FormFiltros";
import Painel from "./Painel";

import { getDietasAtivasInativasPorAluno } from "../../../../services/dietaEspecial";

export default class AtivasInativasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDietasAtivas: 68,
      totalDietasInativas: 25,
      count: 150,
      dadosDietaPorAluno: []
    };
    this.submit = this.submit.bind(this);
  }

  componentWillMount = async () => {
    const response = await getDietasAtivasInativasPorAluno();
    this.setState({
      dadosDietaPorAluno: response.data
    });
  };

  submit = async formValues => {
    const response = await getDietasAtivasInativasPorAluno(formValues);
    this.setState({
      dadosDietaPorAluno: response.data.results
    });
  };

  render() {
    return (
      <div>
        <FormFiltros onSubmit={this.submit} />
        <Painel {...this.state} />
      </div>
    );
  }
}
