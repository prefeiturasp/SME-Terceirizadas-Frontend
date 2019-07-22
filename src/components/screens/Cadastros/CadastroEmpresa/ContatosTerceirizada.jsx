import React from "react";
import { Field } from "redux-form";
import { required } from "../../../../helpers/fieldValidators";
import { fieldTel } from "./helper";

import {
  renderTelefone,
  renderEmail,
  renderTelefonePlus,
  renderEmailPlus
} from "./RenderField";

export const ContatosTerceirizada = ({ fields, meta: { error } }) => (
  <div className="container-fields">
    <div className="fields">
      <div className="fields-set">
        <Field
          name={`telefone_terceirizada`}
          component={renderTelefone}
          {...fieldTel}
          validate={required}
        />
        <Field
          name={`email_terceirizada`}
          component={renderEmail}
          label={`E-mail`}
          validate={required}
        />
      </div>
      {fields.map((field, index) => (
        <div key={index} className="fields-set">
          <Field
            name={`telefone_terceirizada_${index}`}
            component={renderTelefonePlus}
            {...fieldTel}
            validate={required}
          />
          <Field
            name={`email_terceirizada_${index}`}
            component={renderEmailPlus}
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
