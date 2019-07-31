import React, { Fragment } from "react";
import { LabelAndInput } from "../../../Shareable/labelAndInput/labelAndInput";
import { Field } from "redux-form";
import { required } from "../../../../helpers/fieldValidators";

export const InputContratoVigencia = props => {
  const { nome_input, nome_formulario } = props;
  return (
    <Fragment>
      <div className="input-triplo">
        <div>
          <label className="label">
            <span>* </span>N° do contrato
          </label>
          <Field
            component={LabelAndInput}
            className="form-control"
            name={`num_contrato_${nome_formulario}`}
            validate={required}
          />
        </div>
        <div>
          <label className="label">
            <span>* </span>N° do contrato
          </label>
          <Field
            component={LabelAndInput}
            className="form-control"
            name={`num_contrato_${nome_formulario}`}
            validate={required}
          />
        </div>
        <div>
          <label className="label">
            <span>* </span>N° do contrato
          </label>
          <Field
            component={LabelAndInput}
            className="form-control"
            name={`num_contrato_${nome_formulario}`}
            validate={required}
          />
        </div>
      </div>
    </Fragment>
  );
};
