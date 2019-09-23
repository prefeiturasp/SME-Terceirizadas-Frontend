import StatefulMultiSelect from "@khanacademy/react-multi-select";
import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createSuspensaoDeAlimentacao,
  deleteSuspensaoDeAlimentacao,
  getSuspensoesDeAlimentacaoSalvas,
  updateSuspensaoDeAlimentacao,
  enviarSuspensaoDeAlimentacao
} from "../../services/suspensaoDeAlimentacao.service";
import { geradorUUID, formatarParaMultiselect } from "../../helpers/utilities";
import { validateSubmit } from "./validacao";
import { Field, reduxForm, formValueSelector, FormSection } from "redux-form";
import { InputText } from "../Shareable/Input/InputText";
import { Select } from "../Shareable/Select";
import { required, naoPodeSerZero } from "../../helpers/fieldValidators";
import { loadFoodSuspension } from "../../reducers/suspensaoDeAlimentacaoReducer";
import CardMatriculados from "../Shareable/CardMatriculados";
import { Rascunhos } from "./Rascunhos";
import { toastSuccess, toastError } from "../Shareable/Toast/dialogs";
import { InputComData } from "../Shareable/DatePicker";
import Botao from "../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Shareable/Botao/constants";
import { TextAreaWYSIWYG } from "../Shareable/TextArea/TextAreaWYSIWYG";
import { STATUS_DRE_A_VALIDAR } from "../../configs/constants";

const ENTER = 13;
class FoodSuspensionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      suspensoesDeAlimentacaoList: [],
      status: "SEM STATUS",
      title: "Nova Solicitação",
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_razoes: [
        {
          id: geradorUUID(),
          data: null,
          motivo: null,
          outroMotivo: false
        }
      ],
      options: {
        MANHA: [],
        TARDE: [],
        NOITE: [],
        INTEGRAL: []
      }
    };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.addDay = this.addDay.bind(this);
    this.refresh = this.refresh.bind(this);
    this.titleRef = React.createRef();
  }

  handleField(field, value, key) {
    let dias_razoes = this.state.dias_razoes;
    dias_razoes[key][field] = value;
    if (field === `motivo${key}`) {
      const indiceMotivo = this.props.motivos.findIndex(
        motivo => motivo.uuid === value
      );
      dias_razoes[key]["outroMotivo"] = this.props.motivos[
        indiceMotivo
      ].nome.includes("Outro");
    }
    this.setState({ dias_razoes });
  }

  addDay() {
    this.setState({
      dias_razoes: this.state.dias_razoes.concat([
        {
          id: geradorUUID(),
          data: null,
          motivo: null,
          outroMotivo: false
        }
      ])
    });
  }

  handleSelectedChanged = (selectedOptions, period) => {
    let options = this.state.options;
    options[period.nome] = selectedOptions;
    this.setState({
      ...this.state,
      options: options
    });
    this.props.change(
      `suspensoes_${period.nome}.tipo_de_refeicao`,
      selectedOptions
    );
  };

  OnDeleteButtonClicked(id_externo, uuid) {
    if (window.confirm("Deseja remover este rascunho?")) {
      deleteSuspensaoDeAlimentacao(uuid).then(
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
    this.props.reset("foodSuspension");
    this.props.loadFoodSuspension(null);
    this.setState({
      status: "SEM STATUS",
      title: "Nova Solicitação",
      salvarAtualizarLbl: "Salvar Rascunho",
      dias_razoes: [
        {
          id: geradorUUID(),
          data: null,
          motivo: null
        }
      ],
      options: {
        MANHA: [],
        TARDE: [],
        NOITE: [],
        INTEGRAL: []
      }
    });
  }

  diasRazoesFromSuspensoesAlimentacao(suspensoesAlimentacao) {
    let novoDiasRazoes = [];
    suspensoesAlimentacao.forEach(function(suspensaoAlimentacao) {
      const idx = suspensoesAlimentacao.findIndex(
        value2 => value2.data === suspensaoAlimentacao.data
      );
      let novoDia = {
        id: geradorUUID(),
        data: suspensaoAlimentacao.data,
        motivo: suspensaoAlimentacao.motivo.uuid,
        outroMotivo:
          suspensaoAlimentacao.outro_motivo !== null &&
          suspensaoAlimentacao.outro_motivo !== ""
      };
      novoDia[`data${idx}`] = suspensaoAlimentacao.data;
      novoDia[`motivo${idx}`] = suspensaoAlimentacao.motivo.uuid;
      novoDiasRazoes.push(novoDia);
    });
    return novoDiasRazoes;
  }

  OnEditButtonClicked(param) {
    this.props.reset("foodSuspension");
    this.props.loadFoodSuspension(param.suspensaoDeAlimentacao);
    this.setState({
      status: param.suspensaoDeAlimentacao.status,
      title: `Suspensão de Alimentação # ${
        param.suspensaoDeAlimentacao.id_externo
      }`,
      salvarAtualizarLbl: "Atualizar",
      dias_razoes: this.diasRazoesFromSuspensoesAlimentacao(
        param.suspensaoDeAlimentacao.suspensoes_alimentacao
      ),
      options: {
        MANHA:
          param.suspensaoDeAlimentacao.suspensoes_MANHA !== undefined
            ? param.suspensaoDeAlimentacao.suspensoes_MANHA.tipo_de_refeicao
            : [],
        TARDE:
          param.suspensaoDeAlimentacao.suspensoes_TARDE !== undefined
            ? param.suspensaoDeAlimentacao.suspensoes_TARDE.tipo_de_refeicao
            : [],
        NOITE:
          param.suspensaoDeAlimentacao.suspensoes_NOITE !== undefined
            ? param.suspensaoDeAlimentacao.suspensoes_NOITE.tipo_de_refeicao
            : [],
        INTEGRAL:
          param.suspensaoDeAlimentacao.suspensoes_INTEGRAL !== undefined
            ? param.suspensaoDeAlimentacao.suspensoes_INTEGRAL.tipo_de_refeicao
            : []
      }
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    const fields = [
      "suspensoes_MANHA",
      "suspensoes_TARDE",
      "suspensoes_NOITE",
      "suspensoes_INTEGRAL"
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
          const value = field.split("suspensoes_")[1];
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
    getSuspensoesDeAlimentacaoSalvas().then(
      res => {
        this.setState({
          suspensoesDeAlimentacaoList: res.results
        });
      },
      function(error) {
        toastError("Erro ao carregar as suspensões salvas");
      }
    );
    this.resetForm("foodSuspension");
  }

  enviaSuspensaoDeAlimentacao(uuid) {
    enviarSuspensaoDeAlimentacao(uuid).then(
      res => {
        if (res.status === HTTP_STATUS.OK) {
          this.refresh();
          toastSuccess("Suspensão de Alimentação enviada com sucesso");
        } else {
          toastError(res.error);
        }
      },
      function(error) {
        toastError("Houve um erro ao enviar a Suspensão de Alimentação");
      }
    );
  }

  onSubmit(values) {
    values.dias_razoes = this.state.dias_razoes;
    values.dias_razoes.forEach(value => {
      const idx = values.dias_razoes.findIndex(
        value2 => value2.id === value.id
      );
      values.dias_razoes[idx]["data"] = values.dias_razoes[idx][`data${idx}`];
      values.dias_razoes[idx]["motivo"] =
        values.dias_razoes[idx][`motivo${idx}`];
      values.dias_razoes[idx]["outro_motivo"] =
        values.dias_razoes[idx][`outro_motivo${idx}`];
    });
    values.escola = this.props.meusDados.escolas[0].uuid;
    const error = validateSubmit(values, this.props.meusDados);
    values.quantidades_por_periodo = values.suspensoes;
    values.suspensoes_alimentacao = values.dias_razoes;
    const status = values.status;
    delete values.status;
    if (!error) {
      if (!values.uuid) {
        createSuspensaoDeAlimentacao(JSON.stringify(values)).then(
          async res => {
            if (res.status === HTTP_STATUS.CREATED) {
              this.refresh();
              if (status === STATUS_DRE_A_VALIDAR) {
                await this.enviaSuspensaoDeAlimentacao(res.data.uuid);
                this.refresh();
              } else {
                toastSuccess("Suspensão de Alimentação salva com sucesso");
              }
            } else {
              toastError(res.error);
            }
          },
          function(error) {
            toastError("Houve um erro ao salvar a Suspensão de Alimentação");
          }
        );
      } else {
        updateSuspensaoDeAlimentacao(values.uuid, JSON.stringify(values)).then(
          async res => {
            if (res.status === HTTP_STATUS.OK) {
              this.refresh();
              if (status === STATUS_DRE_A_VALIDAR) {
                await this.enviaSuspensaoDeAlimentacao(res.data.uuid);
                this.refresh();
              } else {
                toastSuccess("Suspensão de Alimentação atualizada com sucesso");
              }
            } else {
              toastError(res.error);
            }
          },
          function(error) {
            toastError("Houve um erro ao atualizar a Suspensão de Alimentação");
          }
        );
      }
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
      meusDados,
      periodos,
      motivos,
      proximos_dois_dias_uteis,
      suspensoes_MANHA,
      suspensoes_TARDE,
      suspensoes_NOITE,
      suspensoes_INTEGRAL
    } = this.props;
    const {
      loading,
      title,
      options,
      suspensoesDeAlimentacaoList,
      dias_razoes
    } = this.state;
    let checkMap = {
      MANHA: suspensoes_MANHA && suspensoes_MANHA.check,
      TARDE: suspensoes_TARDE && suspensoes_TARDE.check,
      NOITE: suspensoes_NOITE && suspensoes_NOITE.check,
      INTEGRAL: suspensoes_INTEGRAL && suspensoes_INTEGRAL.check
    };
    return (
      <div>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
            onKeyPress={this.onKeyPress}
          >
            <Field component={"input"} type="hidden" name="uuid" />
            <CardMatriculados
              numeroAlunos={meusDados.escolas[0].quantidade_alunos}
            />
            {suspensoesDeAlimentacaoList.length > 0 && (
              <div className="mt-3">
                <span ref={this.titleRef} className="page-title">
                  Rascunhos
                </span>
                <Rascunhos
                  suspensoesDeAlimentacaoList={suspensoesDeAlimentacaoList}
                  OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                  resetForm={event => this.resetForm(event)}
                  OnEditButtonClicked={params =>
                    this.OnEditButtonClicked(params)
                  }
                />
              </div>
            )}
            <div className="mt-2 page-title">{title}</div>
            <div className="card solicitation mt-3">
              <div className="card-body">
                <div className="card-title font-weight-bold">
                  Descrição da Suspensão
                </div>
                {dias_razoes.map((dia_motivo, key) => {
                  return (
                    <FormSection name={`dias_razoes_${dia_motivo.data}`}>
                      <div className="form-row">
                        <div className="form-group col-sm-3">
                          <Field
                            component={InputComData}
                            name={`data${key}`}
                            minDate={proximos_dois_dias_uteis}
                            onChange={value =>
                              this.handleField(`data${key}`, value, key)
                            }
                            label="Dia"
                            required
                            validate={required}
                          />
                        </div>
                        <div className="form-group col-sm-8">
                          <Field
                            component={Select}
                            name={`motivo${key}`}
                            label="Motivo"
                            options={motivos}
                            onChange={event =>
                              this.handleField(
                                `motivo${key}`,
                                event.target.value,
                                key
                              )
                            }
                            required
                            validate={required}
                          />
                        </div>
                      </div>
                      {dia_motivo.outroMotivo && (
                        <div className="form-row">
                          <div className="form-group col-sm-8 offset-sm-3">
                            <Field
                              component={InputText}
                              label="Qual o motivo?"
                              onChange={event =>
                                this.handleField(
                                  `outro_motivo${key}`,
                                  event.target.value,
                                  key
                                )
                              }
                              required
                              name={`outro_motivo${key}`}
                              className="form-control"
                              validate={required}
                            />
                          </div>
                        </div>
                      )}
                    </FormSection>
                  );
                })}
                <Botao
                  texto="Adicionar dia"
                  titulo="Adicionar dia"
                  className="col-3"
                  onClick={() => this.addDay()}
                  style={BUTTON_STYLE.GREEN_OUTLINE}
                  type={BUTTON_TYPE.BUTTON}
                />
                <div className="row table-titles">
                  <div className="col-3">Período</div>
                  <div className="col-6 type-food">Tipo de Alimentação</div>
                  <div className="col-3 n-students">Nº de Alunos</div>
                </div>
                {periodos.map((period, key) => {
                  this.props.change(
                    `suspensoes_${period.nome}.periodo`,
                    period.uuid
                  );
                  return (
                    <FormSection name={`suspensoes_${period.nome}`}>
                      <div className="form-row">
                        <Field component={"input"} type="hidden" name="value" />
                        <div className="form-check col-md-3 mr-4">
                          <div
                            className={`period-quantity number-${key} pl-5 pt-2 pb-2`}
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
                                    `suspensoes_${period.nome}.check`,
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
                            component={InputText}
                            disabled={!checkMap[period.nome]}
                            type="number"
                            name="numero_de_alunos"
                            min="0"
                            className="form-control"
                            required
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
                <div className="form-group pb-5">
                  <Field
                    component={TextAreaWYSIWYG}
                    label="Observações"
                    name="observacao"
                  />
                </div>
                <div className="form-group row float-right mt-4">
                  <div className="col-12">
                    <Botao
                      texto="Cancelar"
                      onClick={event => this.resetForm(event)}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto={this.state.salvarAtualizarLbl}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values
                        })
                      )}
                      className="ml-3"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                    />
                    <Botao
                      texto="Enviar Solicitação"
                      type={BUTTON_TYPE.SUBMIT}
                      onClick={handleSubmit(values =>
                        this.onSubmit({
                          ...values,
                          status: STATUS_DRE_A_VALIDAR
                        })
                      )}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const FoodSuspensionEditorForm = reduxForm({
  form: "foodSuspension",
  enableReinitialize: true
})(FoodSuspensionEditor);
const selector = formValueSelector("foodSuspension");
const mapStateToProps = state => {
  return {
    initialValues: state.suspensaoDeAlimentacao.data,
    suspensoes_MANHA: selector(state, "suspensoes_MANHA"),
    suspensoes_TARDE: selector(state, "suspensoes_TARDE"),
    suspensoes_NOITE: selector(state, "suspensoes_NOITE"),
    suspensoes_INTEGRAL: selector(state, "suspensoes_INTEGRAL")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFoodSuspension
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodSuspensionEditorForm);
