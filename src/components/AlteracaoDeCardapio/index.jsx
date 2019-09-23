import StatefulMultiSelect from "@khanacademy/react-multi-select";
import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, FormSection, formValueSelector, reduxForm } from "redux-form";
import { required, naoPodeSerZero } from "../../helpers/fieldValidators";
import { STATUS_DRE_A_VALIDAR } from "../../configs/constants";
import {
  checaSeDataEstaEntre2e5DiasUteis,
  formatarParaMultiselect
} from "../../helpers/utilities";
import { loadAlteracaoCardapio } from "../../reducers/alteracaoCardapioReducer";
import {
  createAlteracaoCardapio,
  deleteAlteracaoCardapio,
  enviarAlteracaoCardapio,
  getAlteracoesCardapioList,
  updateAlteracaoCardapio
} from "../../services/alteracaoDecardapio.service";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import CardMatriculados from "../Shareable/CardMatriculados";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import {
  LabelAndCombo,
  LabelAndDate,
  LabelAndInput,
  LabelAndTextArea
} from "../Shareable/labelAndInput/labelAndInput";
import ModalDataPrioritaria from "../Shareable/ModalDataPrioritaria";
import { Rascunhos } from "./Rascunhos";
import "./style.scss";
import { validateSubmit } from "./validacao";

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
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      // TODO: Desacoplar options do nome dos períodos escolares
      options: {
        MANHA: [],
        TARDE: [],
        NOITE: [],
        INTEGRAL: []
      }
    };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.refresh = this.refresh.bind(this);
    this.titleRef = React.createRef();
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

  closeModal(e) {
    this.setState({ ...this.state, showModal: false });
  }

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  handleSelectedChanged = (selectedOptions, period) => {
    let options = this.state.options;
    options[period.nome] = selectedOptions;
    this.setState({
      ...this.state,
      options: options
    });
    this.props.change(
      `substituicoes_${period.nome}.tipo_de_refeicao`,
      selectedOptions
    );
  };

  fontHeader = {
    color: "#686868"
  };
  bgMorning = {
    background: "#FFF7CB"
  };

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
        function(error) {
          toastError("Houve um erro ao excluir o rascunho");
        }
      );
    }
  }

  resetForm(event) {
    this.props.reset("alteracaoCardapio");
    this.props.loadAlteracaoCardapio(null);
    this.setState({
      status: "SEM STATUS",
      title: "Nova Alteração de Cardápio",
      id: "",
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_razoes: [
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          data: null,
          motivo: null,
          observacao: null,
          data_inicial: null,
          data_final: null,
          weekdays: []
        }
      ],
      // TODO: Desacoplar options dos nomes dos períodos escolares
      options: {
        MANHA: [],
        TARDE: [],
        NOITE: [],
        INTEGRAL: []
      }
    });
  }

  OnEditButtonClicked(param) {
    this.props.reset("alteracaoCardapio");
    this.props.loadAlteracaoCardapio(param.alteracaoDeCardapio);
    this.setState({
      status: param.alteracaoDeCardapio.status,
      title: `Alteração de Cardápio # ${param.alteracaoDeCardapio.id_externo}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.alteracaoDeCardapio.id,
      dias_razoes: param.alteracaoDeCardapio.dias_razoes,
      // TODO: Desacoplar options dos nomes dos períodos escolares
      options: {
        MANHA:
          param.alteracaoDeCardapio.substituicoes_MANHA !== undefined
            ? param.alteracaoDeCardapio.substituicoes_MANHA.tipo_de_refeicao
            : [],
        TARDE:
          param.alteracaoDeCardapio.substituicoes_TARDE !== undefined
            ? param.alteracaoDeCardapio.substituicoes_TARDE.tipo_de_refeicao
            : [],
        NOITE:
          param.alteracaoDeCardapio.substituicoes_NOITE !== undefined
            ? param.alteracaoDeCardapio.substituicoes_NOITE.tipo_de_refeicao
            : [],
        INTEGRAL:
          param.alteracaoDeCardapio.substituicoes_INTEGRAL !== undefined
            ? param.alteracaoDeCardapio.substituicoes_INTEGRAL.tipo_de_refeicao
            : []
      }
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    // TODO: Desacoplar dos nomes dos períodos escolares
    const fields = [
      "substituicoes_MANHA",
      "substituicoes_TARDE",
      "substituicoes_NOITE",
      "substituicoes_INTEGRAL"
    ];
    fields.forEach(
      function(field) {
        if (
          prevProps[field] &&
          prevProps[field].check &&
          this.props[field] &&
          !this.props[field].check
        ) {
          let options = this.state.options;
          const value = field.split("substituicoes_")[1];
          options[value] = [];
          this.setState({
            ...this.state,
            options: options
          });
          this.props.change(field + ".tipo_de_refeicao", []);
          this.props.change(field + ".numero_de_alunos", "");
        }
      }.bind(this)
    );
    if (prevProps.periodos.length === 0 && this.props.periodos.length > 0) {
      this.setState({
        periodos: this.props.periodos
      });
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

  refresh() {
    getAlteracoesCardapioList().then(
      res => {
        this.setState({
          ...this.state,
          alteracaoCardapioList: res.results
        });
      },
      function(error) {
        toastError("Erro ao carregar as alterações de cardápio salvas");
      }
    );
    this.resetForm("alteracaoCardapio");
  }

  enviaAlteracaoCardapio(uuid) {
    enviarAlteracaoCardapio(uuid).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          this.refresh();
          toastSuccess("Alteração de Cardápio enviada com sucesso");
        } else {
          toastError(res.error);
        }
      },
      function(error) {
        toastError("Houve um erro ao enviar a Alteração de Cardápio");
      }
    );
  }

  onSubmit(values) {
    values.escola = this.props.meusDados.escolas[0].uuid;
    const status = values.status;
    delete values.status;
    const error = validateSubmit(values, this.props.meusDados);
    if (!error) {
      if (!values.uuid) {
        createAlteracaoCardapio(JSON.stringify(values)).then(
          async res => {
            if (res.status === HTTP_STATUS.CREATED) {
              if (status === STATUS_DRE_A_VALIDAR) {
                await this.enviaAlteracaoCardapio(res.data.uuid);
                this.refresh();
              } else {
                toastSuccess("Alteração de Cardápio salva com sucesso");
              }
              this.refresh();
            } else {
              toastError(res.error);
            }
          },
          function(error) {
            toastError("Houve um erro ao salvar a Alteração de Cardápio");
          }
        );
      } else {
        updateAlteracaoCardapio(values.uuid, JSON.stringify(values)).then(
          async res => {
            if (res.status === HTTP_STATUS.OK) {
              this.refresh();
              if (status === STATUS_DRE_A_VALIDAR) {
                await this.enviaAlteracaoCardapio(res.data.uuid);
              } else {
                toastSuccess("Alteração de Cardápio salva com sucesso");
              }
              this.refresh();
            } else {
              toastError(res.error);
            }
          },
          function(error) {
            toastError("Houve um erro ao salvar a Alteração de Cardápio");
          }
        );
      }
      this.closeModal();
    } else {
      toastError(error);
    }
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      periodos,
      motivos,
      meusDados,
      proximos_dois_dias_uteis,
      substituicoes_MANHA, // TODO: Desacoplar variáveis dos nomes de períodos escolares.
      substituicoes_TARDE,
      substituicoes_NOITE,
      substituicoes_INTEGRAL
    } = this.props;
    const {
      loading,
      title,
      options,
      alteracaoCardapioList,
      showModal
    } = this.state;
    // TODO: Desacoplar checkMap dos nomes de períodos escolares.
    let checkMap = {
      MANHA: substituicoes_MANHA && substituicoes_MANHA.check,
      TARDE: substituicoes_TARDE && substituicoes_TARDE.check,
      NOITE: substituicoes_NOITE && substituicoes_NOITE.check,
      INTEGRAL: substituicoes_INTEGRAL && substituicoes_INTEGRAL.check
    };
    // TODO: Desacoplar colors dos nomes de períodos escolares
    const colors = {
      manha: "#FFF7CB",
      tarde: "#FFEED6",
      noite: "#E4F1FF",
      integral: "#EBEDFF"
    };
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit} onKeyPress={this.onKeyPress}>
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={meusDados.escolas[0].quantidade_alunos}
            />
            {alteracaoCardapioList.length > 0 && (
              <div className="mt-3">
                <span className="page-title">Rascunhos</span>
                <Rascunhos
                  alteracaoCardapioList={alteracaoCardapioList}
                  OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                  resetForm={event => this.resetForm(event)}
                  OnEditButtonClicked={params =>
                    this.OnEditButtonClicked(params)
                  }
                />
              </div>
            )}
            <div ref={this.titleRef} className="form-row mt-3 ml-1">
              <h3 className="font-weight-bold" style={{ color: "#353535" }}>
                {title}
              </h3>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <div
                  className="card-title font-weight-bold"
                  style={this.fontHeader}
                >
                  Descrição da Alteração
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-3">
                    <Field
                      component={LabelAndDate}
                      onBlur={event => this.onAlterarDiaChanged(event)}
                      name="alterar_dia"
                      minDate={proximos_dois_dias_uteis}
                      label="Alterar dia"
                      disabled={
                        this.props.data_inicial || this.props.data_final
                      }
                    />
                  </div>
                  <div className="or-div form-group col-sm-1">Ou</div>
                  <div className="form-group col-sm-3">
                    <Field
                      component={LabelAndDate}
                      name="data_inicial"
                      label="De"
                      disabled={this.props.alterar_dia}
                    />
                  </div>
                  <div className="form-group col-sm-3">
                    <Field
                      component={LabelAndDate}
                      name="data_final"
                      label="Até"
                      disabled={this.props.alterar_dia}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <Field
                    component={LabelAndCombo}
                    name="motivo"
                    label="Motivo"
                    options={motivos}
                    validate={required}
                  />
                </div>
                <table className="table table-borderless">
                  <tr>
                    <td>Período</td>
                    <td style={{ paddingLeft: "9rem" }}>Tipo de Alimentação</td>
                    <td>Nº de Alunos</td>
                  </tr>
                </table>
                {periodos.map((period, key) => {
                  this.props.change(
                    `substituicoes_${period.nome}.periodo`,
                    period.uuid
                  );

                  return (
                    <FormSection name={`substituicoes_${period.nome}`}>
                      <div className="form-row">
                        <Field component={"input"} type="hidden" name="value" />
                        <div className="form-check col-md-3 mr-4 ml-4">
                          <div
                            className="pl-5 pt-2 pb-2"
                            style={{
                              marginLeft: "-1.4rem",
                              background: colors[period.nome.toLowerCase()],
                              borderRadius: "7px"
                            }}
                          >
                            <label htmlFor="check" className="checkbox-label">
                              <Field
                                component={"input"}
                                type="checkbox"
                                name="check"
                              />
                              <span
                                onClick={() =>
                                  this.props.change(
                                    `substituicoes_${period.nome}.check`,
                                    !checkMap[period.nome]
                                  )
                                }
                                className="checkbox-custom"
                              />{" "}
                              {period.nome}
                            </label>
                          </div>
                        </div>
                        <div className="form-group col-md-5 mr-5">
                          <div
                            className={
                              checkMap[period.nome]
                                ? "multiselect-wrapper-enabled"
                                : "multiselect-wrapper-disabled"
                            }
                          >
                            <Field
                              component={StatefulMultiSelect}
                              name=".tipo_de_refeicao"
                              selected={options[period.nome] || []}
                              options={formatarParaMultiselect(
                                period.tipos_alimentacao
                              )}
                              onSelectedChanged={values =>
                                this.handleSelectedChanged(values, period)
                              }
                              disableSearch={true}
                              overrideStrings={{
                                selectSomeItems: "Selecione",
                                allItemsAreSelected:
                                  "Todos os itens estão selecionados",
                                selectAll: "Todos"
                              }}
                            />
                          </div>
                        </div>
                        <div className="form-group col-md-2">
                          <Field
                            component={LabelAndInput}
                            type="number"
                            name="numero_de_alunos"
                            min="0"
                            className="form-control"
                            validate={
                              checkMap[period.nome] && [
                                required,
                                naoPodeSerZero
                              ]
                            }
                          />
                        </div>
                      </div>
                    </FormSection>
                  );
                })}
                <hr className="w-100" />
                <div className="form-group">
                  <Field
                    component={LabelAndTextArea}
                    placeholder="Campo opcional"
                    label="Observações"
                    name="observacao"
                  />
                </div>
                <div className="form-group row float-right mt-4">
                  <BaseButton
                    label="Cancelar"
                    onClick={event => this.resetForm(event)}
                    disabled={pristine || submitting}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label={this.state.salvarAtualizarLbl}
                    disabled={pristine || submitting}
                    onClick={handleSubmit(values => this.onSubmit(values))}
                    className="ml-3"
                    type={ButtonType.SUBMIT}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label="Enviar Solicitação"
                    disabled={pristine || submitting}
                    type={ButtonType.SUBMIT}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values,
                        status: STATUS_DRE_A_VALIDAR
                      })
                    )}
                    style={ButtonStyle.Primary}
                    className="ml-3"
                  />
                </div>
              </div>
            </div>
            <ModalDataPrioritaria
              showModal={showModal}
              closeModal={this.closeModal}
            />
          </form>
        )}
      </div>
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
    // TODO: Desacoplar do nome dos períodos escolares
    substituicoes_MANHA: selector(state, "substituicoes_MANHA"),
    substituicoes_TARDE: selector(state, "substituicoes_TARDE"),
    substituicoes_NOITE: selector(state, "substituicoes_NOITE"),
    substituicoes_INTEGRAL: selector(state, "substituicoes_INTEGRAL"),
    data_inicial: selector(state, "data_inicial"),
    data_final: selector(state, "data_final"),
    alterar_dia: selector(state, "alterar_dia")
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
