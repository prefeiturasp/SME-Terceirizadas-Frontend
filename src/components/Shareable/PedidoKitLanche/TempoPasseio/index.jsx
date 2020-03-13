import React, { Component } from "react";
import { Field } from "redux-form";
import "./style.scss";
import InputErroMensagem from "../../Input/InputErroMensagem";

export class TempoPasseio extends Component {
  render() {
    const {
      mostrarExplicacao,
      nameTempoPasseio,
      onTempoPasseioChanged,
      meta
    } = this.props;
    return (
      <div className="tour-time">
        <p className="label">Tempo previsto do passeio</p>
        <div className="d-inline-flex">
          <label className="container-radio">
            até 4 horas (1 kit)
            <Field
              component={"input"}
              onChange={onTempoPasseioChanged}
              type="radio"
              value="0"
              data-cy="radio-4h"
              name={nameTempoPasseio}
            />
            <span className="checkmark" />
          </label>
          <label className="container-radio">
            de 5 a 7 horas (2 kits)
            <Field
              component={"input"}
              onChange={onTempoPasseioChanged}
              type="radio"
              value="1"
              data-cy="radio-5-7h"
              name={nameTempoPasseio}
            />
            <span className="checkmark" />
          </label>
          <label className="container-radio">
            8 horas ou mais (3 kits)
            <Field
              component={"input"}
              onChange={onTempoPasseioChanged}
              type="radio"
              value="2"
              data-cy="radio-8h"
              name={nameTempoPasseio}
            />
            <span className="checkmark" />
          </label>
        </div>
        {mostrarExplicacao && (
          <div className="row">
            <div className="col-12">
              <div className="explanation border rounded mt-3 p-3">
                <label>
                  <b>Até 4 horas:</b> 1 kit lanche/aluno: Escolher 1 kit entre
                  os 3 modelos estabelecidos contratualmente;
                </label>
                <label>
                  <b>De 5 a 7 horas:</b> 2 kit lanche/alunos: Escolher 2 kits
                  distintos entre os 3 modelos estabelecidos contratualmente;
                </label>
                <label>
                  <b>8 horas ou mais:</b> 3 kit lanche/aluno: Será autorizado o
                  fornecimento dos 3 modelos estabelecidos, kits 1, 2 e 3);
                </label>
              </div>
            </div>
          </div>
        )}
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
