import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { HOME } from "../../constants/config.constants";
import * as constants from "../../configs/constants";

import DiagnosticosField from "../../components/DietaEspecial/Diagnosticos/Field";
import ProtocolosField from "../../components/DietaEspecial/ProtocolosField";

import Botao from "../../components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../components/Shareable/Botao/constants";

import {
  toastSuccess,
  toastError
} from "../../components/Shareable/Toast/dialogs";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import InputText from "../../components/Shareable/Input/InputText";
import RadioboxGroup from "../../components/Shareable/RadioboxGroup";
import { FluxoDeStatus } from "../../components/Shareable/FluxoDeStatus";

import ModalNegaSolicitacao from "./ModalNegaSolicitacao";

import "./style.scss";

import {
  autorizaSolicitacaoDietaEspecial,
  getAlergiasIntolerancias,
  getClassificacoesDietaEspecial,
  getSolicitacaoDietaEspecial
} from "../../services/painelNutricionista.service";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      diagnosticos: []
    };
  }

  componentDidMount = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      this.props.change("uuid", uuid);
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

  render() {
    const { abreModalNegacao, handleSubmit, invalid } = this.props;
    const { classificacoesDieta, diagnosticos, dietaEspecial } = this.state;
    if (!dietaEspecial) return <div>Carregando...</div>;
    const { escola } = dietaEspecial;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <span className="page-title">{`Inclusão de Alimentação - Solicitação # ${
            dietaEspecial.id_externo
          }`}</span>
          <div className="row">
            <div className="col-2">
              <span className="badge-sme badge-secondary-sme">
                <span className="id-of-solicitation-dre">
                  # {dietaEspecial.id_externo}
                </span>
                <br />{" "}
                <span className="number-of-order-label">ID DO PEDIDO</span>
              </span>
            </div>
            <div className="offset-2 col-8">
              <div className="beside-text mt-auto">
                Informação automática disponibilizada pelo Cadastro da Unidade
                Escolar <br />
              </div>
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
              <p className="value-important">
                {escola.lote && escola.lote.nome}
              </p>
            </div>
            <div className="col-2 report-label-value">
              <p>Tipo de Gestão</p>
              <p className="value-important">
                {escola && escola.tipo_gestao && escola.tipo_gestao.nome}
              </p>
            </div>
            <div className="col-2 report-label-value">
              <p>Telefone</p>
              <p className="value-important">
                {escola && escola.contato && escola.contato.telefone}
              </p>
            </div>
            <div className="col-2 report-label-value">
              <p>E-mail</p>
              <p className="value-important">
                {escola && escola.contato && escola.contato.email}
              </p>
            </div>
          </div>
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
            <div className="col-5 report-label-value">
              <p>Nome Completo do Aluno</p>
              <p className="value">{dietaEspecial.nome_completo_aluno}</p>
            </div>
            <div className="col-4 report-label-value">
              <p>Data de Nascimento</p>
              <p className="value">{dietaEspecial.data_nascimento_aluno}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-8 report-label-value">
              <p>
                Nome do Prescritor da receita (médico, nutricionista,
                fonoaudiólogo)
              </p>
              <p className="value">{dietaEspecial.nome_completo_pescritor}</p>
            </div>
            <div className="col-4 report-label-value">
              <p>Registro Funcional</p>
              <p className="value">
                CRM {dietaEspecial.registro_funcional_pescritor}
              </p>
            </div>
          </div>
          <div className="row title">
            <div className="col-9">
              <p>Laudo</p>
            </div>
            <div className="col-3">
              <p>Anexos</p>
            </div>
          </div>
          <div className="row">
            <div className="col-8 report-label-value">
              <p>
                Para visualizar o(s) laudo(s) fornecido(s) pelo prescritor,
                clique nos anexo(s).
              </p>
            </div>
            <div className="col-4">
              {dietaEspecial.anexos
                .filter(a => a.eh_laudo_medico)
                .map((a, key) => (
                  <a
                    key={key}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={a.arquivo}
                  >
                    {a.nome.split("/").pop()}
                    {key < dietaEspecial.anexos.length - 1 ? <br /> : ""}
                  </a>
                ))}
            </div>
          </div>
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
          <div className="row title">
            <div className="col-12">
              <p>Relação por Diagnóstico</p>
            </div>
          </div>
          <Field
            component={DiagnosticosField}
            name="diagnosticosSelecionados"
            diagnosticos={diagnosticos}
            required
          />
          <div className="row title">
            <div className="col-12">
              <p>Classificação da Dieta</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <RadioboxGroup
                name="classificacaoDieta"
                required
                options={classificacoesDieta.map(cd => {
                  return {
                    value: cd.id.toString(),
                    label: cd.nome
                  };
                })}
              />
            </div>
          </div>
          <div className="row title">
            <div className="col-12">
              <p>Protocolo da Dieta Especial</p>
            </div>
          </div>
          <Field component={ProtocolosField} name="protocolos" required />
          <div className="row title">
            <div className="col-12">
              <p>Identificação do Nutricionista</p>
            </div>
          </div>
          <div className="row">
            <div className="col-9" id="identificacaoNutricionista">
              <Field
                component={InputText}
                name="identificacaoNutricionista"
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Botao
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right"
                texto="Autorizar"
                type={BUTTON_TYPE.SUBMIT}
                disabled={invalid}
              />
              <Botao
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right"
                texto="Negar"
                onClick={abreModalNegacao}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
let RelatorioForm = reduxForm({
  form: "autorizacao-dieta-especial",
  enableReinitialize: true,
  initialValues: {
    identificacaoNutricionista: `Elaborado por ${localStorage.getItem(
      "nome"
    )} - CRN ${localStorage.getItem("crn_numero")}`.replace(/[^\w\s-]/g, "")
  },
  validate: ({ protocolos, classificacaoDieta, diagnosticosSelecionados }) => {
    let errors = {};
    if (protocolos === undefined || protocolos.length === 0) {
      errors.protocolos = "Por favor anexe o protocolo da dieta.";
    }
    if (
      diagnosticosSelecionados === undefined ||
      diagnosticosSelecionados === "" ||
      (diagnosticosSelecionados.length === 1 &&
        diagnosticosSelecionados[0] === "")
    ) {
      errors.diagnosticosSelecionados =
        "Pelo menos um diagnóstico deve ser adicionado";
    }
    if (classificacaoDieta === undefined) {
      errors.classificacaoDieta = "Selecione a classificação da dieta";
    }
    return errors;
  }
})(Relatorio);

export default class RelatorioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModalNegacao: false
    };
    this.submit = this.submit.bind(this);
    this.abreModalNegacao = this.abreModalNegacao.bind(this);
    this.fechaModalNegacao = this.fechaModalNegacao.bind(this);
  }

  submit = async formData => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const {
      classificacaoDieta,
      diagnosticosSelecionados,
      identificacaoNutricionista,
      protocolos
    } = formData;
    let diagnosticos = diagnosticosSelecionados.filter(d => d !== "");
    const resposta = await autorizaSolicitacaoDietaEspecial({
      uuid,
      classificacaoDieta,
      diagnosticosSelecionados: diagnosticos,
      identificacaoNutricionista,
      protocolos
    });
    if (resposta.status === 200) {
      toastSuccess(resposta.data.mensagem);
    } else {
      toastError(`Erro ao autorizar solicitação: ${resposta}`);
    }
  };

  abreModalNegacao() {
    this.setState({ showModalNegacao: true });
  }
  fechaModalNegacao() {
    this.setState({ showModalNegacao: false });
  }

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
        <ModalNegaSolicitacao
          show={this.state.showModalNegacao}
          onClose={this.fechaModalNegacao}
        />
        <RelatorioForm
          onSubmit={this.submit}
          abreModalNegacao={this.abreModalNegacao}
          {...this.props}
        />
      </Page>
    );
  }
}
