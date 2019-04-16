import axios from "axios";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { textAreaRequired } from "../helpers/fieldValidators";
import { showResults } from "../helpers/utilities";
import BaseButton, { ButtonIcon, ButtonStyle, ButtonType } from "./Shareable/button";
import "./Shareable/custom.css";
import { LabelAndDate, LabelAndTextArea } from "./Shareable/labelAndInput";

export class DayChangeItemList extends Component {
  constructor(props) {
    super(props);
    this.state = { dayChange: [] };
  }

  componentWillMount() {
    axios.get(`http://localhost:3004/daychange/`).then(res => {
      const dayChange = res.data;
      this.setState({ dayChange });
    });
  }

  render() {
    const todosDias = this.state.dayChange.map(p => {
      const { status, id, salvo_em, subst_dia_origem, subst_dia_destino } = p;
      return (
        <div className="border rounded mt-3">
          <label className="bold ml-3">{status}</label>
          <div>
            <label className="bold ml-3">
              Alteração de Dia de cardápio {`# ${id}`}
            </label>
            <div className="float-right">
              <input
                className="float-right mt-2 mr-3"
                type="checkbox"
                name={id}
                id={id}
              />
            </div>
          </div>
          <div>
            <div className="float-right">
              Salvo em: {salvo_em}
              <BaseButton icon={ButtonIcon.TRASH} />
              <BaseButton icon={ButtonIcon.EDIT} />
            </div>
          </div>
          <div className="ml-3">
            <p>
              Substituição do dia: <b>{subst_dia_origem}</b> para o dia:<b>
              {subst_dia_destino}</b>
            </p>
          </div>
        </div>
      );
    });
    return <div>{todosDias}</div>;
  }
}

export class DayChangeEditor extends Component {
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
          <DayChangeItemList />
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

export default (DayChangeEditor = reduxForm({
  form: "dayChange",
  destroyOnUnmount: false
})(DayChangeEditor));
