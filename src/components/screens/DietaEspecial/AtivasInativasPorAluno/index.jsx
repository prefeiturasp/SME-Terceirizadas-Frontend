import React, { Component } from "react";

import FormFiltros from "./FormFiltros";
import Painel from "./Painel";

import { getDietasAtivasInativasPorAluno } from "../../../../services/dietaEspecial.service";
import { getDiretoriaregionalSimplissima } from "../../../../services/diretoriaRegional.service";
import { getEscolasSimplissimaComDRE } from "../../../../services/escola.service";
import { meusDados } from "../../../../services/perfil.service";

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
    const dadosUsuario = await meusDados();
    let diretoriasRegionais, escolas;
    const formValues = {};
    if (dadosUsuario.tipo_usuario === "escola") {
      let { uuid, nome } = dadosUsuario.vinculo_atual.instituicao;
      escolas = [{ uuid, nome }];
      formValues.escola = uuid;
      const dre = dadosUsuario.vinculo_atual.instituicao.diretoria_regional;
      diretoriasRegionais = [{ uuid: dre.uuid, nome: dre.nome }];
      formValues.dre = dre.uuid;
    } else {
      const resposta2 = await getEscolasSimplissimaComDRE();
      escolas = [{ uuid: "", nome: "Todas" }].concat(resposta2.results);

      if (dadosUsuario.tipo_usuario === "diretoriaregional") {
        const { uuid, nome } = dadosUsuario.vinculo_atual.instituicao;
        diretoriasRegionais = [{ uuid, nome }];
        formValues.dre = uuid;
      } else {
        const resposta = await getDiretoriaregionalSimplissima();
        diretoriasRegionais = [{ uuid: "", nome: "Todas" }].concat(
          resposta.data.results
        );
      }
    }
    const response3 = await getDietasAtivasInativasPorAluno(formValues);

    this.setState({
      dadosDietaPorAluno: response3.data,
      diretoriasRegionais,
      escolas,
      formValues,
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

  render() {
    const { dadosDietaPorAluno, loading, page } = this.state;
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
