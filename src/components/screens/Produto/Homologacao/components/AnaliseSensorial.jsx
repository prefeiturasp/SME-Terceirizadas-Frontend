import React from "react";
import { Field } from "react-final-form";

export const AnaliseSensorial = () => {
  return (
    <div className="link-with-student pt-4">
      <div className="row">
        <div className="col-12">
          <p className="titulo-section">Análise Sensorial</p>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <span className="required-asterisk">*</span>
          <label className="col-form-label ">
            Precisa solicitar análise sensorial?
          </label>
        </div>
        <div className="col-2 radio-wrapper">
          <label className="container-radio">
            Sim
            <Field
              component={"input"}
              type="radio"
              value="1"
              name="necessita_analise_sensorial"
            />
            <span className="checkmark" />
          </label>
        </div>
        <div className="col-2 radio-wrapper">
          <label className="container-radio">
            Não
            <Field
              component={"input"}
              type="radio"
              value="0"
              name="necessita_analise_sensorial"
            />
            <span className="checkmark" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default AnaliseSensorial;
