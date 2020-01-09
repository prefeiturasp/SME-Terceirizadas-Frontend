import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";

import { HOME } from "../../constants/config.constants";
import * as constants from "../../configs/constants";

import DiagnosticosField from "../../components/DietaEspecial/Diagnosticos/Field";

import Botao from "../../components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../components/Shareable/Botao/constants";

import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import InputText from "../../components/Shareable/Input/InputText";
import InputFile from "../../components/Shareable/Input/InputFile";
import RadioboxGroup from "../../components/Shareable/RadioboxGroup";
import { FluxoDeStatus } from "../../components/Shareable/FluxoDeStatus";

import "./style.scss";

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
      diagnosticos: []
    };
    this.removeFile = this.removeFile.bind(this);
    this.setFiles = this.setFiles.bind(this);
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

  removeFile(index) {
    let anexos = this.props.anexos;
    anexos.splice(index, 1);
    this.props.change("anexos", anexos);
  }
  setFiles(files) {
    this.props.change("descricaoProtocolo", "");
    this.props.change("anexos", files);
  }

  render() {
    const { classificacoesDieta, diagnosticos, dietaEspecial } = this.state;
    const { descricaoProtocolo, handleSubmit } = this.props;
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
              {/* TODO: não usar state e sim dados do redux-form */}
              <RadioboxGroup
                //value={classificacaoDieta}
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
          <div className="row">
            <div className="col-9">
              <Field
                component={InputText}
                name="descricaoProtocolo"
                placeholder="Digite o nome do protocolo"
              />
              <div className="alert alert-importante" role="alert">
                <b>IMPORTANTE:</b> Envie um arquivo formato .doc, .docx, .pdf,
                .png, .jpg ou .jpeg, com até 2Mb.
              </div>
            </div>
            <div className="col-3">
              <Field
                component={InputFile}
                className="inputfile"
                name="inputfile"
                texto="Anexar Protocolo"
                icone={undefined}
                accept=".doc, .docx, .pdf, .png, .jpg, .jpeg"
                setFiles={this.setFiles}
                removeFile={this.removeFile}
                concatenarNovosArquivos
                nomeNovoArquivo={descricaoProtocolo}
                disabled={
                  descricaoProtocolo === undefined ||
                  descricaoProtocolo.length < 3
                }
              />
            </div>
          </div>
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
                // disabled={invalid}
                // onClick={handleSubmit(data => this.props.change('acao', 'autoriza'))}
              />
              <Botao
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="float-right"
                texto="Negar"
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
    //diagnosticosSelecionados: [""],
    identificacaoNutricionista: `ELABORADO por ${localStorage.getItem(
      "nome"
    )} - CRN ${localStorage.getItem("crn_numero")}`.replace(/[^\w\s-]/g, "")
  },
  validate: ({ anexos, classificacaoDieta, diagnosticosSelecionados }) => {
    let errors = {};
    if (anexos === undefined || anexos.length === 0) {
      errors.anexos = "Pelo menos um protocolo deve ser anexado";
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
    //console.log('validate.errors', errors)
    return errors;
  }
})(Relatorio);
const selector = formValueSelector("autorizacao-dieta-especial");
RelatorioForm = connect(state => {
  return selector(
    state,
    "acao",
    "anexos",
    "descricaoProtocolo",
    "diagnosticosSelecionados"
  );
})(RelatorioForm);

export default class RelatorioPage extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      showModalConfirmacao: false
    };
  }
  submit(formData) {
    this.setState({
      showModalConfirmacao: true,
      formData
    });
    this.fechaModalConfirmacao = this.fechaModalConfirmacao.bind(this);
    this.atualizaSolicitacao = this.atualizaSolicitacao.bind(this);
  }

  fechaModalConfirmacao() {
    this.setState({ showModalConfirmacao: false });
  }
  atualizaSolicitacao() {
    this.setState({
      showModalConfirmacao: false
    });
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
        <Modal
          show={this.state.showModalConfirmacao}
          onHide={this.fechaModalConfirmacao}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmação</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Essa acão {this.state.acao} a solicitação. Confirma?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.fechaModalConfirmacao}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={this.atualizaSolicitacao}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
        <RelatorioForm onSubmit={this.submit} {...this.props} />
      </Page>
    );
  }
}
