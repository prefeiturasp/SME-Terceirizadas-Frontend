import React from "react";
import { Field } from "redux-form";
import { required } from "../../../../helpers/fieldValidators";
import { fieldTel } from "./helper";

import {
  renderTelefone,
  renderEmail
} from "./RenderField";

export const ContatosEmpresa = ({ fields, meta: { error } }) => (
  <div className="container-fields pt-3">
    <div className="fields">
      <div className="fields-set">
        <Field
          name={`telefone_empresa`}
          component={renderTelefone}
          {...fieldTel}
          validate={required}
        />
        <Field
          name={`email_empresa`}
          component={renderEmail}
          label={`E-mail`}
          validate={required}
        />
      </div>
      {fields.map((field, index) => (
        <div key={index} className="fields-set pt-2">
          <Field
            name={`telefone_empresa_${index}`}
            component={renderTelefone}
            {...fieldTel}
            validate={required}
          />
          <Field
            name={`email_empresa_${index}`}
            component={renderEmail}
            label={`E-mail`}
            validate={required}
          />
        </div>
      ))}
    </div>
    <div className="button-field">
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={() => fields.push()}
      >
        +
      </button>
    </div>
  </div>
);
