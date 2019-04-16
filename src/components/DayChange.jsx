import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { textAreaRequired } from "../helpers/fieldValidators";
import { showResults } from "../helpers/utilities";
import BaseButton, { ButtonStyle, ButtonType } from "./Shareable/button";
import "./Shareable/custom.css";
import { LabelAndDate, LabelAndTextArea } from "./Shareable/labelAndInput";

export class DayChange extends Component {
  onSubmit(values) {
    showResults(values);
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="container">
        <div>
          <label className="subtitle">Solicitações</label>
        </div>
        <div>
          <label className="category">Alteração de Dias do Cardápio</label>
        </div>
        <form>
          <div className="form-group row">
            <div className="col-12">
              <label htmlFor="rf-responsible">Nº de Matriculados</label>
              <p className="number-registered">
                <span className="gray-rectangle">150</span>
                Informação automática disponibilizada no
                <br />
                <span className="text-primary">
                  Cadastro da Unidade Escolar
                </span>
              </p>
            </div>
          </div>
          <hr />
          <div className="form-row">
            <label className="bold">Substituição de dia de cardápio</label>
          </div>
          <div className="form-row">
            <Field
              component={LabelAndDate}
              cols="4 4 4 4"
              placeholder="Dia a ser substituído"
              name="subst_dia_origem"
              label="De:"
            />
            <Field
              component={LabelAndDate}
              cols="4 4 4 4"
              placeholder="Novo dia do cardápio"
              name="subst_dia_destino"
              label="Para:"
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
            <BaseButton
              label="Cancelar"
              onClick={reset}
              disabled={pristine || submitting}
              style={ButtonStyle.OutlinePrimary}
            />
            <BaseButton
              label="Salvar"
              disabled={pristine || submitting}
              onClick={handleSubmit(values =>
                this.onSubmit({
                  ...values,
                  Acao: "Salvar"
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
                  Acao: "Enviar solicitação"
                })
              )}
              style={ButtonStyle.Primary}
              className="ml-3"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default (DayChange = reduxForm({
  form: "dayChange",
  destroyOnUnmount: false
})(DayChange));
