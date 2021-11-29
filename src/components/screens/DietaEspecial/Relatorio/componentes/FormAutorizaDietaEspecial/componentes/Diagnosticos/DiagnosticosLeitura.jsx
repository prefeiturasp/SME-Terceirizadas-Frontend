import React from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Shareable/Input/InputText";

const DiagnosticosLeitura = () => {
  return (
    <Field
      component={InputText}
      label="Relação por Diagnóstico"
      name="relacao_diagnosticos"
      disabled={true}
    />
  );
};

export default DiagnosticosLeitura;
