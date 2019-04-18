import axios from "axios";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { textAreaRequired } from "../../helpers/fieldValidators";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import "../Shareable/custom.css";
import { LabelAndDate, LabelAndTextArea } from "../Shareable/labelAndInput";
import { DayChangeItemList } from "./DayChangeItemList";

export class DayChangeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { dayChangeList: [], status: "SEM STATUS", id: "" };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  OnDeleteButtonClicked(id) {
    axios.delete(`http://localhost:3004/daychange/${id}`).then(res => {
      this.refresh();
    });
  }

  onCancelButtonClicked(event) {
    // rich text field doesn't become clear by props.reset()...
    this.props.reset();
    const resetCmd = "";
    this.props.change("motivo", resetCmd);
    this.props.change("obs", resetCmd);
    this.setState({ status: "SEM STATUS" });
  }

  OnEditButtonClicked(param) {
    this.props.reset();
    this.props.change("motivo", param.motivo);
    this.props.change("obs", param.obs);
    this.props.change("subst_dia_origem", param.subst_dia_origem);
    this.props.change("subst_dia_destino", param.subst_dia_destino);
    this.setState({ status: param.status });
    this.setState({ id: param.id });
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    axios.get(`http://localhost:3004/daychange/`).then(res => {
      const dayChangeList = res.data;
      this.setState({ dayChangeList });
    });
  }

  onSubmit(values) {
    axios.post(`http://localhost:3004/daychange/`, values).then(res => {
      this.refresh();
      console.log("POST", res.data);
    });
  }

  render() {
    let title = "Nova solicitação";
    if (this.state.id) {
      title = `Solicitação # ${this.state.id}`;
    }
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
          <DayChangeItemList
            dayChangeList={this.state.dayChangeList}
            OnDeleteButtonClicked={this.OnDeleteButtonClicked}
            OnEditButtonClicked={params => this.OnEditButtonClicked(params)}
          />
          <div className="form-row mt-3 ml-1">
            <h3 className="bold" style={{ color: "#353535" }}>
              {title}
            </h3>
          </div>
          <div className="border rounded mt-2 p-3">
            <div>
              <label className="bold">Substituição de dia de cardápio</label>
              <span
                className="float-right  p-1 border rounded"
                style={{ background: "#DADADA" }}
              >
                {this.state.status}
              </span>
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
            <div className="form-group row float-right mt-4">
              <BaseButton
                label="Cancelar"
                onClick={event => this.onCancelButtonClicked(event)}
                disabled={pristine || submitting}
                style={ButtonStyle.OutlinePrimary}
              />
              <BaseButton
                label="Salvar rascunho"
                disabled={pristine || submitting}
                onClick={handleSubmit(values =>
                  this.onSubmit({
                    ...values,
                    status: "RASCUNHO",
                    salvo_em: new Date()
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
        </form>
      </div>
    );
  }
}

DayChangeEditor = reduxForm({
  form: "dayChange"
})(DayChangeEditor);

export default DayChangeEditor;
