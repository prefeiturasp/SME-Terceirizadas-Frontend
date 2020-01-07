import React, { Component } from "react";
import { reduxForm } from "redux-form";

import { HOME } from "../../constants/config.constants";
import * as constants from "../../configs/constants";

import Diagnosticos from "../../components/DietaEspecial/Diagnosticos";

import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import RadioboxGroup from "../../components/Shareable/RadioboxGroup";
import { FluxoDeStatus } from "../../components/Shareable/FluxoDeStatus";

import {
  getAlergiasIntolerancias,
  getClassificacoesDietaEspecial,
  getSolicitacaoDietaEspecial
} from "../../services/painelNutricionista.service";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      diagnosticos: [],
      diagnosticosSelecionados: [""],
      classificacaoDieta: undefined
    };
    this.onSelect = this.onSelect.bind(this);
    this.addOption = this.addOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
    this.onClassificacaoChange = this.onClassificacaoChange.bind(this);
  }

  componentDidMount = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      const alergiasIntolerancias = await getAlergiasIntolerancias();
      const dietaEspecial = await getSolicitacaoDietaEspecial(uuid);
      const classificacoesDieta = await getClassificacoesDietaEspecial();
      this.setState({
        diagnosticos: alergiasIntolerancias.results,
        dietaEspecial: dietaEspecial.results,
        classificacoesDieta: classificacoesDieta.results,
        uuid
      });
    }
  };

  onSelect(index, value) {
    this.setState({
      diagnosticosSelecionados: this.state.diagnosticosSelecionados.map(
        (mapValue, mapIndex) =>
          mapIndex === index ? parseInt(value) : mapValue
      )
    });
  }
  addOption() {
    this.setState({
      diagnosticosSelecionados: this.state.diagnosticosSelecionados.concat("")
    });
  }
  removeOption(index) {
    const diagnosticosSelecionados =
      this.state.diagnosticosSelecionados.length === 1
        ? [""]
        : this.state.diagnosticosSelecionados.filter((v, i) => i !== index);
    this.setState({ diagnosticosSelecionados });
  }

  onClassificacaoChange(value) {
    this.setState({
      classificacaoDieta: value
    });
  }

  render() {
    const {
      dietaEspecial,
      classificacoesDieta,
      classificacaoDieta
    } = this.state;
    if (!dietaEspecial) return <div>Carregando...</div>;
    const { escola } = dietaEspecial;
    return (
      <div>
        <span className="page-title">{`Inclusão de Alimentação - Solicitação # ${
          dietaEspecial.id_externo
        }`}</span>
        <div className="row">
          <div className="col-2">
            <span className="badge-sme badge-secondary-sme">
              <span className="id-of-solicitation-dre">
                # {dietaEspecial.id_externo}
              </span>
              <br /> <span className="number-of-order-label">ID DO PEDIDO</span>
            </span>
          </div>
          <div className="offset-2 col-8">
            <span className="requester">Escola Solicitante</span>
            <br />
            <span className="dre-name">{escola && escola.nome}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-2 report-label-value">
            <p>DRE</p>
            <p className="value-important">
              {escola &&
                escola.diretoria_regional &&
                escola.diretoria_regional.nome}
            </p>
          </div>
          <div className="col-2 report-label-value">
            <p>Lote</p>
            <p className="value-important">{escola.lote && escola.lote.nome}</p>
          </div>
          <div className="col-2 report-label-value">
            <p>Tipo de Gestão</p>
            <p className="value-important">
              {escola && escola.tipo_gestao && escola.tipo_gestao.nome}
            </p>
          </div>
        </div>
        {/* TODO: Falta telefone e e-mail */}
        <hr />
        {dietaEspecial.logs && (
          <div className="row">
            <FluxoDeStatus
              listaDeStatus={dietaEspecial.logs}
              tipoDeFluxo="dietaEspecialPartindoEscola"
            />
          </div>
        )}
        <hr />
        <div className="row">
          <div className="report-students-div col-3">
            <span>Nº de alunos matriculados total</span>
            <span>{escola.quantidade_alunos}</span>
          </div>
          {/* TODO: Falta quantidade de alunos em cada período */}
        </div>
        <hr />
        <div className="row title">
          <div className="col-12">
            <p>Descrição da Solicitação</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3 report-label-value">
            <p>Cód. EOL do Aluno</p>
            <p className="value">{dietaEspecial.codigo_eol_aluno}</p>
          </div>
          <div className="col-6 report-label-value">
            <p>Nome Completo do Aluno</p>
            <p className="value">{dietaEspecial.nome_completo_aluno}</p>
          </div>
          <div className="col-3 report-label-value">
            <p>Data de Nascimento do Aluno</p>
            <p className="value">{dietaEspecial.data_nascimento_aluno}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-8 report-label-value">
            <p>
              Nome do Prescritor da receita (médico, nutricionista,
              fonoaudiólogo)
            </p>
            {/* TODO: Incluir nome do prescritor */}
            <p className="value" />
          </div>
          <div className="col-4 report-label-value">
            <p>Registro Funcional (CRM/CRN/CRFa)</p>
            <p className="value">
              {dietaEspecial.registro_funcional_pescritor}
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 report-label-value">
            <p>
              CID-10 (Classificação Internacional de Doenças e Problemas
              Relacionados à Saúde)
            </p>
            {/* TODO: Incluir Denominação CID */}
            <p className="value" />
          </div>
        </div>
        <hr />
        <div className="row title">
          <div className="col-9">
            <p>Laudo</p>
          </div>
          <div className="col-3">
            <p>Anexos</p>
          </div>
        </div>
        <div className="row">
          <div className="col-9 report-label-value">
            <p>
              O laudo fornecido pelo médico deve ter sido emitido há, no máximo,
              3 meses.
            </p>
          </div>
          <div className="col-3">
            {dietaEspecial.anexos.map((a, key) => (
              <a
                key={key}
                target="_blank"
                rel="noopener noreferrer"
                href={a.arquivo}
              >
                {a.nome}
              </a>
            ))}
          </div>
        </div>
        <hr />
        <div className="row title">
          <div className="col-12">
            <p>Observações</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 report-label-value">
            <p
              className="value"
              dangerouslySetInnerHTML={{
                __html: dietaEspecial.observacoes
              }}
            />
          </div>
        </div>
        <hr />
        <div className="row title">
          <div className="col-12">
            <p>Relação por Diagnóstico</p>
          </div>
        </div>
        <Diagnosticos
          diagnosticos={this.state.diagnosticos}
          selecionados={this.state.diagnosticosSelecionados}
          addOption={this.addOption}
          removeOption={this.removeOption}
          onSelect={this.onSelect}
        />
        <hr />
        <div className="row title">
          <div className="col-12">
            <p>Classificação da Dieta</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <RadioboxGroup
              onChange={this.onClassificacaoChange}
              value={classificacaoDieta}
              options={classificacoesDieta.map(cd => {
                return {
                  value: cd.id,
                  label: cd.nome
                };
              })}
            />
          </div>
        </div>
      </div>
    );
  }
}

const RelatorioForm = reduxForm({
  form: "painelPedidos",
  enableReinitialize: true
})(Relatorio);

export default class RelatorioPage extends Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatório"
    };
    const anteriores = [
      {
        href: `/${constants.RELATORIOS}`,
        titulo: "Dietas Especiais"
      }
    ];

    return (
      <Page>
        <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
        <RelatorioForm {...this.props} />
      </Page>
    );
  }
}
