import React from "react";
import { Field } from "react-final-form";
import { InputText } from "components/Shareable/Input/InputText";

const PeriodoVigencia = ({ dieta }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-12">
            <p className="label mb-0">Período de Vigência</p>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <Field
              component={InputText}
              className={"select-form-produto"}
              label="Início"
              name="data_inicio"
              defaultValue={
                dieta !== undefined && dieta.data_inicio !== null
                  ? dieta.data_inicio
                  : ""
              }
              disabled={true}
            />
          </div>
          <div className="col-4">
            <Field
              component={InputText}
              className={"select-form-produto"}
              label="Fim"
              name="data_fim"
              defaultValue={
                dieta !== undefined && dieta.data_termino !== null
                  ? dieta.data_termino
                  : ""
              }
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodoVigencia;
