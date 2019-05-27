import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, FormSection, reduxForm } from "redux-form";
import {
  LabelAndDate,
  LabelAndTextArea,
  LabelAndCombo,
  LabelAndInput
} from "../Shareable/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { Grid } from "../Shareable/responsiveBs4";
import { Modal } from "react-bootstrap";
import { Collapse } from "react-collapse";
import { Stand } from "react-burgers";
import { required, maxValue } from "../../helpers/fieldValidators";
import SelecionaTempoPasseio from "../TourRequest/TourRequestCheck";
import SelecionaKitLancheBox from "../TourRequest/SelecionaKitLancheBox";
import { adapterEnumKits } from "../TourRequest/ConvertToFormat";
import { getRefeicoesApi } from "../../services/tourRequest.service";
import "../Shareable/custom.css";

export const HORAS_ENUM = {
  _4: { tempo: "4h", qtd_kits: 1, label: "até 4 horas - 1 kit" },
  _5a7: { tempo: "5_7h", qtd_kits: 2, label: "de 5 a 7 horas - 2 kits" },
  _8: { tempo: "8h", qtd_kits: 3, label: "8 horas ou mais - 3 kits" }
};

class UnifiedSolicitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolsFiltered: [],
      schoolsTotal: 0,
      qtd_kit_lanche: 0,
      radioChanged: false,
      enumKits: null,
      kitsTotal: 0,
      choicesTotal: 0,
      studentsTotal: 0,
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
      selectDefault: [
        {
          key: 0,
          label: "Selecione",
          value: ""
        }
      ]
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.filterList = this.filterList.bind(this);
    this.setNumeroDeKitLanches = this.setNumeroDeKitLanches.bind(this);
  }

  componentDidMount() {
    this.props.change("schools_total", 0);
    this.props.change("kits_total", 0);

    getRefeicoesApi()
      .then(response => {
        this.setState({
          enumKits: adapterEnumKits(response)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setNumeroDeKitLanches = (event, newValue, previousValue, name) => {
    const parser = {
      "4h": HORAS_ENUM._4.qtd_kits,
      "5_7h": HORAS_ENUM._5a7.qtd_kits,
      "8h": HORAS_ENUM._8.qtd_kits
    };
    let newQuantity = parser[event];
    this.setState({
      ...this.state,
      qtd_kit_lanche: newQuantity,
      radioChanged: event !== previousValue
    });
  };

  handleSelecionaKitLancheBox(school, value) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      x => x.id === school.id
    );
    var schoolsFiltered = this.state.schoolsFiltered;
    schoolsFiltered[foundIndex].number_of_choices = value.length;
    schoolsFiltered = this.setNumberOfMealKits(school);
    this.setState({
      ...this.state,
      schoolsFiltered: schoolsFiltered
    });
    this.handleKitsTotal();
  }

  handleNumberOfStudents(school, event) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      x => x.id === school.id
    );
    let schoolsFiltered = this.state.schoolsFiltered;
    schoolsFiltered[foundIndex].number_of_students = event.target.value;
    schoolsFiltered = this.setNumberOfMealKits(school);
    this.setState({
      ...this.state,
      schoolsFiltered: schoolsFiltered
    });
    this.handleKitsTotal();
  }

  setNumberOfMealKits(school) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      x => x.id === school.id
    );
    var schoolsFiltered = this.state.schoolsFiltered;
    if (schoolsFiltered[foundIndex].checked) {
      schoolsFiltered[foundIndex].number_of_meal_kits =
        schoolsFiltered[foundIndex].number_of_choices *
        schoolsFiltered[foundIndex].number_of_students;
    } else {
      schoolsFiltered[foundIndex].number_of_meal_kits = 0;
    }
    return schoolsFiltered;
  }

  componentDidUpdate(prevProps) {
    if (this.props.schools.length !== prevProps.schools.length) {
      this.setState({
        ...this.state,
        schoolsFiltered: this.props.schools
      });
    }
  }

  handleCheck(school) {
    var foundIndex = this.state.schoolsFiltered.findIndex(
      x => x.id === school.id
    );
    let schoolsFiltered = this.state.schoolsFiltered;
    school.checked = !school.checked;
    schoolsFiltered[foundIndex].checked = school.checked;
    this.props.change(`${school.slug}.check`, school.checked);
    schoolsFiltered = this.setNumberOfMealKits(school);
    this.setState({
      ...this.state,
      schoolsFiltered: schoolsFiltered
    });
    this.handleKitsTotal();
  }

  handleKitsTotal() {
    const schoolsFiltered = this.state.schoolsFiltered;
    let kitsTotal = 0;
    let schoolsTotal = 0;
    schoolsFiltered.forEach(function(school) {
      if (school.checked) {
        kitsTotal += school.number_of_choices * school.number_of_students;
        schoolsTotal += 1;
      }
    });
    this.setState({
      ...this.state,
      kitsTotal: kitsTotal,
      schoolsTotal: schoolsTotal
    });
  }

  handleField(field, value, id) {
    const foundIndex = this.state.day_reasons.findIndex(x => x.id === id);
    let day_reasons = this.state.day_reasons;
    if (field === "which_reason") value = value.target.value;
    day_reasons[foundIndex][field] = value;
    this.setState({
      ...this.state,
      day_reasons: day_reasons
    });
    if (field === "date") {
      const _date = value.split("/");
      if (
        this.props.two_working_days <=
          new Date(_date[2], _date[1] - 1, _date[0]) &&
        new Date(_date[2], _date[1] - 1, _date[0]) <
          this.props.five_working_days
      ) {
        this.showModal();
      }
    }
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

  changeBurger(school) {
    school.burger_active = !school.burger_active;
    this.forceUpdate();
  }

  closeModal(e) {
    this.setState({ ...this.state, showModal: false });
  }

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  handleSubmit = values => {
    console.log(values);
  }

  filterList(event) {
    if (event === undefined) event = { target: { value: "" } };
    let schoolsFiltered = this.props.schools;
    schoolsFiltered = schoolsFiltered.filter(function(item) {
      const wordToFilter = event.target.value.toLowerCase();
      return (
        item.nome.toLowerCase().search(wordToFilter) !== -1 ||
        item.id.includes(wordToFilter)
      );
    });
    this.setState({ schoolsFiltered });
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      enrolled,
      two_working_days,
      reasons_continuous_program,
      reasons_simple,
      multipleOrder
    } = this.props;
    const {
      day_reasons,
      selectDefault,
      showModal,
      schoolsFiltered,
      enumKits,
      kitsTotal,
      choicesTotal,
      studentsTotal,
      schoolsTotal
    } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <span className="page-title">Solicitação Unificada</span>
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
                          this.handleField("date", value, day_reason.id)
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
                        this.handleField("reason", value, day_reason.id)
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
                        !day_reason.reason.includes("Programa Contínuo - Outro")
                          ? "form-group col-sm-8 offset-sm-3"
                          : "form-group col-sm-8"
                      }
                    >
                      <Field
                        component={LabelAndInput}
                        label="Qual o motivo?"
                        onChange={event =>
                          this.handleField("which_reason", event, day_reason.id)
                        }
                        name="which_reason"
                        className="form-control"
                        validate={required}
                      />
                    </div>
                  </div>
                )}
              </FormSection>
            );
          })}
          <BaseButton
            label="Adicionar dia"
            type={ButtonType.BUTTON}
            className="col-sm-3"
            onClick={() => this.addDay()}
            disabled={
              day_reasons[0].reason &&
              day_reasons[0].reason.includes("Programa Contínuo")
            }
            style={ButtonStyle.OutlinePrimary}
          />
          <div style={{ paddingTop: "15px", paddingBottom: "30px" }}>
            <Field
              component={LabelAndInput}
              label="Local do evento"
              placeholder="Insira o local do evento"
              name="local_of_event"
              className="form-control"
              validate={required}
            />
          </div>
          <div className="col-md-12 pt-2 pb-2" style={{ paddingLeft: "2rem" }}>
            <label htmlFor="check" className="checkbox-label">
              <Field
                component={"input"}
                type="checkbox"
                name="multiple_order"
              />
              <span
                onClick={() =>
                  this.props.change("multiple_order", !multipleOrder)
                }
                className="checkbox-custom"
                style={{ borderRadius: "15px" }}
              />{" "}
              Realizar pedido múltiplo
            </label>
          </div>
          <Collapse isOpened={multipleOrder}>
            <div className="col-md-12">
              <div className="form-group row">
                <Field
                  component={LabelAndInput}
                  cols="6"
                  name="number_of_students"
                  onChange={event =>
                    this.setState({ studentsTotal: event.target.value })
                  }
                  type="number"
                  label="Número total de alunos participantes de todas as escolas"
                  validate={[required, maxValue(this.state.nro_matriculados)]}
                />
              </div>
            </div>
            <SelecionaTempoPasseio
              className="mt-3"
              onChange={(event, newValue, previousValue, name) =>
                this.setNumeroDeKitLanches(event, newValue, previousValue, name)
              }
            />
            {enumKits && (
              <SelecionaKitLancheBox
                className="mt-3"
                choicesNumberLimit={this.state.qtd_kit_lanche}
                onChange={value =>
                  this.setState({ choicesTotal: value.length })
                }
                showOptions={false}
                kits={enumKits}
              />
            )}
            <div className="form-group">
              <label className="bold">{"Número total kits:"}</label>
              <br />
              <Grid
                cols="1 1 1 1"
                className="border rounded p-2"
                style={{
                  background: "#E8E8E8"
                }}
              >
                <span className="bold d-flex justify-content-center">
                  {choicesTotal * studentsTotal}
                </span>
              </Grid>
            </div>
          </Collapse>
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar"
            onChange={this.filterList}
          />
          <div className="schools-group">
            {schoolsFiltered.length === 0 && (
              <p>
                Carregando escolas...{" "}
                <img src="/assets/image/ajax-loader.gif" alt="ajax-loader" />
              </p>
            )}
            {schoolsFiltered.length > 0 &&
              schoolsFiltered.map((school, key) => {
                return (
                  <FormSection name={school.slug}>
                    <div>
                      <div
                        className="school-container col-md-12 mr-4"
                        style={
                          school.burger_active ? { background: "#F2FBFE" } : {}
                        }
                      >
                        <div
                          className="col-md-12 pt-2 pb-2"
                          style={{ paddingLeft: "2rem" }}
                        >
                          <label htmlFor="check" className="checkbox-label">
                            <Field
                              component={"input"}
                              type="checkbox"
                              name="check"
                            />
                            <span
                              onClick={() => this.handleCheck(school)}
                              className="checkbox-custom"
                            />{" "}
                            {school._id + " - " + school.nome}
                          </label>
                          {!multipleOrder && (
                            <Stand
                              onClick={() => this.changeBurger(school)}
                              color={"#C8C8C8"}
                              width={30}
                              padding={0}
                              lineSpacing={5}
                              className="float-right"
                              active={school.burger_active}
                            />
                          )}
                        </div>
                        <Collapse isOpened={school.burger_active}>
                          <div className="col-md-12">
                            <div className="form-group row">
                              <Field
                                component={LabelAndInput}
                                cols="3 3 3 3"
                                name="number_of_students"
                                type="number"
                                onChange={event =>
                                  this.handleNumberOfStudents(school, event)
                                }
                                label="Número de alunos participantes"
                                validate={[
                                  required,
                                  maxValue(this.state.nro_matriculados)
                                ]}
                              />
                            </div>
                          </div>
                          <SelecionaTempoPasseio
                            className="mt-3"
                            onChange={(event, newValue, previousValue, name) =>
                              this.setNumeroDeKitLanches(
                                event,
                                newValue,
                                previousValue,
                                name
                              )
                            }
                          />
                          {enumKits && (
                            <SelecionaKitLancheBox
                              kits={enumKits}
                              showOptions={false}
                              className="mt-3"
                              onChange={value =>
                                this.handleSelecionaKitLancheBox(school, value)
                              }
                              choicesNumberLimit={this.state.qtd_kit_lanche}
                            />
                          )}
                          <div className="form-group">
                            <label className="bold">
                              {"Número total de kits dessa escola:"}
                            </label>
                            <br />
                            <Grid
                              cols="1 1 1 1"
                              className="border rounded p-2"
                              style={{
                                background: "#E8E8E8"
                              }}
                            >
                              <span className="bold d-flex justify-content-center">
                                {school.number_of_meal_kits || 0}
                              </span>
                            </Grid>
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  </FormSection>
                );
              })}
          </div>
          <div
            className="form-group"
            style={{ paddingTop: "30px", paddingBottom: "50px" }}
          >
            <div style={{ display: "grid" }} className="float-left">
              <label className="bold">Total de Unidades Escolares</label>
              <label>{schoolsTotal || 0}</label>
            </div>
            <div style={{ display: "grid" }} className="float-right">
              <label className="bold">Total de Kits</label>
              <label>
                {multipleOrder ? choicesTotal * studentsTotal : kitsTotal}
              </label>
            </div>
          </div>
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
              label={"Salvar Rascunho"}
              disabled={pristine || submitting}
              onClick={this.handleSubmit}
              className="ml-3"
              type={ButtonType.BUTTON}
              style={ButtonStyle.OutlinePrimary}
            />
            <BaseButton
              label="Enviar Solicitação"
              //disabled={pristine || submitting}
              type={"submit"}
              style={ButtonStyle.Primary}
              className="ml-3"
            />
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

const UnifiedSolicitationForm = reduxForm({
  form: "unifiedSolicitation",
  enableReinitialize: true
})(UnifiedSolicitation);

const selector = formValueSelector("unifiedSolicitation");
const mapStateToProps = state => {
  return {
    multipleOrder: selector(state, "multiple_order"),
    schoolsTotal: selector(state, "schools_total"),
    kitsTotal: selector(state, "kits_total")
  };
};

export default connect(mapStateToProps)(UnifiedSolicitationForm);
