import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";

import {
  atualizaDietaEspecial,
  CODAEAutorizaDietaEspecial,
  getAlergiasIntolerancias,
  getAlimentos,
  getClassificacoesDietaEspecial,
  getDietasEspeciaisVigentesDeUmAluno,
  getProtocolosDietaEspecial
} from "../../../../../../services/dietaEspecial.service";
import { getNomeProdutosHomologados } from "services/produto.service";
import { SelectWithHideOptions } from "components/Shareable/SelectWithHideOptions";

import { required } from "../../../../../../helpers/fieldValidators";
import { obtemIdentificacaoNutricionista } from "../../../../../../helpers/utilities";

import Botao from "../../../../../Shareable/Botao";
import InputText from "../../../../../Shareable/Input/InputText";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../../Shareable/Botao/constants";
import CKEditorField from "../../../../../Shareable/CKEditorField";
import {
  toastSuccess,
  toastError
} from "../../../../../Shareable/Toast/dialogs";

import { formatarSolicitacoesVigentes } from "../../../Escola/helper";

import DiagnosticosField from "./componentes/Diagnosticos/Field";
import ClassificacaoDaDieta from "./componentes/ClassificacaoDaDieta";
import SubstituicoesField from "./componentes/SubstituicoesField";
import DataOpcional from "./componentes/DataOpcional";
import ModalAutorizaDietaEspecial from "./componentes/ModalAutorizaDietaEspecial";
import ModalNegaDietaEspecial from "../ModalNegaDietaEspecial";
import ModalAdicionaProtocolo from "./componentes/ModalAdicionaProtocolo";
import ModalSolicitacaoCadastroProduto from "./componentes/ModalSolicitacaoCadastroProduto";

export default class FormAutorizaDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagnosticos: null,
      classificacoesDieta: null,
      alimentos: [],
      protocolosDietaEspecial: [],
      produtos: [],
      exibirModalAdicionaProtocoloDieta: false,
      showModalAdicionaProtocolo: false,
      showModalSolicitacaoCadastroProduto: false
    };
  }

  componentDidMount = async () => {
    const { aluno, uuid } = this.props.dietaEspecial;
    const alergiasIntolerancias = await getAlergiasIntolerancias();
    const alimentos = await getAlimentos();
    const produtos = await getNomeProdutosHomologados();
    const protocolosDietaEspecial = await getProtocolosDietaEspecial();
    const classificacoesDieta = await getClassificacoesDietaEspecial();
    const solicitacoesVigentes = await getDietasEspeciaisVigentesDeUmAluno(
      aluno.codigo_eol
    );
    this.setState({
      protocolosDietaEspecial: protocolosDietaEspecial.data.results.map(
        ({ nome }) => nome
      ),
      diagnosticos: alergiasIntolerancias.results,
      classificacoesDieta: classificacoesDieta.results,
      alimentos: alimentos.data,
      produtos: produtos.data.results,
      solicitacoesVigentes: formatarSolicitacoesVigentes(
        solicitacoesVigentes.data.results.filter(
          solicitacaoVigente => solicitacaoVigente.uuid !== uuid
        )
      )
    });
  };

  showModalAdicionaProtocolo = () => {
    this.setState({ showModalAdicionaProtocolo: true });
  };

  closeModalAdicionaProtocolo = () => {
    this.setState({ showModalAdicionaProtocolo: false });
  };

  showModalSolicitacaoCadastroProduto = () => {
    this.setState({ showModalSolicitacaoCadastroProduto: true });
  };

  closeModalSolicitacaoCadastroProduto = () => {
    this.setState({ showModalSolicitacaoCadastroProduto: false });
  };

  atualizaProtocolos = async () => {
    const protocolosDietaEspecial = await getProtocolosDietaEspecial();
    this.setState({
      protocolosDietaEspecial: protocolosDietaEspecial.data.results.map(
        ({ nome }) => nome
      )
    });
  };

  showNaoAprovaModal = () => {
    this.setState({ showNaoAprovaModal: true });
  };

  showAutorizarModal = () => {
    this.setState({ showAutorizarModal: true });
  };

  closeNaoAprovaModal = () => {
    this.setState({ showNaoAprovaModal: false });
  };

  closeAutorizarModal = () => {
    this.setState({ showAutorizarModal: false });
  };
  getInitialValuesSubstituicoes(substituicoes) {
    return substituicoes && substituicoes.length > 0
      ? substituicoes.map(substituicao => {
          return {
            alimento: substituicao.alimento
              ? substituicao.alimento.id
              : undefined,
            tipo: substituicao.tipo === "" ? undefined : substituicao.tipo,
            substitutos: substituicao.substitutos
              ? substituicao.substitutos.map(substituto => substituto.uuid)
              : undefined
          };
        })
      : [{}];
  }
  getInitialValues() {
    const {
      alergias_intolerancias,
      classificacao,
      data_termino,
      informacoes_adicionais,
      substituicoes
    } = this.props.dietaEspecial;
    let { nome_protocolo } = this.props.dietaEspecial;
    nome_protocolo = nome_protocolo.split(", ");
    return {
      alergias_intolerancias:
        alergias_intolerancias.length > 0
          ? alergias_intolerancias.map(a => a.id)
          : undefined,
      classificacao: classificacao ? classificacao.id.toString() : undefined,
      data_termino: data_termino || undefined,
      informacoes_adicionais: informacoes_adicionais || undefined,
      nome_protocolo: nome_protocolo || undefined,
      substituicoes: this.getInitialValuesSubstituicoes(substituicoes),
      registro_funcional_nutricionista: obtemIdentificacaoNutricionista()
    };
  }

  salvaRascunho = values => {
    const {
      alergias_intolerancias,
      classificacao,
      data_termino,
      informacoes_adicionais,
      substituicoes
    } = values;
    let { nome_protocolo } = values;
    if (nome_protocolo)
      if (nome_protocolo[0] === "") nome_protocolo.splice(0, 1);
    nome_protocolo = nome_protocolo.toString().replace(/,/gi, ", ");
    return new Promise((resolve, reject) => {
      atualizaDietaEspecial(this.props.dietaEspecial.uuid, {
        alergias_intolerancias,
        classificacao,
        data_termino,
        informacoes_adicionais,
        nome_protocolo,
        substituicoes
      }).then(
        response => {
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess("Rascunho salvo com sucesso!");
            this.props.onAutorizarOuNegar();
            resolve();
          } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
            toastError("Houve um erro ao salvar o rascunho");
            resolve(response.data);
          }
        },
        function() {
          toastError("Houve um erro ao salvar o rascunho");
          reject();
        }
      );
    });
  };

  onAutorizar = values => {
    const { solicitacoesVigentes, showAutorizarModal } = this.state;
    if (
      solicitacoesVigentes &&
      solicitacoesVigentes.length > 0 &&
      !showAutorizarModal
    ) {
      this.showAutorizarModal();
      return;
    }
    if (showAutorizarModal) {
      this.closeAutorizarModal();
    }
    const { dietaEspecial } = this.props;
    let { nome_protocolo } = values;
    if (nome_protocolo)
      if (nome_protocolo[0] === "") nome_protocolo.splice(0, 1);
    nome_protocolo = nome_protocolo.toString().replace(/,/gi, ", ");
    return new Promise((resolve, reject) => {
      CODAEAutorizaDietaEspecial(dietaEspecial.uuid, {
        ...values,
        nome_protocolo: nome_protocolo
      }).then(
        response => {
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess(
              "Autorização de Dieta Especial realizada com sucesso!"
            );
            this.props.onAutorizarOuNegar();
            resolve();
          } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
            toastError("Houve um erro ao autorizar a Dieta Especial");
            resolve(response.data);
          }
        },
        function() {
          toastError("Houve um erro ao autorizar a Dieta Especial");
          reject();
        }
      );
    });
  };

  render() {
    const {
      diagnosticos,
      classificacoesDieta,
      alimentos,
      produtos,
      showNaoAprovaModal,
      showAutorizarModal,
      protocolosDietaEspecial,
      showModalAdicionaProtocolo,
      showModalSolicitacaoCadastroProduto
    } = this.state;
    const { dietaEspecial, setTemSolicitacaoCadastroProduto } = this.props;
    return (
      <div>
        <Form
          mutators={{ ...arrayMutators }}
          onSubmit={this.onAutorizar}
          initialValues={this.getInitialValues()}
          keepDirtyOnReinitialize={true}
          render={({ form, handleSubmit, pristine, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <div className="information-codae">
                <div className="pt-2 title">Relação por Diagnóstico</div>
                {diagnosticos && (
                  <Field
                    component={DiagnosticosField}
                    name="alergias_intolerancias"
                    diagnosticos={diagnosticos}
                    validate={required}
                  />
                )}
                <div className="pt-2 title">Classificação da Dieta</div>
                {classificacoesDieta && (
                  <Field
                    component={ClassificacaoDaDieta}
                    name="classificacao"
                    onClassificacaoChanged={this.onClassificacaoChanged}
                    classificacoes={classificacoesDieta}
                    validate={required}
                  />
                )}
                <div className="card mt-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12">
                            <div className="title">
                              Nome do Protocolo de Dieta Especial
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-10">
                            {protocolosDietaEspecial && (
                              <Field
                                component={SelectWithHideOptions}
                                options={protocolosDietaEspecial}
                                name="nome_protocolo"
                                selectedItems={[]}
                              />
                            )}
                          </div>
                          <div className="col-2 text-center">
                            <Botao
                              texto="Adicionar"
                              type={BUTTON_TYPE.BUTTON}
                              style={BUTTON_STYLE.BLUE_OUTLINE}
                              onClick={() => this.showModalAdicionaProtocolo()}
                              disabled={submitting}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 title">Substituições de Alimentos</div>
                    <SubstituicoesField
                      alimentos={alimentos}
                      produtos={produtos}
                    />
                    <div className="row">
                      <div className="col-12">
                        <Field
                          component={DataOpcional}
                          label="Data de Término"
                          labelLigado="Com data de término"
                          labelDesligado="Sem data de término"
                          minDate={moment().add(1, "day")["_d"]}
                          name="data_termino"
                          format={v => v && moment(v, "YYYY-MM-DD")["_d"]}
                          parse={v => v && moment(v).format("YYYY-MM-DD")}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-9">
                        <Field
                          component={CKEditorField}
                          label="Informações Adicionais"
                          name="informacoes_adicionais"
                        />
                      </div>
                    </div>
                    <div className="pt-2 title">
                      Identificação do Nutricionista
                    </div>
                    <div className="row">
                      <div className="col-9">
                        <Field
                          component={InputText}
                          name="registro_funcional_nutricionista"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row float-right mt-4">
                  <Botao
                    texto="Solicitar Novo Produto"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.BLUE_OUTLINE}
                    onClick={() => this.showModalSolicitacaoCadastroProduto()}
                    className="ml-3"
                    disabled={submitting}
                  />
                  <Botao
                    texto="Salvar Rascunho"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.BLUE}
                    onClick={() => this.salvaRascunho(values)}
                    className="ml-3"
                    disabled={pristine || submitting}
                  />
                  <Botao
                    texto="Negar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    onClick={() => this.showNaoAprovaModal("Não")}
                    className="ml-3"
                    disabled={submitting}
                  />
                  <Botao
                    texto="Autorizar"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="ml-3"
                    disabled={submitting}
                  />
                </div>
              </div>
              <ModalAutorizaDietaEspecial
                closeModal={this.closeAutorizarModal}
                showModal={showAutorizarModal}
                dietaEspecial={dietaEspecial}
                handleSubmit={form.submit}
              />
            </form>
          )}
        />
        <ModalNegaDietaEspecial
          showModal={showNaoAprovaModal}
          closeModal={this.closeNaoAprovaModal}
          onNegar={this.props.onAutorizarOuNegar}
          uuid={dietaEspecial.uuid}
        />
        <ModalAdicionaProtocolo
          showModal={showModalAdicionaProtocolo}
          closeModal={this.closeModalAdicionaProtocolo}
          atualizaProtocolos={this.atualizaProtocolos}
        />
        <ModalSolicitacaoCadastroProduto
          showModal={showModalSolicitacaoCadastroProduto}
          closeModal={this.closeModalSolicitacaoCadastroProduto}
          dietaEspecial={dietaEspecial}
          setTemSolicitacaoCadastroProduto={setTemSolicitacaoCadastroProduto}
        />
      </div>
    );
  }
}
