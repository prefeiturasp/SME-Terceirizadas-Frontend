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
    this.state = { dayChangeList: [] };
    this.OnEditButtonClicked = this.OnEditButtonClicked.bind(this);
    this.OnDeleteButtonClicked = this.OnDeleteButtonClicked.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  OnDeleteButtonClicked(id) {
    axios.delete(`http://localhost:3004/daychange/${id}`).then(res => {
      this.refresh();
    });
  }

  OnEditButtonClicked(param) {
    this.props.reset();
    this.props.change("motivo", param.motivo);
    this.props.change("obs", param.obs);
    this.props.change("subst_dia_origem", param.subst_dia_origem);
    this.props.change("subst_dia_destino", param.subst_dia_destino);
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
          <div className="form-row mt-3">
            <h3 className="bold" style={{ color: "#353535" }}>
              Nova solicitação
            </h3>
          </div>
          <div className="border rounded mt-2">
            <div className="form-row">
              <label className="bold">
                Substituição de dia de cardápio
              </label>
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
            <div className="form-group row float-right">
              <BaseButton
                label="Cancelar"
                onClick={reset}
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
