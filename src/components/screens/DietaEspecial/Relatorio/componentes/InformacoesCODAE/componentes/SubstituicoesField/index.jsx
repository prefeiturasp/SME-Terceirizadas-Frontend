import React, { Component } from "react";
import { FieldArray } from "redux-form";

import Substituicao from "./Substituicao";

import "./style.scss";

export default class SubstituicoesField extends Component {
  render() {
    const { alimentos } = this.props;
    return (
      <div className="substituicoes-field">
        <div className="row">
          <div className="col-3">Alimentos</div>
          <div className="col-2">Tipos</div>
          <div className="col-5">Substitutos</div>
        </div>
        <FieldArray
          name="substituicoes"
          component={({ fields }) =>
            fields.map((field, index) => {
              return (
                <Substituicao
                  name={field}
                  key={index}
                  alimentos={alimentos}
                  addOption={() => fields.push({})}
                  removeOption={() => {
                    fields.remove(index);
                    if (fields.length === 1) {
                      fields.push({});
                    }
                  }}
                />
              );
            })
          }
        />
      </div>
    );
  }
}
