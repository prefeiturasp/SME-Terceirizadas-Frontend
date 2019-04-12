import React from "react";
import { Field, reduxForm } from "redux-form";
import { textAreaRequired } from "../helpers/fieldValidators";
import { showResults } from "../helpers/utilities";
import BaseButton, { ButtonStyle, ButtonType } from "./Shareable/button";
import "./Shareable/custom.css";
import { LabelAndDate, LabelAndInput, LabelAndTextArea } from "./Shareable/labelAndInput";

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
      <hr />
      <div className="form-row">
        <label className="bold">Substituição de dia de cardápio</label>
      </div>
      <div className="form-row">
        <Field
          component={LabelAndDate}
          cols="4 4 4 4"
          name="subst_dia_origem"
          label="De:"
          daysDeltaMin={2}
          daysDeltaMax={30}
        />
        <Field
          component={LabelAndDate}
          cols="4 4 4 4"
          name="subst_dia_destino"
          label="Para:"
          daysDeltaMin={5}
          daysDeltaMax={35}
        />
      </div>
      <hr />
      <div className="form-group">
        <Field
          component={LabelAndTextArea}
          label="Motivo"
          name="motivo"
          validate={[textAreaRequired]}
        />
      </div>
      <div className="form-group">
        <Field
          component={LabelAndTextArea}
          placeholder="Campo opcional"
          label="Observação"
          name="obs"
        />
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
