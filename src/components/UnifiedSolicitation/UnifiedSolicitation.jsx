import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, FormSection, reduxForm } from "redux-form";
import {
  LabelAndDate,
  LabelAndTextArea,
  LabelAndCombo,
  LabelAndInput
} from "../Shareable/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { Grid } from "../Shareable/responsiveBs4";
import { Modal } from "react-bootstrap";
import { Collapse } from 'react-collapse';
import { Stand } from "react-burgers";
import { required, maxValue } from "../../helpers/fieldValidators";
import SelecionaTempoPasseio from "../TourRequest/TourRequestCheck";
import SelecionaKitLancheBox from '../TourRequest/SelecionaKitLancheBox'
import "../Shareable/custom.css";

class UnifiedSolicitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schoolsFiltered: [],
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
    this.filterList = this.filterList.bind(this);
  }

  componentDidUpdate(prevProps){
    if (this.props.schools.length !== 0 && prevProps.schools.length === 0) {
      this.setState({
        ...this.state,
        schoolsFiltered: this.props.schools
      })
    }
  }

  handleField(field, value, id) {
    var foundIndex = this.state.day_reasons.findIndex(x => x.id === id);
    var day_reasons = this.state.day_reasons;
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
    console.log(school.burger_active);
    this.forceUpdate();
  }

  closeModal(e) {
    this.setState({ ...this.state, showModal: false });
  }

  showModal() {
    this.setState({ ...this.state, showModal: true });
  }

  filterList(event){
    var updatedList = this.props.schools;
    updatedList = updatedList.filter(function(item){
      return item.nome.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({schoolsFiltered: updatedList});
  }

  render() {
    const {
      enrolled,
      two_working_days,
      reasons_continuous_program,
      reasons_simple,
      schools
    } = this.props;
    const { day_reasons, selectDefault, showModal, schoolsFiltered } = this.state;
    console.log(schoolsFiltered);
    return (
      <div>
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
        <input type="text" className="form-control form-control-lg" placeholder="Pesquisar" onChange={this.filterList}/>
        <div className="schools-group">
          {schoolsFiltered.map((school, key) => {
            return (
              <div>
                <div
                  className="school-container col-md-12 mr-4"
                  style={school.burger_active ? { background: "#F2FBFE" } : {}}
                >
                  <div
                    className="col-md-12 pt-2 pb-2"
                    style={{ paddingLeft: "2rem" }}
                  >
                    <label htmlFor="check" className="checkbox-label">
                      <Field
                        component={"input"}
                        type="checkbox"
                        name={`${school._id}.check`}
                      />
                      <span onClick={() => {}} className="checkbox-custom" />{" "}
                      {school._id + " - " + school.nome}
                    </label>
                    <Stand
                      onClick={() => this.changeBurger(school)}
                      color={"#C8C8C8"}
                      width={30}
                      padding={0}
                      lineSpacing={5}
                      className="float-right"
                      active={school.burger_active}
                    />
                  </div>
                    <Collapse isOpened={school.burger_active}>
                    <div className="col-md-12">
                      <div className="form-group row">
                        <Field
                          component={LabelAndInput}
                          cols="3 3 3 3"
                          name="nro_alunos"
                          type="number"
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
                    />
                    <SelecionaKitLancheBox
                      className="mt-3"
                      choicesNumberLimit={3}
                    />
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
                          {this.props.qtd_total || 0}
                        </span>
                      </Grid>
                    </div>
                  </Collapse>
                </div>
              </div>
            );
          })}
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
      </div>
    );
  }
}

const UnifiedSolicitationForm = reduxForm({
  form: "unifiedSolicitation",
  enableReinitialize: true
})(UnifiedSolicitation);

export default UnifiedSolicitationForm;
