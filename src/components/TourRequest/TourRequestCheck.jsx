import React, { Component } from "react";
import { requiredCheck } from "../../helpers/fieldValidators";
import RadioboxGroup from "./RadioboxGroup";

export const HORAS_ENUM = {
  _4: { tempo: "4h", qtd_kits: 1, label: "até 4 horas - 1 kit" },
  _5a7: { tempo: "5_7h", qtd_kits: 2, label: "de 5 a 7 horas - 2 kits" },
  _8: { tempo: "8h", qtd_kits: 3, label: "8 horas ou mais - 3 kits" }
};


class SelecionaTempoPasseio extends Component {
  render() {
    const timeOptions = [
      { value: HORAS_ENUM._4.tempo, label: HORAS_ENUM._4.label },
      { value: HORAS_ENUM._5a7.tempo, label: HORAS_ENUM._5a7.label },
      { value: HORAS_ENUM._8.tempo, label: HORAS_ENUM._8.label }
    ];
    return (
      <div className={this.props.className}>
        <h6 className="bold">Tempo previsto do passeio</h6>
        <RadioboxGroup
          name="tempo_passeio"
          label="Tempo previsto do passeio"
          validate={
            this.props.validate !== undefined
              ? this.props.validate && [requiredCheck]
              : [requiredCheck]
          }
          onChange={this.props.onChange}
          options={timeOptions}
        />
        <div className="border rounded p-3">
          <label>
            <b>Até 4 horas</b> = 1 kit lanche/aluno: Escolher 1 kit entre os
            3 modelos estabelecidos contratualmente;
          </label>
          <label>
            <b>De 5 a 7 horas</b> = 2 kits lanche/alunos: Escolher 2 kits
            distintos entre os 3 modelos estabelecidos contratualmente;
          </label>
          <label>
            <b>8 horas ou mais</b> = 3 kits lanche/aluno: Será autorizado o
            fornecimento dos 3 modelos estabelecidos, kits 1, 2 e 3);
          </label>
        </div>
      </div>
    );
  }
}

export default SelecionaTempoPasseio
