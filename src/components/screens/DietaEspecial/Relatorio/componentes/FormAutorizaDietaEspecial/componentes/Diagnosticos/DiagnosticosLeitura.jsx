import React from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Shareable/Input/InputText";

const DiagnosticosLeitura = ({ alergias }) => {
  return (
    <Field
      component={InputText}
      label="Relação por Diagnóstico"
      name="relacao_diagnosticos"
      defaultValue={
        alergias !== undefined ? alergias.map(a => a.nome).join(";") : ""
      }
      disabled={true}
    />
  );
};

export default DiagnosticosLeitura;
