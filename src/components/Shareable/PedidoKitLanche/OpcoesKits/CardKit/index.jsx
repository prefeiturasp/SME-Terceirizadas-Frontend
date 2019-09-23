import React, { Component } from "react";
import { Field } from "redux-form";
import "./style.scss";

export class CardKit extends Component {
  render() {
    const { nome, itens, uuid } = this.props.kitLanche;
    const {
      checked,
      kitsChecked,
      onCardChange,
      nameKitsLanche,
      tempoPasseio
    } = this.props;
    const disabled =
      (!checked &&
        kitsChecked.length !== 0 &&
        !kitsChecked.includes(uuid) &&
        parseInt(tempoPasseio) === kitsChecked.length - 1) ||
      tempoPasseio === "2" ||
      (tempoPasseio === "" &&
        (kitsChecked.length === 0 || !kitsChecked.includes(uuid)));
    return (
      <div
        className={`card meal-kit
        ${checked && "checked"}
        ${disabled && tempoPasseio !== "2" && "disabled"}`}
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
                name={nameKitsLanche}
              />
              <span className="checkmark" />
            </label>
          </div>
          {itens.map(item => {
            return <div className="item-meal-kit">{item.nome}</div>;
          })}
        </div>
      </div>
    );
  }
}
