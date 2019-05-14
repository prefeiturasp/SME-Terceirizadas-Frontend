import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  createOrUpdateFoodInclusion,
  getSavedFoodInclusions
} from "../../services/foodInclusion.service";
import { validateSubmit } from "./FoodInclusionValidation";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Field, reduxForm, formValueSelector, FormSection } from "redux-form";
import {
  LabelAndDate,
  LabelAndTextArea,
  LabelAndCombo
} from "../Shareable/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { required } from "../../helpers/fieldValidators";
import "../Shareable/custom.css";
import Weekly from "../Shareable/Weekly";
import { FoodInclusionItemList } from "./FoodInclusionItemList";

class FoodInclusionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodInclusionList: [],
      status: "SEM STATUS",
      title: "Nova Inclusão de Cardápio",
      id: "",
      salvarAtualizarLbl: "Salvar",
      integrateOptions: [],
      periodsList: []
    };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  handleReason(e) {
    let value = e.target.value;
    this.props.handleSelectedReason(value);
  }

  handleSelectedChanged = integrateOptions => {
    this.setState({
      ...this.state,
      integrateOptions
    });
    this.props.change("integrate_select", integrateOptions);
  };

  fontHeader = {
    color: "#686868"
  };
  bgMorning = {
    background: "#FFF7CB"
  };

  OnDeleteButtonClicked(id) {
    axios.delete(`http://localhost:3004/food_inclusion/${id}`).then(res => {
      this.refresh();
    });
  }

  resetForm(event) {
    this.props.reset();
    this.setState({
      status: "SEM STATUS",
      title: "Nova Inclusão de Cardápio",
      salvarAtualizarLbl: "Salvar",
      id: "",
      integrateOptions: []
    });
  }

  OnEditButtonClicked(param) {
    this.props.reset();
    this.props.change("uuid", param.dayChange.uuid);
    this.props.change("obs", param.dayChange.obs);
    this.props.change(
      "description_first_period",
      param.dayChange.description_first_period
    );
    this.props.change(
      "description_second_period",
      param.dayChange.description_second_period
    );
    this.props.change(
      "description_third_period",
      param.dayChange.description_third_period
    );
    this.props.change(
      "description_fourth_period",
      param.dayChange.description_fourth_period
    );
    this.props.change(
      "description_integrate",
      param.dayChange.description_integrate
    );
    this.props.change("date", param.dayChange.date);
    this.props.change("date_from", param.dayChange.date_from);
    this.props.change("date_to", param.dayChange.date_to);
    this.props.change("weekdays", param.dayChange.weekdays);
    this.props.change("reason", param.dayChange.reason);
    this.setState({
      status: param.dayChange.status,
      title: `Inclusão de Cardápio # ${param.dayChange.id}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.dayChange.id,
      integrateOptions:
        param.dayChange.description_integrate !== null
          ? param.dayChange.description_integrate.select
          : this.state.integrateOptions
    });
  }

  componentDidMount() {
    this.refresh();
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
    if (this.props.reason !== "Programa Contínuo - Mais Educação") {
      this.props.change("date_from", "");
      this.props.change("date_to", "");
      this.props.change("weekdays", "");
    }
  }

  refresh() {
    getSavedFoodInclusions("8b0673c4-34bb-4ca5-aaa6-d5ccc9588990").then(res => {
      this.setState({
        ...this.state,
        foodInclusionList: res.content.food_inclusions
      });
    });
  }

  onSubmit(values) {
    validateSubmit(values);
    createOrUpdateFoodInclusion(
      "8b0673c4-34bb-4ca5-aaa6-d5ccc9588990",
      JSON.stringify(values)
    ).then(res => {
      console.log(res);
      this.refresh();
    })

  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      enrolled,
      reasons,
      periods,
      typeFood,
      firstPeriod,
      secondPeriod,
      thirdPeriod,
      fourthPeriod,
      integrate,
      reason,
      typeFoodMulti
    } = this.props;
    const { title, integrateOptions, foodInclusionList } = this.state;
    const checkMap = {
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
          <div className="card mt-3">
            <div className="card-body">
              <FoodInclusionItemList
                foodInclusionList={foodInclusionList}
                OnDeleteButtonClicked={this.OnDeleteButtonClicked}
                resetForm={event => this.resetForm(event)}
                OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
              />
            </div>
          </div>
          <div className="form-row mt-3 ml-1">
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
                          <Field
                            component={"input"}
                            className="form-check-input"
                            type="checkbox"
                            name="check"
                          />
                          <label htmlFor="check" className="form-check-label">
                            {" "}
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
                              name="select"
                              selected={integrateOptions}
                              options={typeFoodMulti}
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
                            options={typeFood}
                          />
                        )}
                      </div>
                      <div className="form-group col-md-2">
                        <Field
                          component={"input"}
                          disabled={
                            !selectMap[period.value] || !checkMap[period.value]
                          }
                          type="number"
                          name="number"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </FormSection>
                );
              })}
              <hr className="w-100" />
              <div
                className="card-title font-weight-bold"
                style={this.fontHeader}
              >
                Data da Inclusão
              </div>
              <div className="form-row">
                <div className="form-group col-sm-8">
                  <Field
                    component={LabelAndCombo}
                    name="reason"
                    label="Período de alteração"
                    options={reasons}
                  />
                </div>
                {reason !== "Programa Contínuo - Mais Educação" && (
                  <div className="form-group col-sm-4">
                    <Field
                      component={LabelAndDate}
                      name="date"
                      label="Dia"
                      validate={required}
                    />
                  </div>
                )}
              </div>
              {reason === "Programa Contínuo - Mais Educação" && (
                <div className="form-row">
                  <div className="form-group col-sm-3">
                    <Field
                      component={LabelAndDate}
                      cols="4"
                      name="date_from"
                      label="De"
                      validate={required}
                    />
                  </div>
                  <div className="form-group col-sm-3">
                    <Field
                      component={LabelAndDate}
                      cols="4"
                      name="date_to"
                      label="Até"
                      validate={required}
                    />
                  </div>
                  <Field
                    component={Weekly}
                    name="weekdays"
                    cols="12"
                    classNameArgs="form-group col-sm-4"
                    label="Repetir"
                  />
                </div>
              )}
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
        </form>
      </div>
    );
  }
}

const FoodInclusionEditorForm = reduxForm({
  form: "foodInclusion"
})(FoodInclusionEditor);
const selector = formValueSelector("foodInclusion");
const mapStateToProps = state => {
  return {
    firstPeriod: selector(state, "description_first_period"),
    secondPeriod: selector(state, "description_second_period"),
    thirdPeriod: selector(state, "description_third_period"),
    fourthPeriod: selector(state, "description_fourth_period"),
    integrate: selector(state, "description_integrate"),
    reason: selector(state, "reason")
  };
};

export default connect(mapStateToProps)(FoodInclusionEditorForm);
