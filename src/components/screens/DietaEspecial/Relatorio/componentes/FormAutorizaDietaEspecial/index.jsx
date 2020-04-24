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
  getDietasEspeciaisVigentesDeUmAluno
} from "../../../../../../services/dietaEspecial.service";

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

export default class FormAutorizaDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diagnosticos: null,
      classificacoesDieta: null,
      alimentos: []
    };
  }

  componentDidMount = async () => {
    const { aluno, uuid } = this.props.dietaEspecial;
    const alergiasIntolerancias = await getAlergiasIntolerancias();
    const alimentos = await getAlimentos();
    const classificacoesDieta = await getClassificacoesDietaEspecial();
    const solicitacoesVigentes = await getDietasEspeciaisVigentesDeUmAluno(
      aluno.codigo_eol
    );
    this.setState({
      diagnosticos: alergiasIntolerancias.results,
      classificacoesDieta: classificacoesDieta.results,
      alimentos: alimentos.data,
      solicitacoesVigentes: formatarSolicitacoesVigentes(
        solicitacoesVigentes.data.results.filter(
          solicitacaoVigente => solicitacaoVigente.uuid !== uuid
        )
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

  getInitialValues() {
    const {
      alergias_intolerancias,
      classificacao,
      data_termino,
      informacoes_adicionais,
      nome_protocolo,
      substituicoes
    } = this.props.dietaEspecial;
    return {
      alergias_intolerancias:
        alergias_intolerancias.length > 0
          ? alergias_intolerancias.map(a => a.id)
          : undefined,
      classificacao: classificacao ? classificacao.id.toString() : undefined,
      data_termino: data_termino || undefined,
      informacoes_adicionais: informacoes_adicionais || undefined,
      nome_protocolo: nome_protocolo || undefined,
      substituicoes:
        substituicoes && substituicoes.length > 0
          ? substituicoes.map(s => {
              return {
                alimento: s.alimento ? s.alimento.id : undefined,
                tipo: s.tipo === "" ? undefined : s.tipo,
                substitutos: s.substitutos
              };
            })
          : [{}],
      registro_funcional_nutricionista: obtemIdentificacaoNutricionista()
    };
  }

  salvaRascunho = values => {
    const {
      alergias_intolerancias,
      classificacao,
      data_termino,
      nome_protocolo,
      informacoes_adicionais,
      substituicoes
    } = values;
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
    return new Promise((resolve, reject) => {
      CODAEAutorizaDietaEspecial(dietaEspecial.uuid, values).then(
        response => {
          if (response.status === HTTP_STATUS.OK) {
            toastSuccess(
              "Autorização de dieta especial realizada com sucesso!"
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
      showNaoAprovaModal,
      showAutorizarModal
    } = this.state;
    const { dietaEspecial } = this.props;
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
                    <div className="pt-2 title">
                      Nome do Protocolo de Dieta Especial
                    </div>
                    <Field
                      component={InputText}
                      name="nome_protocolo"
                      validate={required}
                    />
                    <div className="pt-2 title">Substituições de Alimentos</div>
                    <SubstituicoesField alimentos={alimentos} />
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
      </div>
    );
  }
}
