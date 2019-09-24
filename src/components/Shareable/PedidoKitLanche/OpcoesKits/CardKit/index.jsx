import React, { Component } from "react";
import { Field } from "redux-form";
import { TEMPO_PASSEIO } from "../../../../../constants/kitLanche.constants";
import "./style.scss";

export class CardKit extends Component {
  render() {
    const { nome, itens, uuid } = this.props.kitLanche;
    const {
      checked,
      kitsChecked,
      onCardChange,
      nomeKitsLanche,
      tempoPasseio,
      esconderDetalhamentoKits
    } = this.props;
    const disabled =
      (!checked &&
        kitsChecked.length !== 0 &&
        !kitsChecked.includes(uuid) &&
        parseInt(tempoPasseio) === kitsChecked.length - 1) ||
      tempoPasseio === TEMPO_PASSEIO.OITO_HORAS_OU_MAIS ||
      (tempoPasseio === "" &&
        (kitsChecked.length === 0 || !kitsChecked.includes(uuid)));
    return (
      <div
        className={`card meal-kit
        ${checked && "checked"}
        ${disabled &&
          tempoPasseio !== TEMPO_PASSEIO.OITO_HORAS_OU_MAIS &&
          "disabled"}
        ${esconderDetalhamentoKits && "minor-height"}`}
      >
        <div className="card-body">
          <div className="card-title">
            <span>{nome}</span>
            <label className="container-checkbox">
              <Field
                checked={checked}
                component={"input"}
                disabled={disabled}
                onChange={() => onCardChange(uuid)}
                type="checkbox"
                name={nomeKitsLanche}
              />
              <span className="checkmark" />
            </label>
          </div>
          {!esconderDetalhamentoKits &&
            itens.map(item => {
              return <div className={`item-meal-kit`}>{item.nome}</div>;
            })}
        </div>
      </div>
    );
  }
}
