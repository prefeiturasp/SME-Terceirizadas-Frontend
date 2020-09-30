import React from "react";
import { Field } from "react-final-form"

import BorderlessInput from "../../../BorderlessInput";

import "./styles.scss";

export default ({ name, label, disabled }) => (
  <div className="tabela-lancamento tabela-campo-unico">
    <div className="cabecalho-tabela">
      <div>
        <span>{label}</span>
      </div>
    </div>
    <div className="linha-tabela">
      <div>
        <Field component={BorderlessInput} name={name} disabled={disabled}/>
      </div>
    </div>
  </div>
);
