import React, { Component } from "react";

import FormFiltros from "./FormFiltros";
import Painel from "./Painel";

import { getDietasAtivasInativasPorAluno } from "../../../../services/dietaEspecial";
import { getDiretoriaregionalSimplissima } from "../../../../services/diretoriaRegional.service";
import { getEscolasSimplissimaComDRE } from "../../../../services/escola.service";

export default class AtivasInativasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDietasAtivas: 68,
      totalDietasInativas: 25,
      dadosDietaPorAluno: [],
      diretoriasRegionais: [{ uuid: "", nome: "Carregando..." }],
      escolas: [{ uuid: "", nome: "Carregando..." }],
      loading: true,
      loadingNomeAluno: false
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount = async () => {
    const resposta = await getDiretoriaregionalSimplissima();
    const diretoriasRegionais = [{ uuid: "", nome: "Selecione..." }].concat(
      resposta.data.results
    );
    const resposta2 = await getEscolasSimplissimaComDRE();
    const escolas = [{ uuid: "", nome: "Selecione..." }].concat(
      resposta2.results
    );
    const response3 = await getDietasAtivasInativasPorAluno();
    this.setState({
      dadosDietaPorAluno: response3.data
    });
    this.setState({ diretoriasRegionais, escolas, loading: false });
  };

  submit = async formValues => {
    const response = await getDietasAtivasInativasPorAluno(formValues);
    this.setState({
      dadosDietaPorAluno: response.data
    });
  };

  render() {
    return (
      <div>
        <FormFiltros onSubmit={this.submit} {...this.state} />
        <Painel {...this.state} />
      </div>
    );
  }
}
