import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import {
  createOrUpdateFoodInclusion,
  deleteFoodInclusion,
  getSavedFoodInclusions
} from "../../services/foodInclusion.service";
import { getWorkingDays } from "../../services/workingDays.service";
import { validateSubmit } from "./FoodInclusionValidation";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Field, reduxForm, formValueSelector, FormSection } from "redux-form";
import {
  LabelAndDate,
  LabelAndTextArea,
  LabelAndCombo,
  LabelAndInput
} from "../Shareable/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { required } from "../../helpers/fieldValidators";
import "../Shareable/custom.css";
import Weekly from "../Shareable/Weekly";
import { Modal } from "react-bootstrap";
import { FoodInclusionItemList } from "./FoodInclusionItemList";
import { toastSuccess, toastError } from "../Shareable/dialogs";
import { loadFoodInclusion } from "../../reducers/foodInclusionReducer"

class FoodInclusionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodInclusionList: [],
      status: "SEM STATUS",
      title: "Nova Inclusão de Cardápio",
      id: "",
      two_working_days: null,
      five_working_days: null,
      showModal: false,
      salvarAtualizarLbl: "Salvar Rascunho",
      day_reasons: [
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          date: null,
          reason: null,
          date_from: null,
          date_to: null,
          weekdays: []
        }
      ],
      integrateOptions: [],
      selectDefault: [
        {
          key: 0,
          label: "Selecione",
          value: ""
        }
      ]
    };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.addDay = this.addDay.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.refresh = this.refresh.bind(this);
    this.titleRef = React.createRef();
  }

  handleReason(value, id) {
    var foundIndex = this.state.day_reasons.findIndex(x => x.id === id);
    var day_reasons = this.state.day_reasons;
    day_reasons[foundIndex].reason = value;
    this.setState({
      ...this.state,
      day_reasons: day_reasons
    });
  }

  handleWhichReason(event, id) {
    var foundIndex = this.state.day_reasons.findIndex(x => x.id === id);
    var day_reasons = this.state.day_reasons;
    day_reasons[foundIndex].which_reason = event.target.value;
    this.setState({
      ...this.state,
      day_reasons: day_reasons
    });
  }

  handleDate(value, id) {
    var foundIndex = this.state.day_reasons.findIndex(x => x.id === id);
    var day_reasons = this.state.day_reasons;
    day_reasons[foundIndex].date = value;
    let showModal = false;
    const _date = value.split("/");
    if (
      this.state.two_working_days <=
        new Date(_date[2], _date[1] - 1, _date[0]) &&
      new Date(_date[2], _date[1] - 1, _date[0]) < this.state.five_working_days
    ) {
      showModal = true;
    }
    this.setState({
      ...this.state,
      day_reasons: day_reasons
    });
    if (showModal) {
      this.showModal();
    }
  }

  handleDateFrom(value, id) {
    var foundIndex = this.state.day_reasons.findIndex(x => x.id === id);
    var day_reasons = this.state.day_reasons;
    day_reasons[foundIndex].date_from = value;
    this.setState({
      ...this.state,
      day_reasons: day_reasons
    });
  }

  handleDateTo(value, id) {
    var foundIndex = this.state.day_reasons.findIndex(x => x.id === id);
    var day_reasons = this.state.day_reasons;
    day_reasons[foundIndex].date_to = value;
    this.setState({
      ...this.state,
      day_reasons: day_reasons
    });
  }

  handleWeekly(value, id) {
    var foundIndex = this.state.day_reasons.findIndex(x => x.id === id);
    var day_reasons = this.state.day_reasons;
    day_reasons[foundIndex].weekdays = value;
    this.setState({
      ...this.state,
      day_reasons: day_reasons
    });
  }

  closeModal(e) {
    this.setState({ ...this.state, showModal: false });
  }

  addDay() {
    this.setState({
      day_reasons: this.state.day_reasons.concat([
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          date: null,
          reason: null,
          date_from: null,
          date_to: null,
          weekdays: []
        }
      ])
    });
  }

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  handleSelectedChanged = integrateOptions => {
    this.setState({
      ...this.state,
      integrateOptions
    });
    this.props.change("description_integrate.select", integrateOptions);
  };

  fontHeader = {
    color: "#686868"
  };
  bgMorning = {
    background: "#FFF7CB"
  };

  OnDeleteButtonClicked(id, uuid) {
    deleteFoodInclusion(
      this.props.user_id,
      JSON.stringify({ uuid: uuid })
    ).then(
      res => {
        if (res.code === 200) {
          toastSuccess(`Rascunho # ${id} excluído com sucesso`);
          this.refresh();
        } else {
          toastError(res.log_content[0]);
        }
      },
      function(error) {
        toastError("Houve um erro ao excluir o rascunho");
      }
    );
  }

  resetForm(event) {
    this.props.loadFoodInclusion(null);
    this.setState({
      status: "SEM STATUS",
      title: "Nova Inclusão de Alimentação",
      salvarAtualizarLbl: "Salvar Rascunho",
      id: "",
      integrateOptions: [],
      day_reasons: [
        {
          id: Math.floor(Math.random() * (1000000 - 9999999)) + 1000000,
          date: null,
          reason: null,
          date_from: null,
          date_to: null,
          weekdays: []
        }
      ]
    });
  }

  OnEditButtonClicked(param) {
    this.props.reset('foodInclusion');
    this.props.loadFoodInclusion(param.dayChange);
    this.setState({
      status: param.dayChange.status,
      title: `Inclusão de Cardápio # ${param.dayChange.id}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.dayChange.id,
      day_reasons: param.dayChange.day_reasons,
      integrateOptions:
        param.dayChange.description_integrate !== null
          ? param.dayChange.description_integrate.select
          : this.state.integrateOptions
    });
    window.scrollTo(0, this.titleRef.current.offsetTop - 90);
  }

  componentDidMount() {
    this.refresh();
    getWorkingDays().then(res => {
      const _two = res[0].date_two_working_days.split("/");
      const _five = res[0].date_five_working_days.split("/");
      this.setState({
        ...this.state,
        two_working_days: new Date(_two[2], _two[1] - 1, _two[0]),
        five_working_days: new Date(_five[2], _five[1] - 1, _five[0])
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.firstPeriod &&
      prevProps.firstPeriod.check &&
      this.props.firstPeriod &&
      !this.props.firstPeriod.check
    ) {
      this.props.change("description_first_period.select", "");
      this.props.change("description_first_period.number", "");
    }
    if (
      prevProps.secondPeriod &&
      prevProps.secondPeriod.check &&
      this.props.secondPeriod &&
      !this.props.secondPeriod.check
    ) {
      this.props.change("description_second_period.select", "");
      this.props.change("description_second_period.number", "");
    }
    if (
      prevProps.thirdPeriod &&
      prevProps.thirdPeriod.check &&
      this.props.thirdPeriod &&
      !this.props.thirdPeriod.check
    ) {
      this.props.change("description_third_period.select", "");
      this.props.change("description_third_period.number", "");
    }
    if (
      prevProps.fourthPeriod &&
      prevProps.fourthPeriod.check &&
      this.props.fourthPeriod &&
      !this.props.fourthPeriod.check
    ) {
      this.props.change("description_fourth_period.select", "");
      this.props.change("description_fourth_period.number", "");
    }
    if (
      prevProps.integrate &&
      prevProps.integrate.check &&
      this.props.integrate &&
      !this.props.integrate.check
    ) {
      this.setState({
        ...this.state,
        integrateOptions: []
      });
      this.props.change("description_integrate.number", "");
    }
    if (this.props.reason && !this.props.reason.includes("Programa Contínuo")) {
      this.props.change("date_from", "");
      this.props.change("date_to", "");
      this.props.change("weekdays", "");
    }
  }

  refresh() {
    getSavedFoodInclusions(this.props.user_id).then(
      res => {
        this.setState({
          ...this.state,
          foodInclusionList: res.content.food_inclusions
        });
      },
      function(error) {
        toastError("Erro ao carregar as inclusões salvas");
      }
    );
    this.resetForm('foodInclusion');
  }

  onSubmit(values) {
    values.day_reasons = this.state.day_reasons;
    const error = validateSubmit(values, this.state);
    if (!error) {
      createOrUpdateFoodInclusion(
        this.props.user_id,
        JSON.stringify(values)
      ).then(
        res => {
          if (res.code === 200) {
            toastSuccess(
              (values.status === "SALVO"
                ? "Rascunho salvo"
                : "Inclusão de Alimentação enviada") + " com sucesso"
            );
            this.refresh();
          } else {
            toastError(res.log_content[0]);
          }
        },
        function(error) {
          toastError("Houve um erro ao salvar a inclusão de alimentação");
        }
      );
      this.closeModal();
    } else {
      toastError(error);
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      enrolled,
      reasons_simple,
      reasons_continuous_program,
      periods,
      firstPeriod,
      secondPeriod,
      thirdPeriod,
      fourthPeriod,
      integrate,
      typeFoodContinuousProgram
    } = this.props;
    const {
      title,
      integrateOptions,
      foodInclusionList,
      selectDefault,
      two_working_days,
      day_reasons,
      showModal
    } = this.state;
    let checkMap = {
      first_period: firstPeriod && firstPeriod.check,
      second_period: secondPeriod && secondPeriod.check,
      third_period: thirdPeriod && thirdPeriod.check,
      fourth_period: fourthPeriod && fourthPeriod.check,
      integrate: integrate && integrate.check
    };
    const selectMap = {
      first_period: firstPeriod && firstPeriod.select,
      second_period: secondPeriod && secondPeriod.select,
      third_period: thirdPeriod && thirdPeriod.select,
      fourth_period: fourthPeriod && fourthPeriod.select,
      integrate: integrate && integrateOptions.length > 0
    };
    const colors = {
      first_period: "#FFF7CB",
      second_period: "#EAFFE3",
      third_period: "#FFEED6",
      fourth_period: "#E4F1FF",
      integrate: "#EBEDFF"
    };
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <Field component={"input"} type="hidden" name="uuid" />
          <span className="page-title">Inclusão de Alimentação</span>
          <div className="card mt-3">
            <div className="card-body">
              <span className="blockquote-sme">Nº de Matriculados</span>
              <div />
              <span className="badge-sme badge-secondary-sme">{enrolled}</span>
              <span className="blockquote-sme pl-2 text-color-sme-silver">
                Informação automática disponibilizada no Cadastro da Unidade
                Escolar
              </span>
            </div>
          </div>
          {foodInclusionList.length > 0 && (
            <div className="card mt-3">
              <div className="card-body">
                <span className="page-title">Rascunhos</span>
                <FoodInclusionItemList
                  foodInclusionList={foodInclusionList}
                  OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                  resetForm={event => this.resetForm(event)}
                  OnEditButtonClicked={params =>
                    this.OnEditButtonClicked(params)
                  }
                />
              </div>
            </div>
          )}
          <div ref={this.titleRef} className="form-row mt-3 ml-1">
            <h3 className="bold" style={{ color: "#353535" }}>
              {title}
            </h3>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <div
                className="card-title font-weight-bold"
                style={this.fontHeader}
              >
                Descrição da Inclusão
              </div>
              {day_reasons.map((day_reason, key) => {
                return (
                  <FormSection name={`day_reasons_${day_reason.id}`}>
                    <div className="form-row">
                      {(!day_reason.reason ||
                        !day_reason.reason.includes("Programa Contínuo")) && (
                        <div className="form-group col-sm-3">
                          <Field
                            component={LabelAndDate}
                            name="date"
                            onChange={value =>
                              this.handleDate(value, day_reason.id)
                            }
                            minDate={two_working_days}
                            label="Dia"
                            validate={required}
                          />
                        </div>
                      )}
                      <div className="form-group col-sm-8">
                        <Field
                          component={LabelAndCombo}
                          name="reason"
                          label="Motivo"
                          onChange={value =>
                            this.handleReason(value, day_reason.id)
                          }
                          options={
                            day_reasons.length > 1
                              ? selectDefault.concat(reasons_simple)
                              : selectDefault
                                  .concat(reasons_simple)
                                  .concat(reasons_continuous_program)
                          }
                          validate={required}
                        />
                      </div>
                    </div>
                    {day_reason.reason && day_reason.reason.includes("Outro") && (
                      <div className="form-row">
                        <div
                          className={
                            !day_reason.reason ||
                            !day_reason.reason.includes(
                              "Programa Contínuo - Outro"
                            )
                              ? "form-group col-sm-8 offset-sm-3"
                              : "form-group col-sm-8"
                          }
                        >
                          <Field
                            component={LabelAndInput}
                            label="Qual o motivo?"
                            onChange={event =>
                              this.handleWhichReason(event, day_reason.id)
                            }
                            name="which_reason"
                            className="form-control"
                            validate={required}
                          />
                        </div>
                      </div>
                    )}
                    {day_reason.reason &&
                      day_reason.reason.includes("Programa Contínuo") && (
                        <div className="form-row">
                          <div className="form-group col-sm-3">
                            <Field
                              component={LabelAndDate}
                              cols="4"
                              onChange={value =>
                                this.handleDateFrom(value, day_reason.id)
                              }
                              name="date_from"
                              label="De"
                              validate={required}
                            />
                          </div>
                          <div className="form-group col-sm-3">
                            <Field
                              component={LabelAndDate}
                              cols="4"
                              onChange={value =>
                                this.handleDateTo(value, day_reason.id)
                              }
                              name="date_to"
                              label="Até"
                              validate={required}
                            />
                          </div>
                          <Field
                            component={Weekly}
                            name="weekdays"
                            cols="12"
                            onChange={value =>
                              this.handleWeekly(value, day_reason.id)
                            }
                            classNameArgs="form-group col-sm-4"
                            label="Repetir"
                          />
                        </div>
                      )}
                  </FormSection>
                );
              })}
              <BaseButton
                label="Adicionar dia"
                className="col-sm-3"
                onClick={() => this.addDay()}
                disabled={
                  day_reasons[0].reason &&
                  day_reasons[0].reason.includes("Programa Contínuo")
                }
                style={ButtonStyle.OutlinePrimary}
              />
              <table className="table table-borderless">
                <tr>
                  <td>Período</td>
                  <td style={{ paddingLeft: "9rem" }}>Tipo de Alimentação</td>
                  <td>Nº de Alunos</td>
                </tr>
              </table>
              {periods.map((period, key) => {
                this.props.change(
                  `description_${period.value}.value`,
                  period.value
                );
                return (
                  <FormSection name={`description_${period.value}`}>
                    <div className="form-row">
                      <Field component={"input"} type="hidden" name="value" />
                      <div className="form-check col-md-3 mr-4 ml-4">
                        <div
                          className="pl-5 pt-2 pb-2"
                          style={{
                            marginLeft: "-1.4rem",
                            background: colors[period.value],
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
                                  `description_${period.value}.check`,
                                  !checkMap[period.value]
                                )
                              }
                              className="checkbox-custom"
                            />{" "}
                            {period.label}
                          </label>
                        </div>
                      </div>
                      <div className="form-group col-md-5 mr-5">
                        {period.value === "integrate" ? (
                          <div
                            className={
                              integrate && integrate.check
                                ? "multiselect-wrapper-enabled"
                                : "multiselect-wrapper-disabled"
                            }
                          >
                            <Field
                              component={StatefulMultiSelect}
                              name=".select"
                              selected={integrateOptions}
                              options={typeFoodContinuousProgram}
                              onSelectedChanged={this.handleSelectedChanged}
                              disableSearch={true}
                              overrideStrings={{
                                selectSomeItems: "Selecione",
                                allItemsAreSelected:
                                  "Todos os itens estão selecionados",
                                selectAll: "Todos"
                              }}
                            />
                          </div>
                        ) : (
                          <Field
                            component={LabelAndCombo}
                            disabled={!checkMap[period.value]}
                            className="form-control"
                            name="select"
                            options={
                              day_reasons[0].reason &&
                              day_reasons[0].reason.includes(
                                "Programa Contínuo"
                              )
                                ? selectDefault.concat(
                                    typeFoodContinuousProgram
                                  )
                                : selectDefault.concat(period.meal_types)
                            }
                            validate={checkMap[period.value] ? required : null}
                          />
                        )}
                      </div>
                      <div className="form-group col-md-2">
                        <Field
                          component={LabelAndInput}
                          disabled={
                            !selectMap[period.value] || !checkMap[period.value]
                          }
                          type="number"
                          name="number"
                          min="0"
                          className="form-control"
                          validate={checkMap[period.value] ? required : null}
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
                  name="obs"
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
                  onClick={handleSubmit(values =>
                    this.onSubmit({
                      ...values,
                      status: "SALVO",
                      salvo_em: new Date(),
                      id: this.state.id
                    })
                  )}
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
                      status: "A_VALIDAR"
                    })
                  )}
                  style={ButtonStyle.Primary}
                  className="ml-3"
                />
              </div>
            </div>
          </div>
          <Modal show={showModal} onHide={this.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Atenção</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Atenção, a solicitação está fora do prazo contratual (entre{" "}
              <b>2 e 5 dias úteis</b>). Sendo assim, a autorização dependerá da
              disponibilidade dos alimentos adequados para o cumprimento do
              cardápio.
            </Modal.Body>
            <Modal.Footer>
              <BaseButton
                label="OK"
                type={ButtonType.BUTTON}
                onClick={this.closeModal}
                style={ButtonStyle.Primary}
                className="ml-3"
              />
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    );
  }
}

const FoodInclusionEditorForm = reduxForm({
  form: "foodInclusion",
  enableReinitialize: true
})(FoodInclusionEditor);
const selector = formValueSelector("foodInclusion");
const mapStateToProps = state => {
  return {
    initialValues: state.foodInclusion.data,
    firstPeriod: selector(state, "description_first_period"),
    secondPeriod: selector(state, "description_second_period"),
    thirdPeriod: selector(state, "description_third_period"),
    fourthPeriod: selector(state, "description_fourth_period"),
    integrate: selector(state, "description_integrate")
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFoodInclusion,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(FoodInclusionEditorForm);
