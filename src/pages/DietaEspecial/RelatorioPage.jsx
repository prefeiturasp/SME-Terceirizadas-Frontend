import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

import { HOME } from "../../constants/config.constants";
import * as constants from "../../configs/constants";

import Diagnosticos from "../../components/DietaEspecial/Diagnosticos";

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
      diagnosticos: [],
      diagnosticosSelecionados: [""],
      classificacaoDieta: undefined,
      descricaoProtocolo: "",
      files: [],
      showModalAjudaDescricaoProtocolo: false
    };
    this.onSelect = this.onSelect.bind(this);
    this.addOption = this.addOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.setFiles = this.setFiles.bind(this);
    this.onClassificacaoChange = this.onClassificacaoChange.bind(this);
    this.onDescricaoProtocoloChange = this.onDescricaoProtocoloChange.bind(
      this
    );
    this.isDescricaoProtocoloValido = this.onDescricaoProtocoloChange.bind(
      this
    );
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
    this.props.initialize({
      "descricao-protocolo": "",
      "classificacao-dieta": this.state.classificacaoDieta,
      "identificacao-nutricionista": `ELABORADO por ${localStorage.getItem(
        "nome"
      )} - CRN ${localStorage.getItem("crn_numero")}`.replace(/[^\w\s-]/g, "")
    });
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

  removeFile(index) {
    let files = this.state.files;
    files.splice(index, 1);
    this.setState({ files });
  }
  setFiles(files) {
    this.setState({ files: this.state.files.concat(files) });
    this.props.initialize({
      "descricao-protocolo": "",
      "classificacao-dieta": this.state.classificacaoDieta
    });
  }

  onClassificacaoChange(value) {
    this.setState({
      classificacaoDieta: value
    });
  }

  onDescricaoProtocoloChange(event) {
    this.setState({
      descricaoProtocolo: event.target.value
    });
  }

  render() {
    const {
      classificacoesDieta,
      classificacaoDieta,
      descricaoProtocolo,
      dietaEspecial
    } = this.state;
    if (!dietaEspecial) return <div>Carregando...</div>;
    const { escola } = dietaEspecial;
    return (
      <form>
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
        <hr />
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
          <div className="col-8 report-label-value">
            <p>
              Para visualizar o(s) laudo(s) fornecido(s) pelo prescritor, clique
              nos anexo(s).
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
            {/* TODO: não usar state e sim dados do redux-form */}
            <RadioboxGroup
              onChange={this.onClassificacaoChange}
              value={classificacaoDieta}
              name="classificacao-dieta"
              options={classificacoesDieta.map(cd => {
                return {
                  value: cd.id,
                  label: cd.nome
                };
              })}
            />
          </div>
        </div>
        <hr />
        <div className="row title">
          <div className="col-12">
            <p>Protocolo da Dieta Especial</p>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <Field
              component={InputText}
              name="descricao-protocolo"
              placeholder="Digite o nome do protocolo"
              onChange={this.onDescricaoProtocoloChange}
              submitted={descricaoProtocolo === ""}
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
              texto="Anexar Protocolo"
              name="files"
              icone={undefined}
              accept=".doc, .docx, .pdf, .png, .jpg, .jpeg"
              setFiles={this.setFiles}
              removeFile={this.removeFile}
              concatenarNovosArquivos
              nomeNovoArquivo={descricaoProtocolo}
              disabled={this.state.descricaoProtocolo.length < 3}
            />
          </div>
        </div>
        <hr />
        <div className="row title">
          <div className="col-12">
            <p>Identificação do Nutricionista</p>
          </div>
        </div>
        <div className="row">
          <div className="col-9" id="identificacao-nutricionista">
            <Field
              component={InputText}
              name="identificacao-nutricionista"
              disabled
            />
          </div>
        </div>
      </form>
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
