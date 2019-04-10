import React, { Component } from "react";
import Button, { ButtonStyle, ButtonType } from "./Shareable/button";
import {
  LabelAndInput,
  LabelAndTextArea,
  LabelAndDate
} from "./Shareable/labelAndInput";
import "./Shareable/custom.css";
import { Field, reduxForm } from "redux-form";
import { requiredCheck, required } from "../helpers/validators";
import { showResults } from "../helpers/utilities";
import CheckboxGroup from "./Shareable/CheckboxGroup";
import RadioboxGroup from "./Shareable/RadioboxGroup";

export class SelecionaKitLanche extends Component {
  render() {
    const kitOptions = [
      { value: 1, label: "Modelo de Kit nº 1" },
      { value: 2, label: "Modelo de Kit nº 2" },
      { value: 3, label: "Modelo de Kit nº 3" }
    ];
    return (
      <div>
        <Field
          name="kit_lanche"
          label="Kit Lanche"
          component={CheckboxGroup}
          options={kitOptions}
          validate={[requiredCheck]}
        />
      </div>
    );
  }
}

export class SelecionaTempoPasseio extends Component {
  dispatchTempoPasseio = (event, newValue, previousValue, name) => {
    // this.props.dispatch({ type: "TEMPO_PERMANENCIA", payload: event });
    console.log(
      "tempoPAssio",
      event,
      newValue,
      previousValue,
      name,
      this.props
    );
  };
  render() {
    const timeOptions = [
      { value: "4h", label: "até 4 horas - 1 kit" },
      { value: "5_7h", label: "de 5 a 7 horas - 2 kits" },
      { value: "8h", label: "8 horas ou mais - 3 kits" }
    ];
    return (
      <Field
        name="tempo_permanencia"
        label="Tempo previsto do passeio"
        component={RadioboxGroup}
        validate={[requiredCheck]}
        onChange={this.props.onChange}
        options={timeOptions}
      />
    );
  }
}

export class TourRequest extends Component {
  dispatchTempoPasseio = (event, newValue, previousValue, name) => {
    this.props.dispatch({ type: "TEMPO_PERMANENCIA", payload: event });
    console.log("tempoPAssio", event, newValue, previousValue, name, this.props);
  };

  render() {
    return (
      <div className="d-flex flex-column p-4 mt-5">
        <form onSubmit={this.props.handleSubmit(showResults)}>
          <div>
            <label className="header-form-label mb-5">Nº de matriculados</label>
          </div>
          <div>
            <button className="btn btn-primary mr-3">150</button>
            <label>
              Informação automática disponibilizada no cadastro da UE
            </label>
          </div>
          <div className="form-group row">
            <Field
              component={LabelAndDate}
              cols="4 4 4 4"
              label="Data do evento"
              name="event_date"
            />
            <Field
              component={LabelAndInput}
              cols="8 8 8 8"
              label="Local do passeio"
              name="event_place"
            />
          </div>
          <div className="form-group row">
            <Field
              component={LabelAndInput}
              cols="3 3 3 3"
              name="nro_alunos"
              type="number"
              label="Número de alunos participantes"
              validate={[required]}
            />
          </div>
          <div className="form-group row">
            <SelecionaTempoPasseio
              onChange={(event, newValue, previousValue, name) =>
                this.dispatchTempoPasseio(event, newValue, previousValue, name)
              }
            />
          </div>
          <SelecionaKitLanche />
          <div className="form-group">
            <Field
              component={LabelAndTextArea}
              label="Observações"
              name="obs"
            />
          </div>
          <div className="form-group row float-right">
            <Button label="Cancelar" style={ButtonStyle.OutlinePrimary} />
            <Button
              label="Salvar"
              className="ml-3"
              style={ButtonStyle.OutlinePrimary}
            />
            <Button
              label="Enviar Solicitação"
              type={ButtonType.SUBMIT}
              style={ButtonStyle.Primary}
              className="ml-3"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default (TourRequest = reduxForm({
  form: "tourRequest",
  //https://redux-form.com/6.0.0-alpha.4/docs/api/reduxform.md/#-destroyonunmount-boolean-optional-
  destroyOnUnmount: false // para nao perder o estado
})(TourRequest));
