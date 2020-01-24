import React, { Component } from "react";

import FormFiltros from "./FormFiltros";
import Painel from "./Painel";

import { getDietasAtivasInativasPorAluno } from "../../../../services/dietaEspecial";
import { getDiretoriaregionalSimplissima } from "../../../../services/diretoriaRegional.service";
import { getEscolasSimplissimaComDRE } from "../../../../services/escola.service";

import { Paginacao } from "../../../Shareable/Paginacao";

export default class AtivasInativasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dadosDietaPorAluno: undefined,
      diretoriasRegionais: [{ uuid: "", nome: "Carregando..." }],
      escolas: [{ uuid: "", nome: "Carregando..." }],
      loading: true,
      loadingNomeAluno: false
    };
    this.submit = this.submit.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  componentDidMount = async () => {
    const resposta = await getDiretoriaregionalSimplissima();
    const diretoriasRegionais = [{ uuid: "", nome: "Todas" }].concat(
      resposta.data.results
    );
    const resposta2 = await getEscolasSimplissimaComDRE();
    const escolas = [{ uuid: "", nome: "Todas" }].concat(resposta2.results);
    const response3 = await getDietasAtivasInativasPorAluno();
    this.setState({
      dadosDietaPorAluno: response3.data,
      diretoriasRegionais,
      escolas,
      loading: false
    });
  };

  atualizaDados = async params => {
    this.setState({
      loading: true
    });
    const response = await getDietasAtivasInativasPorAluno(params);
    this.setState({
      dadosDietaPorAluno: response.data,
      loading: false
    });
  };

  submit = async formValues => {
    this.setState({
      formValues
    });
    this.atualizaDados(formValues);
  };

  onPaginationChange = async page => {
    this.atualizaDados({
      page,
      ...this.state.formValues
    });
  };

  render() {
    const { dadosDietaPorAluno, loading } = this.state;
    const pagTotal = dadosDietaPorAluno ? dadosDietaPorAluno.count : 0;
    return (
      <div>
        <FormFiltros onSubmit={this.submit} {...this.state} />
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div>
            <Painel
              dadosDietaPorAluno={
                dadosDietaPorAluno ? dadosDietaPorAluno.results : []
              }
            />
            <Paginacao total={pagTotal} onChange={this.onPaginationChange} />
          </div>
        )}
      </div>
    );
  }
}
