import React, { Component } from "react";
import { Field } from "redux-form";
import InputText from "../../../../Shareable/Input/InputText";
import { required } from "../../../../../helpers/fieldValidators";
import "./style.scss";

class Step2 extends Component {
  render() {
    return (
      <div className="cadastro-produto-step2">
        <div className="card-title">Informações Nutricionais</div>
        <div className="row">
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Porção"
              name="porcao"
              type="text"
              placeholder="Ex: porção de 200ml (01 unidade)"
              required
              validate={required}
            />
          </div>
          <div className="col-6 pt-3">
            <Field
              component={InputText}
              label="Unidade Caseira"
              name="unidade_caseira"
              type="text"
              placeholder="Ex: 01 copo"
              required
              validate={required}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Step2;
