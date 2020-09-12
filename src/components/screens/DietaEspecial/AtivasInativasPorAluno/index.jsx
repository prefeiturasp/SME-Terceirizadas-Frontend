import React, { Component } from "react";

import FormFiltros from "./FormFiltros";
import Painel from "./Painel";

import { getDietasAtivasInativasPorAluno } from "../../../../services/dietaEspecial.service";

import { Paginacao } from "../../../Shareable/Paginacao";

export default class AtivasInativasContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dadosDietaPorAluno: undefined,
      diretoriasRegionais: [{ uuid: "", nome: "Carregando..." }],
      escolas: [{ uuid: "", nome: "Carregando..." }],
      loading: true,
      loadingNomeAluno: false,
      page: 1
    };
    this.submit = this.submit.bind(this);
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  componentDidMount = async () => {
    const response3 = await getDietasAtivasInativasPorAluno({});
    this.setState({
      dadosDietaPorAluno: response3.data,
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
    this.setState({
      page
    });
  };

  setLoading = loading => {
    this.setState({ loading });
  };

  render() {
    const { dadosDietaPorAluno, loading, page } = this.state;
    const pagTotal = dadosDietaPorAluno ? dadosDietaPorAluno.count : 0;
    return (
      <div>
        <FormFiltros
          onSubmit={this.submit}
          loading={loading}
          setLoading={this.setLoading}
        />
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <div>
            <Painel
              dadosDietaPorAluno={
                dadosDietaPorAluno ? dadosDietaPorAluno.results : []
              }
            />
            <Paginacao
              total={pagTotal}
              onChange={this.onPaginationChange}
              current={page}
            />
          </div>
        )}
      </div>
    );
  }
}
