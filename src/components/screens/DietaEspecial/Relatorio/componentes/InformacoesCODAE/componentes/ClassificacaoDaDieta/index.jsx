import React, { Component } from "react";
import { Field } from "react-final-form";
import InputErroMensagem from "../../../../../../../Shareable/Input/InputErroMensagem";
import { required } from "../../../../../../../../helpers/fieldValidators"

export default class ClassificacaoDaDieta extends Component {
  render() {
    const { classificacoes, meta } = this.props;
    return (
      <div className="tour-time">
        <div className="d-inline-flex">
          {classificacoes.map((classificacao, index) => {
            return (
              <label key={index} className="container-radio">
                {classificacao.nome}
                <Field
                  name="classificacao"
                  component="input"
                  type="radio"
                  value={classificacao.id.toString()}
                />
                <span className="checkmark" />
              </label>
            );
          })}
        </div>
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
