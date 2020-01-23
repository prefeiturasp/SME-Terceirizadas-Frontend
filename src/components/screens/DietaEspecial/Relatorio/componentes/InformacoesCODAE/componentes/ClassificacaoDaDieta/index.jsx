import React, { Component } from "react";
import { Field } from "redux-form";
import InputErroMensagem from "../../../../../../../Shareable/Input/InputErroMensagem";

export class ClassificacaoDaDieta extends Component {
  render() {
    const { classificacoes, name, onClassificacaoChanged, meta } = this.props;
    return (
      <div className="tour-time">
        <div className="d-inline-flex">
          {classificacoes.map((classificacao, index) => {
            return (
              <label key={index} className="container-radio">
                {classificacao.nome}
                <Field
                  component={"input"}
                  onChange={onClassificacaoChanged}
                  type="radio"
                  value={classificacao.id.toString()}
                  name={name}
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
