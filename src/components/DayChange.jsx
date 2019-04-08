import React, { Component } from "react";
import {
  LabelAndInput,
  LabelAndCombo,
  LabelAndTextArea,
  LabelAndDate
} from "./Shareable/labelAndInput";
import "./Shareable/custom.css";
import BaseButton, { ButtonStyle, ButtonType } from "./Shareable/button";
import { Field, reduxForm } from "redux-form";
import {
  alphaNumeric,
  maxLength15,
  required,
  minLength2
} from "../helpers/validators";
import { showResults } from "../helpers/utilities";

export let DayChange = props => (
  <div className="container">
    <div>
      <label className="subtitle">Solicitações</label>
    </div>
    <div>
      <label className="category">Alteração de Dias do Cardápio</label>
    </div>
    <form onSubmit={props.handleSubmit(showResults)}>
      <div className="form-group row">
        <div className="col-12">
          <label htmlFor="rf-responsible">Nº de Matriculados</label>
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
          placeholder="Registro funcional"
          cols="6 6 6 6"
          type="text"
          name="rf"
          label="RF Responsável"
        />
        <Field
          component={LabelAndInput}
          cols="6 6 6 6"
          type="text"
          name="cargo"
          label="Cargo / Função"
          validate={[required, maxLength15, minLength2]}
          warn={alphaNumeric}
        />
      </div>
      <div className="form-group row">
        <Field
          component={LabelAndInput}
          cols="12 12 12 12"
          name="nome"
          label="Nome"
        />
      </div>
      <div className="form-row">
        <Field
          component={LabelAndCombo}
          cols="5 5 5 5"
          name="periodo"
          label="Período de alteração"
        />
        <Field
          component={LabelAndInput}
          cols="3 3 3 3"
          name="nroAlunos"
          label="Nº de alunos"
          type="number"
        />
        <Field
          component={LabelAndCombo}
          cols="4 4 4 4"
          name="periodo"
          label="Motivo"
        />
      </div>
      <label className="bold">Substituição</label>
      <div className="form-group row">
        <Field
          component={LabelAndDate}
          cols="5 5 5 5"
          name="de"
          label="Cardápio dia"
        />
        <div className="col-sm-1 v-align">para</div>
        <div className="col-sm-1 v-align">
          <i className="fa fa-arrow-right" aria-hidden="true" />
        </div>
        <Field
          component={LabelAndDate}
          cols="5 5 5 5"
          name="para"
          label="Cardápio dia"
        />
      </div>
      <div className="form-group">
        <Field component={LabelAndTextArea} label="Observação" name="obs" />
      </div>
      <div className="form-group row float-right">
        <BaseButton label="Cancelar" style={ButtonStyle.OutlinePrimary} />
        <BaseButton
          label="Enviar Solicitação"
          style={ButtonStyle.Primary}
          type={ButtonType.SUBMIT}
          className="ml-3"
        />
      </div>
    </form>
  </div>
);

export default (DayChange = reduxForm({
  form: "dayChange",
  destroyOnUnmount: false
})(DayChange));
