import React, { Component } from "react";
import Button, { ButtonStyle, ButtonType } from "./Shareable/button";
import {
  LabelAndInput,
  LabelAndCombo,
  LabelAndTextArea,
  LabelAndDate
} from "./Shareable/labelAndInput";
import "./Shareable/custom.css";
import { Field, reduxForm } from "redux-form";

const myDataHandler = event => {
  console.log("handle submit chamado!", event);
};

class MenuChange extends Component {
  render() {
    console.log("redux forms props:_>", this.props);
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit(myDataHandler)}>
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
            <LabelAndDate cols="4 4 4 4" name="de" label="Alterar dia" />
            <LabelAndDate cols="4 4 4 4" name="para" label="Para" />
          </div>
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
    );
  }
}

// export default MenuChange;
export default (MenuChange = reduxForm({
  form: "menuChange",
  //https://redux-form.com/6.0.0-alpha.4/docs/api/reduxform.md/#-destroyonunmount-boolean-optional-
  destroyOnUnmount: false // para nao perder o estado
})(MenuChange));
