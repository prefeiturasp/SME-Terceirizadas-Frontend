import React, { Component } from "react";
import { Field } from "react-final-form";

import InputErroMensagem from "../../../../../../../Shareable/Input/InputErroMensagem";

import Substituicao from "./SubstituicaoFinalForm";

import "./style.scss";

export default class SubstituicoesField extends Component {
  validate(value) {
    console.log('SubstituicoesField.value', value)
  }
  render() {
    const { alimentos, input: { name, value, onChange }, meta } = this.props;
    console.log('SubstituicoesField.value', value)
    return (
      <div className="substituicoes-field">
        <div className="row">
          <div className="col-3">Alimentos</div>
          <div className="col-2">Tipos</div>
          <div className="col-5">Substitutos</div>
        </div>
        {value.map((v, index) =>
          <Field
            component={Substituicao}
            name={`${name}[${index}]`}
            key={index}
            alimentos={alimentos}
            addOption={() => onChange(value.concat({}))}
            removeOption={() => {
              onChange(value.length === 1 ? [{}] : value.filter((v, i) => i !== index))
            }}
            validate={this.validate}
          />
        )}
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
