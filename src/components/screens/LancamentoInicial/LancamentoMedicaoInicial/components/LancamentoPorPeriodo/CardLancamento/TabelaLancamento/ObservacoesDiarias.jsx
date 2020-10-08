import React from "react";
import { Field } from "react-final-form";

import BorderlessTextarea from "../../../BorderlessTextarea";

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
        <Field component={BorderlessTextarea} name={name} disabled={disabled} />
      </div>
    </div>
  </div>
);
