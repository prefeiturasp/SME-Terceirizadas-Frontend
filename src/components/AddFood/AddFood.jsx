import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import StatefulMultiSelect from '@khanacademy/react-multi-select';
import { Field, reduxForm, formValueSelector } from "redux-form";
import { LabelAndDate, LabelAndTextArea, LabelAndCombo } from "../Shareable/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { required } from "../../helpers/fieldValidators";
import "../Shareable/custom.css";
import Weekly from '../Shareable/Weekly'
import { AddFoodItemList } from "./addFoodItemList";

class AddFoodEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFoodList: [],
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
    let value = e.target.value
    this.props.handleSelectedReason(value)
  }

  handleSelectedChanged = (integrateOptions) => {
    this.setState({
      ...this.state,
      integrateOptions
    })
    this.props.change("integrate_select", integrateOptions);
  }

  fontHeader = {
    color: "#686868"
  }
  bgMorning = {
    background: "#FFF7CB"
  }

  OnDeleteButtonClicked(id) {
    axios.delete(`http://localhost:3004/addfood/${id}`).then(res => {
      this.refresh();
    });
  }

  resetForm(event) {
    this.props.reset();
    this.setState({
      status: "SEM STATUS",
      title: "Nova Inclusão de Cardápio",
      salvarAtualizarLbl: "Salvar",
      id: '',
      integrateOptions: []
    });
  }

  OnEditButtonClicked(param) {
    this.props.reset();
    this.props.change("motivo", param.dayChange.motivo);
    this.props.change("obs", param.dayChange.obs);
    this.props.change("first_period_check", param.dayChange.first_period_check);
    this.props.change("first_period_select", param.dayChange.first_period_select);
    this.props.change("first_period_number", param.dayChange.first_period_number);
    this.props.change("second_period_check", param.dayChange.second_period_check);
    this.props.change("second_period_select", param.dayChange.second_period_select);
    this.props.change("second_period_number", param.dayChange.second_period_number);
    this.props.change("third_period_check", param.dayChange.third_period_check);
    this.props.change("third_period_select", param.dayChange.third_period_select);
    this.props.change("third_period_number", param.dayChange.third_period_number);
    this.props.change("fourth_period_check", param.dayChange.fourth_period_check);
    this.props.change("fourth_period_select", param.dayChange.fourth_period_select);
    this.props.change("fourth_period_number", param.dayChange.fourth_period_number);
    this.props.change("integrate_check", param.dayChange.integrate_check);
    this.props.change("integrate_select", param.dayChange.integrate_select);
    this.props.change("integrate_number", param.dayChange.integrate_number);
    this.props.change("reason_day", param.dayChange.reason_day);
    this.props.change("reason_from", param.dayChange.reason_from);
    this.props.change("reason_to", param.dayChange.reason_to);
    this.props.change("week", param.dayChange.week);
    this.props.change("period", param.dayChange.period);
    this.setState({
      status: param.dayChange.status,
      title: `Inclusão de Cardápio # ${param.dayChange.id}`,
      salvarAtualizarLbl: "Atualizar",
      id: param.dayChange.id,
      integrateOptions: param.dayChange.integrate_select !== undefined ?
                          param.dayChange.integrate_select :
                          this.state.integrateOptions
    });
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.firstPeriodCheck && !this.props.firstPeriodCheck){
      this.props.change("first_period_select", '');
      this.props.change("first_period_number", '');
    }
    if (prevProps.secondPeriodCheck && !this.props.secondPeriodCheck){
      this.props.change("second_period_select", '');
      this.props.change("second_period_number", '');
    }
    if (prevProps.thirdPeriodCheck && !this.props.thirdPeriodCheck){
      this.props.change("third_period_select", '');
      this.props.change("third_period_number", '');
    }
    if (prevProps.fourthPeriodCheck && !this.props.fourthPeriodCheck){
      this.props.change("fourth_period_select", '');
      this.props.change("fourth_period_number", '');
    }
    if (this.props.period !== 'Programa Contínuo - Mais Educação'){
      this.props.change("reason_from", '');
      this.props.change("reason_to", '');
      this.props.change("week", '');
    }
  }

  refresh() {
    axios.get(`http://localhost:3004/addfood/?status=SALVO`).then(res => {
      const addFoodList = res.data;
      this.setState({ addFoodList });
    });
  }

  onSubmit(values) {
    if (values.id) {
      //put
      axios
        .put(`http://localhost:3004/addfood/${values.id}`, values)
        .then(res => {
          this.refresh();
          console.log("PUT", res.data);
        });
    } else {
      axios.post(`http://localhost:3004/addfood/`, values).then(res => {
        this.refresh();
        console.log("POST", res.data);
      });
    }
  }

  render() {
    const { handleSubmit, pristine, submitting, enrolled, reasons, typeFood, periods,
            firstPeriodCheck, secondPeriodCheck, thirdPeriodCheck, fourthPeriodCheck,
            integrateCheck, firstPeriodSelect, secondPeriodSelect, thirdPeriodSelect,
            fourthPeriodSelect, period, typeFoodMulti } = this.props;
    const { title, integrateOptions } = this.state;
    const checkMap = {
      "first_period": firstPeriodCheck,
      "second_period": secondPeriodCheck,
      "third_period": thirdPeriodCheck,
      "fourth_period": fourthPeriodCheck,
      "integrate": integrateCheck
    }
    const selectMap = {
      "first_period": firstPeriodSelect,
      "second_period": secondPeriodSelect,
      "third_period": thirdPeriodSelect,
      "fourth_period": fourthPeriodSelect,
      "integrate": integrateOptions.length > 0
    }
    const colors = {
      "first_period": "#FFF7CB",
      "second_period": "#EAFFE3",
      "third_period": "#FFEED6",
      "fourth_period": "#E4F1FF",
      "integrate": "#EBEDFF",
    }
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <span className="page-title">Inclusão de Alimentação</span>
          <div className="card mt-3">
            <div className="card-body">
              <span className="blockquote-sme">Nº de Matriculados</span>
              <div></div>
              <span className="badge-sme badge-secondary-sme">{enrolled}</span>
              <span className="blockquote-sme pl-2 text-color-sme-silver">Informaçâo automática disponibilizada no Cadastro da Unidade Escolar</span>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <AddFoodItemList
                addFoodList={this.state.addFoodList}
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
              <div className="card-title font-weight-bold" style={this.fontHeader}>Descrição da Inclusão</div>
              <table className="table table-borderless">
                <tr>
                  <td>Período</td>
                  <td style={{"paddingLeft" : "9rem"}}>Tipo de Alimentação</td>
                  <td>Nº de Alunos</td>
                </tr>
              </table>
              {periods.map((period, key)=>{
                return <div className="form-row">
                  <div className="form-check col-md-3 mr-4 ml-4">
                    <div className="pl-5 pt-2 pb-2" style={{marginLeft: "-1.4rem", background: colors[period.value], borderRadius: "7px" }}>
                      <Field
                        component={"input"}
                        className="form-check-input"
                        type="checkbox"
                        name={`${period.value}_check`}
                      />
                      <label htmlFor={`${period.value}_check`} className="form-check-label"> {period.label}</label>
                    </div>
                  </div>
                  <div className="form-group col-md-5 mr-5">
                    {period.value === 'integrate' ?
                      <div className={!integrateCheck ? "multiselect-wrapper-disabled" : "multiselect-wrapper-enabled"}>
                        <Field
                          component={StatefulMultiSelect}
                          name={`${period.value}_select`}
                          selected={integrateOptions}
                          options={typeFoodMulti}
                          onSelectedChanged={this.handleSelectedChanged}
                          disableSearch={true}
                          overrideStrings={{
                            selectSomeItems: "Selecione",
                            allItemsAreSelected: "Todos os itens estão selecionados",
                            selectAll: "Todos"
                          }}
                        />
                      </div>
                      :
                      <Field
                        component={LabelAndCombo}
                        disabled={!checkMap[period.value]}
                        className="form-control"
                        name={`${period.value}_select`}
                        options={typeFood}
                      />
                    }
                  </div>
                  <div className="form-group col-md-2">
                    <Field
                      component={"input"}
                      disabled={!selectMap[period.value] || !checkMap[period.value]}
                      type="number"
                      name={`${period.value}_number`}
                      className="form-control"
                    />
                  </div>
                </div>
              })}
              <hr className="w-100" />
              <div className="card-title font-weight-bold" style={this.fontHeader}>Data da Inclusão</div>
              <div className="form-row">
                <div className="form-group col-sm-8">
                 <Field
                    component={LabelAndCombo}
                    name="period"
                    label="Período de alteração"
                    options={reasons}
                  />
                </div>
                {period !== 'Programa Contínuo - Mais Educação' && <div className="form-group col-sm-4">
                  <Field
                    component={LabelAndDate}
                    name="reason_day"
                    label="Dia"
                    validate={required}
                  />
                </div>}
              </div>
              {period === 'Programa Contínuo - Mais Educação' &&
              <div className="form-row">
                <div className="form-group col-sm-3">
                  <Field
                    component={LabelAndDate}
                    cols="4"
                    name="reason_from"
                    label="De"
                    validate={required}
                  />
                </div>
                <div className="form-group col-sm-3">
                  <Field
                    component={LabelAndDate}
                    cols="4"
                    name="reason_to"
                    label="Até"
                    validate={required}
                  />
                </div>
                <Field
                  component={Weekly}
                  name="week"
                  cols="12"
                  classNameArgs="form-group col-sm-4"
                  label="Repetir"
                />
              </div>
              }
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
                      status: "COMPLETO",
                      salvo_em: new Date()
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

const AddFoodEditorForm = reduxForm({
  form: "addFood"
})(AddFoodEditor);
const selector = formValueSelector('addFood')
const mapStateToProps = state => {
  return {
    firstPeriodCheck: selector(state, 'first_period_check'),
    secondPeriodCheck: selector(state, 'second_period_check'),
    thirdPeriodCheck: selector(state, 'third_period_check'),
    fourthPeriodCheck: selector(state, 'fourth_period_check'),
    integrateCheck: selector(state, 'integrate_check'),
    firstPeriodSelect: selector(state, 'first_period_select'),
    secondPeriodSelect: selector(state, 'second_period_select'),
    thirdPeriodSelect: selector(state, 'third_period_select'),
    fourthPeriodSelect: selector(state, 'fourth_period_select'),
    period: selector(state, 'period')
  }
}

export default connect(mapStateToProps)(AddFoodEditorForm);
