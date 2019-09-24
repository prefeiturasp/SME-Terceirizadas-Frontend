import React, { Component } from "react";
import Button, { ButtonStyle, ButtonType } from "./Shareable/button";
import {
  LabelAndInput,
  LabelAndCombo,
  LabelAndTextArea,
  LabelAndDate
} from "./Shareable/labelAndInput/labelAndInput";
import { Field, reduxForm } from "redux-form";
import CardMatriculados from "./Shareable/CardMatriculados";

const myDataHandler = event => {
  console.log("handle submit chamado!", event);
};

export class MenuChange extends Component {
  render() {
    // console.log("redux forms props:_>", this.props);
    return (
      <div>
        <CardMatriculados numeroAlunos={200} />
        <div className="card mt-3 p-4">
          <form onSubmit={this.props.handleSubmit(myDataHandler)}>
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
            <div className="form-group row">
              <Field
                component={LabelAndCombo}
                cols="5 5 5 5"
                name="periodo"
                label="Período de alteração"
              />
              <Field
                component={LabelAndCombo}
                cols="4 4 4 4"
                name="tipo"
                label="Tipo de Alimentação"
              />
              <Field
                component={LabelAndInput}
                cols="3 3 3 3"
                name="nro_alunos"
                type="number"
                label="Nº de alunos"
              />
            </div>
            <div className="form-group row">
              <Field
                component={LabelAndCombo}
                cols="5 5 5 5"
                name="periodo_ateracao"
                label="Período de alteração"
              />
              <Field
                component={LabelAndCombo}
                cols="4 4 4 4"
                name="tipo"
                label="Tipo de Alimentação"
              />
              <Field
                component={LabelAndInput}
                cols="3 3 3 3"
                type="number"
                name="nroa"
                label="Nº de alunos"
              />
            </div>
            <Button style={ButtonStyle.OutlineDark} label="Adicionar Período" />
            <div className="form-group row-1">
              <label className="session-header mt-3">Data de alteração</label>
            </div>
            <div className="form-group row">
              <Field
                name="de"
                cols="6 6 6 6"
                label="De"
                component={LabelAndDate}
              />
              <Field
                name="para"
                cols="6 6 6 6"
                label="Para"
                component={LabelAndDate}
              />
            </div>

            <div className="form-group row" />
            <div className="form-group row">
              <Button
                style={ButtonStyle.OutlineInfo}
                className="ml-3"
                label="Adicionar dia"
              />
              <Button
                style={ButtonStyle.OutlineInfo}
                className="ml-3"
                label="Adicionar Ciclo"
              />
            </div>
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
                label="Enviar Solicitação"
                type={ButtonType.SUBMIT}
                style={ButtonStyle.Primary}
                className="ml-3"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MenuChange = reduxForm({
  form: "menuChange",
  destroyOnUnmount: false // para nao perder o estado
})(MenuChange);
