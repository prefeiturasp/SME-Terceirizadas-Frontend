import React, { Component } from "react";
import { Field } from "redux-form";
import "./style.scss";

export class CardKit extends Component {
  render() {
    const { nome, itens, uuid } = this.props.kitLanche;
    const { checked, onCardChange, nameKitsLanche } = this.props;
    return (
      <div className="card meal-kit">
        <div className="card-body">
          <div className="card-title">
            <span>{nome}</span>
            <label className="container-checkbox">
              <Field
                checked={checked}
                component={"input"}
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
