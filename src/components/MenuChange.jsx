import React, { Component } from "react";
import Button, { ButtonStyle } from "./Shareable/button";
import {
  LabelAndInput,
  LabelAndCombo,
  LabelAndTextArea,
  LabelAndDate
} from "./Shareable/labelAndInput";
import "./Shareable/custom.css";
import { Field, reduxForm } from "redux-form";

class MenuChange extends Component {
  render() {
    const { addCycle, description, addDay, rfInputEdited } = this.props;
    return (
      <div className="container">
        <form onSubmit={this.props.handleSubmit}>
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
            <LabelAndInput
              value={this.props.cargo}
              cols="6 6 6 6"
              type="text"
              name="cargo"
              label="Cargo / Função"
            />
          </div>
          <div className="form-group row">
            <LabelAndInput
              value={this.props.nome}
              cols="12 12 12 12"
              name="nome"
              label="Nome"
            />
          </div>
          <div className="form-group row">
            <LabelAndCombo
              cols="5 5 5 5"
              name="periodo"
              label="Período de alteração"
            />
            <LabelAndCombo
              cols="4 4 4 4"
              name="tipo"
              label="Tipo de Alimentação"
            />
            <LabelAndInput
              cols="3 3 3 3"
              name="nro_alunos"
              label="Nº de alunos"
            />
          </div>
          <div className="form-group row">
            <LabelAndCombo cols="5 5 5 5" label="Período de alteração" />
            <LabelAndCombo cols="4 4 4 4" label="Tipo de Alimentação" />
            <LabelAndInput cols="3 3 3 3" type="number" label="Nº de alunos" />
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
              onClick={() => addDay(description)}
              className="ml-3"
              label="Adicionar dia"
            />
            <Button
              style={ButtonStyle.OutlineInfo}
              onClick={() => addCycle(description)}
              className="ml-3"
              label="Adicionar Ciclo"
            />
          </div>
          <div className="form-group">
            <LabelAndTextArea label="Observações" name="obs" />
          </div>
          <div className="form-group row float-right">
            <Button label="Cancelar" style={ButtonStyle.OutlinePrimary} />
            <Button
              label="Enviar Solicitação"
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
  // a unique name for the form
  form: "menuChange"
})(MenuChange));
