import React, { Component } from "react";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import "./Shareable/custom.css";
import { Field, FieldArray, reduxForm } from "redux-form";
import {
  LabelAndInput,
  LabelAndTextArea,
  LabelAndCombo
} from "./Shareable/labelAndInput";
import BaseButton, {
  ButtonType,
  ButtonStyle,
  ButtonIcon
} from "./Shareable/button";
import { showResults } from "../helpers/utilities";

const renderPeriodos = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    {fields.map((member, index) => (
      <ol key={index}>
        <div className="form-group row">
          <Field
            name={`periodo_${index}`}
            cols="3 3 3 3"
            type="text"
            component={LabelAndCombo}
            label="Período de inclusão"
          />
          <Field
            cols="3 3 3 3"
            name={`tipo_${index}`}
            component={LabelAndCombo}
            label="Tipo de alimentação"
          />
          <Field
            cols="3 3 3 3"
            name={`nro_alunos_${index}`}
            component={LabelAndInput}
            type="number"
            label="Número de alunos"
          />
          <BaseButton
            className="ml-2"
            onClick={() => fields.remove(index)}
            style={ButtonStyle.Danger}
            icon={ButtonIcon.TRASH}
          />
        </div>
      </ol>
    ))}
    <div className="form-group row">
      <BaseButton
        style={ButtonStyle.OutlineDark}
        onClick={() => fields.push({})}
        label="Adicionar Período"
      />
    </div>
    {submitFailed && error && <span>{error}</span>}
  </ul>
);

class AddFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      food_periods: [{ food_period: "", food_type: "", student_count: "" }],
      suspension_dates: [{ day: new Date(), reason_day: "" }],
      suspension_ranges: [
        { from: new Date(), to: new Date(), reason_range: "" }
      ]
    };
  }

  validForm() {
    return true;
  }

  handleAddFoodPeriod = () => {
    this.setState({
      food_periods: this.state.food_periods.concat([
        { food_period: "", food_type: "", student_count: "" }
      ])
    });
  };

  handleRemoveFoodPeriod = idx => () => {
    this.setState({
      food_periods: this.state.food_periods.filter((_, index) => idx !== index)
    });
  };

  handleAddSuspensionDate = () => {
    this.setState({
      suspension_dates: this.state.suspension_dates.concat([
        { day: new Date(), reason_range: "" }
      ])
    });
  };

  handleRemoveSuspensionDate = idx => () => {
    this.setState({
      suspension_dates: this.state.suspension_dates.filter(
        (_, index) => idx !== index
      )
    });
  };

  handleAddSuspensionRange = () => {
    this.setState({
      suspension_ranges: this.state.suspension_ranges.concat([
        { from: new Date(), to: new Date(), reason_range: "" }
      ])
    });
  };

  handleRemoveSuspensionRange = idx => () => {
    this.setState({
      suspension_ranges: this.state.suspension_ranges.filter(
        (_, index) => idx !== index
      )
    });
  };

  handleDatePickerChange = date => {
    this.setState({
      start: date
    });
  };

  handleDatePickerStartChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleDatePickerEndChange = date => {
    this.setState({
      endDate: date
    });
  };

  // handleSubmit = event => {
  //   alert(
  //     "email: " + this.state.email + " -  Password: " + this.state.password
  //   );
  //   event.preventDefault();
  // };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { food_periods, suspension_dates, suspension_ranges } = this.state;
    return (
      <div className="container">
        <div>
          <label className="subtitle">Solicitações</label>
        </div>
        <div>
          <label className="category">Inclusão de Alimentação</label>
        </div>
        <form onSubmit={this.props.handleSubmit(showResults)}>
          <div className="form-group row">
            <div className="col-12">
              <label for="rf-responsible">Nº de Matriculados</label>
              <p className="number-registered">
                <span className="gray-rectangle">150</span>
                Informação automática disponibilizada no
                <br />
                <span className="purple">Cadastro da Unidade Escolar</span>
              </p>
            </div>
          </div>
          <div className="form-group row">
            <Field
              component={LabelAndInput}
              cols="6 6 6 6"
              label="RF Responsável"
              name="rf"
            />
            <Field
              component={LabelAndInput}
              cols="6 6 6 6"
              label="Cargo / Função"
              name="cargo_funcao"
            />
          </div>
          <div className="form-group row">
            <Field
              component={LabelAndInput}
              cols="6 6 6 6"
              label="Nome"
              name="nome"
            />
          </div>
          <FieldArray name="periodosTodos" component={renderPeriodos} />

          <label className="bold">Data de suspensão</label>
          {suspension_dates.map((suspension_date, index) => (
            <div className="form-group row">
              <div className="col-sm-4">
                <label for="">Dia</label>
                <div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.start}
                    onChange={this.handleDatePickerChange}
                    className="form-control"
                    locale={ptBR}
                  />
                </div>
              </div>
              <div className="col-sm-7">
                <label for="reason_day">Motivo</label>
                <select
                  placeholder="Selecione"
                  name="reason_day"
                  className="form-control"
                >
                  <option value="" disabled selected>
                    Selecione
                  </option>
                  <option>1º Período - Matutino</option>
                </select>
              </div>
              <div className="form-group col-md-1">
                <i
                  onClick={this.handleRemoveSuspensionDate(index)}
                  className="fa fa-trash fa-2x icon"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
          {suspension_ranges.map((suspension_range, index) => (
            <div className="form-group row">
              <div className="col-sm-4">
                <label for="">De</label>
                <div>
                  <DatePicker
                    selectsStart
                    dateFormat="dd/MM/yyyy"
                    selected={this.state.startDate}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleDatePickerStartChange}
                    className="form-control"
                    locale={ptBR}
                  />
                </div>
              </div>
              <div className="col-sm-4">
                <label for="">Até</label>
                <div>
                  <DatePicker
                    selectsEnd
                    dateFormat="dd/MM/yyyy"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    selected={this.state.endDate}
                    onChange={this.handleDatePickerEndChange}
                    className="col-12 form-control"
                    locale={ptBR}
                  />
                </div>
              </div>
              <div className="col-sm-3">
                <label for="reason_range">Motivo</label>
                <select
                  placeholder="Selecione"
                  name="reason_range"
                  className="form-control"
                >
                  <option value="" disabled selected>
                    Selecione
                  </option>
                  <option>1º Período - Matutino</option>
                </select>
              </div>
              <div className="form-group col-md-1">
                <i
                  onClick={this.handleRemoveSuspensionRange(index)}
                  className="fa fa-trash fa-2x icon"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
          <div className="form-group row">
            <div className="col-sm-4">
              <button
                type="button"
                onClick={this.handleAddSuspensionDate}
                className="col-12 btn btn-outline-info"
              >
                Adicionar Dia
              </button>
            </div>
            <div className="col-sm-4">
              <button
                type="button"
                onClick={this.handleAddSuspensionRange}
                className="col-12 btn btn-outline-info"
              >
                Adicionar Ciclo
              </button>
            </div>
          </div>
          <div className="form-group row">
            <Field
              component={LabelAndTextArea}
              label="Observaçao"
              name="obs"
              cols="12 12 12 12"
            />
          </div>
          <div className="form-group row float-right">
            <BaseButton
              label="Cancelar"
              type={ButtonType.RESET}
              onClick={this.handleAddSuspensionDate}
              style={ButtonStyle.OutlinePrimary}
            />
            <BaseButton
              label="Enviar Solicitação"
              type={ButtonType.SUBMIT}
              className="ml-3"
              // onClick={this.handleAddSuspensionDate}
              style={ButtonStyle.Primary}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default (AddFood = reduxForm({
  form: "addFood",
  destroyOnUnmount: false
})(AddFood));
