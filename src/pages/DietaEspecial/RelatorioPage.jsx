import React, { Component } from "react";
import { reduxForm } from "redux-form";

import { HOME } from "../../constants/config.constants";
import * as constants from "../../configs/constants";

import Diagnosticos from "../../components/DietaEspecial/Diagnosticos";

import Botao from "../../components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../components/Shareable/Botao/constants";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { FluxoDeStatus } from "../../components/Shareable/FluxoDeStatus";

import {
  getAlergiasIntolerancias,
  getSolicitacaoDietaEspecial
} from "../../services/painelNutricionista.service";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      diagnosticos: [],
      diagnosticosSelecionados: [""]
    };
    this.abrirLaudo = this.abrirLaudo.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.addOption = this.addOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
  }

  componentDidMount = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      const alergiasIntolerancias = await getAlergiasIntolerancias();
      const dietaEspecial = await getSolicitacaoDietaEspecial(uuid);
      this.setState({
        diagnosticos: alergiasIntolerancias,
        dietaEspecial: dietaEspecial.results,
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

  abrirLaudo() {
    const { dietaEspecial } = this.state;
    const win = window.open(dietaEspecial.anexos[0].arquivo, "_blank");
    if (win !== null) {
      win.focus();
    }
  }

  render() {
    const { dietaEspecial } = this.state;
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
          <div className="col-12">
            <p>Laudo Médico</p>
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
            <Botao
              texto="Visualizar Anexo"
              icon={BUTTON_ICON.ATTACH}
              onClick={() => this.abrirLaudo()}
              disabled={dietaEspecial.anexos.length === 0}
              style={BUTTON_STYLE.BLUE_OUTLINE}
            />
            {dietaEspecial.anexos.length > 0 ? (
              <p>{dietaEspecial.anexos[0].nome}</p>
            ) : (
              ""
            )}
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
