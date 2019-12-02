import React, { Component, Fragment } from "react";
import HTTP_STATUS from "http-status-codes";
import { Select } from "../Shareable/Select";
import { Botao } from "../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Shareable/Botao/constants";
import CardMatriculados from "../Shareable/CardMatriculados";
import { Field, formValueSelector, reduxForm, FormSection } from "redux-form";
import { bindActionCreators } from "redux";
import { loadAlteracaoCardapio } from "../../reducers/alteracaoCardapioReducer";
import { connect } from "react-redux";
import { Rascunhos } from "./Rascunhos";
import { required, textAreaRequired } from "../../helpers/fieldValidators";
import { checaSeDataEstaEntre2e5DiasUteis } from "../../helpers/utilities";
import { InputComData } from "../Shareable/DatePicker";
import { montaPeriodoDeAlteracao } from "./helper";
import { agregarDefault } from "../../helpers/utilities";
import { STATUS_DRE_A_VALIDAR } from "../../configs/constants";
import "./style.scss";
import { TextAreaWYSIWYG } from "../Shareable/TextArea/TextAreaWYSIWYG";
import ModalDataPrioritaria from "../Shareable/ModalDataPrioritaria";
import { validateSubmit } from "./validacao";
import { toastSuccess, toastError } from "../Shareable/Toast/dialogs";
import {
  createAlteracaoCardapio,
  getAlteracoesCardapioList,
  updateAlteracaoCardapio,
  deleteAlteracaoCardapio,
  enviarAlteracaoCardapio
} from "../../services/alteracaoDecardapio.service";
import moment from "moment";

const ENTER = 13;

class AlteracaoCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodos: [],
      loading: true,
      alteracaoCardapioList: [],
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: null,
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      substituicoesAlimentacao: [],
      substituicoesEdit: [],
      dataInicial: null
    };
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.periodos.length === 0 && this.props.periodos.length > 0) {
      let periodos = this.state.periodos;
      let substituicoesAlimentacao = this.state.substituicoesAlimentacao;
      this.props.periodos.forEach(periodo => {
        this.montaObjetoDeSubstituicoesEdit(periodo);
        substituicoesAlimentacao.push({ substituicoes: null });
        periodos.push(montaPeriodoDeAlteracao(periodo));
      });
      this.setState({ periodos });
    }
    const { motivos, meusDados, proximos_dois_dias_uteis } = this.props;
    const { loading, periodos } = this.state;
    if (
      motivos !== [] &&
      periodos !== [] &&
      meusDados !== null &&
      proximos_dois_dias_uteis !== null &&
      loading
    ) {
      this.setState({
        loading: false
      });
    }
  }

  componentDidMount() {
    this.refresh();
  }

  montaObjetoDeSubstituicoesEdit = periodo => {
    let substituicoesEdit = this.state.substituicoesEdit;
    substituicoesEdit.push({
      turno: periodo.nome,
      substituicoes: [],
      checado: false
    });
    this.setState({ substituicoesEdit });
  };

  retornaTurnoAlteracao = substituicao => {
    let substituicoesEdit = this.state.substituicoesEdit;
    let periodos = this.state.periodos;
    substituicoesEdit.forEach((item, indice) => {
      if (item.turno === substituicao.periodo_escolar.nome) {
        item.substituicoes = substituicao.tipo_alimentacao_de.substituicoes;
      }
      if (periodos[indice].nome === substituicao.periodo_escolar.nome) {
        periodos[indice].checado = true;
      }
    });
    this.setState({ substituicoesEdit, periodos });
  };

  retornaOpcoesAlteracao = (indice, param) => {
    const substituicoesAlimentacao = this.state.substituicoesAlimentacao;
    if (indice === undefined) {
      param.substituicoes.forEach(substituicao => {
        this.retornaTurnoAlteracao(substituicao);
      });
      return [];
    } else {
      const substituicoes =
        substituicoesAlimentacao[indice].substituicoes !== null
          ? substituicoesAlimentacao[indice].substituicoes
          : [];
      return substituicoes;
    }
  };

  OnEditButtonClicked(param) {
    let dataInicial = this.state.dataInicial;
    dataInicial = param["alteracaoDeCardapio"].data_inicial;
    this.props.reset("alteracaoCardapio");
    this.props.loadAlteracaoCardapio(param.alteracaoDeCardapio);
    this.retornaOpcoesAlteracao(undefined, param.alteracaoDeCardapio);
    this.setState({
      dataInicial,
      status: param.alteracaoDeCardapio.status,
      title: `Alteração de Cardápio # ${param.alteracaoDeCardapio.id_externo}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.alteracaoDeCardapio.id_externo
    });
  }

  refresh() {
    let alteracaoCardapioList = this.state.alteracaoCardapioList;
    getAlteracoesCardapioList()
      .then(response => {
        alteracaoCardapioList =
          response.results.length > 0 ? response.results : [];
        this.setState({
          alteracaoCardapioList
        });
      })
      .catch(error => {
        toastError("Houve um erro ao carregar Rascunhos Salvos", error);
      });
  }

  resetForm() {
    let periodos = this.state.periodos;
    this.props.loadAlteracaoCardapio(null);
    this.props.change("alterar_dia", null);
    this.props.change("data_inicial", null);
    this.props.change("data_final", null);
    this.props.change("motivo", null);
    this.props.change("observacao", null);
    periodos.forEach(periodo => {
      periodo.checado = false;
      this.props.change(`substituicoes_${periodo.nome}.check`, false);
      this.props.change(
        `substituicoes_${periodo.nome}.tipo_alimentacao_para`,
        null
      );
      this.props.change(
        `substituicoes_${periodo.nome}.tipo_alimentacao_de`,
        null
      );
    });
    this.setState({
      periodos,
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: null,
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dataInicial: null
    });
  }

  enviaAlteracaoCardapio(uuid) {
    enviarAlteracaoCardapio(uuid).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          toastSuccess("Alteração de Cardápio enviada com sucesso");
        } else {
          toastError(res.error);
        }
      },
      function() {
        toastError("Houve um erro ao enviar a Alteração de Cardápio");
      }
    );
  }

  onSubmit(values) {
    values.escola = this.props.meusDados.vinculo_atual.instituicao.uuid;
    const status = values.status;
    delete values.status;
    const erros = validateSubmit(values, this.props.meusDados);
    if (!erros) {
      this.resetaTodoPeriodoCheck();
      if (!values.uuid) {
        createAlteracaoCardapio(values)
          .then(async response => {
            if (response.status === HTTP_STATUS.CREATED) {
              if (status === STATUS_DRE_A_VALIDAR) {
                await this.enviaAlteracaoCardapio(response.data.uuid);
              } else {
                toastSuccess("Alteração de Cardápio salva com sucesso");
                this.refresh();
              }
              this.resetForm();
            }
          })
          .catch(error => {
            toastError(error);
            this.resetForm("alteracaoCardapio");
            this.refresh();
          });
      } else {
        updateAlteracaoCardapio(values.uuid, JSON.stringify(values)).then(
          async res => {
            if (res.status === HTTP_STATUS.OK) {
              if (status === STATUS_DRE_A_VALIDAR) {
                await this.enviaAlteracaoCardapio(res.data.uuid);
                this.refresh();
              } else {
                toastSuccess("Alteração de Cardápio salva com sucesso");
                this.refresh();
                this.resetForm("alteracaoCardapio");
              }
            } else {
              toastError(res.error);
            }
          },
          function() {
            toastError("Houve um erro ao salvar a Alteração de Cardápio");
          }
        );
      }
    } else {
      toastError(erros);
    }
  }

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  closeModal() {
    this.setState({ ...this.state, showModal: false });
  }

  onAlterarDiaChanged(event) {
    if (
      checaSeDataEstaEntre2e5DiasUteis(
        event.target.value,
        this.props.proximos_dois_dias_uteis,
        this.props.proximos_cinco_dias_uteis
      )
    ) {
      this.showModal();
    }
  }

  limpaCamposAlteracaoDoPeriodo(periodo, periodoNome) {
    if (periodo.checado) {
      this.props.change(
        `substituicoes_${periodoNome}.tipo_alimentacao_de`,
        null
      );
      this.props.change(
        `substituicoes_${periodoNome}.tipo_alimentacao_para`,
        null
      );
    }
  }

  resetAlteracaoDoPeriodo(uuidInput, periodoNome, indice) {
    let substituicoesAlimentacao = this.state.substituicoesAlimentacao;
    if (substituicoesAlimentacao[indice].uuidAlimentacao !== uuidInput) {
      this.props.change(
        `substituicoes_${periodoNome}.tipo_alimentacao_para`,
        null
      );
    }
  }

  OnDeleteButtonClicked(id_externo, uuid) {
    if (window.confirm("Deseja remover este rascunho?")) {
      deleteAlteracaoCardapio(uuid).then(
        statusCode => {
          if (statusCode === HTTP_STATUS.NO_CONTENT) {
            toastSuccess(`Rascunho # ${id_externo} excluído com sucesso`);
            this.refresh();
          } else {
            toastError("Houve um erro ao excluir o rascunho");
          }
        },
        function() {
          toastError("Houve um erro ao excluir o rascunho");
        }
      );
    }
  }

  resetaTodoPeriodoCheck() {
    let periodos = this.state.periodos;
    periodos.forEach(periodo => {
      if (periodo.checado) {
        periodo.checado = false;
      }
    });
    this.setState({ periodos });
  }

  atualizaPeriodoCheck(input, indice, periodoNome) {
    let periodos = this.state.periodos;
    this.limpaCamposAlteracaoDoPeriodo(periodos[indice], periodoNome);
    periodos[indice].checado = !periodos[indice].checado;
    this.props.change(input, periodos[indice].checado);
    this.setState({ periodos });
  }

  handleSelectedChanged = (selectedOptions, periodo) => {
    let opcoesDe = this.state.opcoesDe;
    opcoesDe[periodo.nome] = selectedOptions;
    this.setState({
      ...this.state,
      opcoesDe: opcoesDe
    });
    this.props.change(
      `substituicoes_${periodo.nome}.tipo_de_refeicao`,
      selectedOptions
    );
  };

  selectSubstituicoesAlimentacaoAPartirDe = (alimentacaoUUID, indice) => {
    let periodos = this.state.periodos;
    const tiposAlimentacao = periodos[indice].tipos_alimentacao;
    let substituicoesAlimentacao = this.state.substituicoesAlimentacao;
    tiposAlimentacao.forEach(tipoAlimentacao => {
      if (tipoAlimentacao.uuid === alimentacaoUUID) {
        substituicoesAlimentacao[indice].substituicoes =
          tipoAlimentacao.substituicoes;
        substituicoesAlimentacao[indice].uuidAlimentacao = alimentacaoUUID;
      }
    });
    this.setState({ substituicoesAlimentacao });
  };

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  obtemDataInicial = value => {
    let dataInicial = this.state.dataInicial;
    dataInicial = moment(value, "DD/MM/YYYY").add(1, "days")["_d"];
    this.setState({ dataInicial });
  };

  render() {
    const {
      loading,
      alteracaoCardapioList,
      periodos,
      showModal,
      substituicoesEdit,
      dataInicial
    } = this.state;
    const {
      handleSubmit,
      meusDados,
      proximos_dois_dias_uteis,
      motivos,
      pristine,
      submitting
    } = this.props;
    return (
      <Fragment>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form
            className="mt-3"
            onSubmit={handleSubmit}
            onKeyPress={this.onKeyPress}
          >
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={
                meusDados.vinculo_atual.instituicao.quantidade_alunos
              }
            />

            {alteracaoCardapioList.length > 0 && (
              <section className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  alteracaoCardapioList={alteracaoCardapioList}
                  OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                  resetForm={event => this.resetForm(event)}
                  OnEditButtonClicked={params =>
                    this.OnEditButtonClicked(params)
                  }
                />
              </section>
            )}
            <section className="card  mt-3">
              <article className="card-body">
                <div
                  className="card-title font-weight-bold descricao"
                  style={this.fontHeader}
                >
                  Descrição da Alteração
                </div>
                <section className="section-form-datas mt-4">
                  <Field
                    component={InputComData}
                    onBlur={event => this.onAlterarDiaChanged(event)}
                    name="alterar_dia"
                    minDate={proximos_dois_dias_uteis}
                    label="Alterar dia"
                    disabled={this.props.data_inicial || this.props.data_final}
                  />
                  <div className="opcao-data">Ou</div>
                  <Field
                    component={InputComData}
                    name="data_inicial"
                    label="De"
                    minDate={proximos_dois_dias_uteis}
                    disabled={this.props.alterar_dia}
                    onChange={value => this.obtemDataInicial(value)}
                  />
                  <Field
                    component={InputComData}
                    name="data_final"
                    label="Até"
                    disabled={dataInicial !== null ? false : true}
                    minDate={dataInicial}
                  />
                </section>
                <section className="section-form-motivo mt-3">
                  <Field
                    component={Select}
                    name="motivo"
                    label="Motivo"
                    options={motivos}
                    validate={required}
                  />
                </section>
              </article>
              <hr />
              <article className="card-body">
                <header className="descricao-periodos-alimentacao">
                  <div>Período</div>
                  <div>Alterar alimentação de:</div>
                  <div>Para alimentação:</div>
                </header>

                {periodos.map((periodo, indice) => {
                  this.props.change(
                    `substituicoes_${periodo.nome}.periodo`,
                    periodo.uuid
                  );
                  return (
                    <FormSection
                      name={`substituicoes_${periodo.nome}`}
                      className="item-periodo-alimentacao"
                      key={indice}
                    >
                      <Fragment>
                        <label
                          htmlFor="check"
                          className="checkbox-label"
                          style={{
                            background: periodo.style.background,
                            border: `1px solid ${periodo.style.borderColor}`
                          }}
                        >
                          <Field
                            component={"input"}
                            type="checkbox"
                            name="check"
                          />
                          <span
                            onClick={() =>
                              this.atualizaPeriodoCheck(
                                `substituicoes_${periodo.nome}.check`,
                                indice,
                                periodo.nome
                              )
                            }
                            className="checkbox-custom"
                            data-cy={`checkbox-${periodo.nome}`}
                          />
                          <div className=""> {periodo.nome}</div>
                        </label>
                      </Fragment>

                      <Field
                        component={Select}
                        name="tipo_alimentacao_de"
                        options={agregarDefault(periodo.tipos_alimentacao)}
                        disabled={!periodo.checado}
                        onChange={event => {
                          this.resetAlteracaoDoPeriodo(
                            event.target.value,
                            periodo.nome,
                            indice
                          );
                          this.selectSubstituicoesAlimentacaoAPartirDe(
                            event.target.value,
                            indice
                          );
                        }}
                        validate={periodo.checado && required}
                      />

                      <Field
                        component={Select}
                        name="tipo_alimentacao_para"
                        disabled={!periodo.checado}
                        options={agregarDefault(
                          this.retornaOpcoesAlteracao(indice).length === 0
                            ? substituicoesEdit[indice].substituicoes
                            : this.retornaOpcoesAlteracao(indice)
                        )}
                        validate={periodo.checado && required}
                      />
                    </FormSection>
                  );
                })}
              </article>
              <hr />
              <article className="card-body">
                <Field
                  component={TextAreaWYSIWYG}
                  label="Observações"
                  name="observacao"
                  validate={textAreaRequired}
                />
              </article>
              <article className="card-body footer-button">
                <Botao
                  texto="Cancelar"
                  onClick={event => this.resetForm(event)}
                  disabled={pristine || submitting}
                  style={BUTTON_STYLE.OutlinePrimary}
                />
                <Botao
                  disabled={pristine || submitting}
                  texto={this.state.salvarAtualizarLbl}
                  onClick={handleSubmit(values => this.onSubmit(values))}
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.OutlinePrimary}
                />
                <Botao
                  texto="Enviar"
                  disabled={pristine || submitting}
                  type={BUTTON_TYPE.SUBMIT}
                  onClick={handleSubmit(values =>
                    this.onSubmit({
                      ...values,
                      status: STATUS_DRE_A_VALIDAR
                    })
                  )}
                  style={BUTTON_STYLE.Primary}
                />
              </article>
            </section>
            <ModalDataPrioritaria
              showModal={showModal}
              closeModal={this.closeModal}
            />
          </form>
        )}
      </Fragment>
    );
  }
}

const AlteracaoCardapioForm = reduxForm({
  form: "alteracaoCardapio",
  enableReinitialize: true
})(AlteracaoCardapio);

const selector = formValueSelector("alteracaoCardapio");

const mapStateToProps = state => {
  return {
    initialValues: state.alteracaoCardapio.data,
    data_inicial: selector(state, "data_inicial"),
    data_final: selector(state, "data_final"),
    alterar_dia: selector(state, "alterar_dia"),
    motivo: selector(state, "motivo"),
    observacao: selector(state, "observacao")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadAlteracaoCardapio
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlteracaoCardapioForm);
