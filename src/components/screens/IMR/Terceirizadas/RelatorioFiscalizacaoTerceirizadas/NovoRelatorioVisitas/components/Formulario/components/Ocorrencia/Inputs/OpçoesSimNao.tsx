import React from "react";
import { Field } from "react-final-form";
import { required } from "helpers/fieldValidators";

type OpçoesSimNaoType = {
  titulo: string;
  name: string;
};

export const OpçoesSimNao = ({ ...props }: OpçoesSimNaoType) => {
  const { titulo, name } = props;

  return (
    <div className="col-12">
      <div>
        <span className="required-asterisk">*</span>
        <label className="col-form-label ">{titulo}</label>
      </div>

      <div className="row parametrizacao-tipo-radio">
        <div className="col-2 p-0 d-flex align-items-center">
          <Field
            name={name}
            component="input"
            type="radio"
            value="Sim"
            id="sim"
            required
            validate={required}
            style={{ paddingRight: 2 }}
          />
          <label htmlFor="sim">Sim</label>
        </div>
        <div className="col-2 p-0 d-flex align-items-center">
          <Field
            name={name}
            component="input"
            type="radio"
            value="Não"
            id="nao"
            required
            validate={required}
          />
          <label htmlFor="nao">Não</label>
        </div>
      </div>
    </div>
  );
};
