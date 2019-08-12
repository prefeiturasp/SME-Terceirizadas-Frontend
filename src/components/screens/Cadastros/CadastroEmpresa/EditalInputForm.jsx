import React from "react";
import { Field } from "redux-form";
import {
  required
} from "../../../../helpers/fieldValidators";

import { renderEdital, renderContrato } from './RenderField';


export const EditalInput = ({ fields, meta: { error } }) => (
  <div className="container-fields">
    <div className="fields">
      <div className="fields-set-edital">
        <Field
          name={`edital_0`}
          component={renderEdital}
          validate={required}
        />
        <Field
          name={`contrato_0`}
          component={renderContrato}
          validate={required}
        />
      </div>
      {fields.map((field, index) => (
        <div key={index} className="fields-set-edital">
          <Field
            name={`edital_${index + 1}`}
            component={renderEdital}
            validate={required}
          />
          <Field
            name={`contrato_${index + 1}`}
            component={renderContrato}
            validate={required}
          />
        </div>
      ))}
    </div>
    <div className="button-field">
      <button type="button" className="btn btn-outline-info" onClick={() => fields.push()}>
        +
      </button>
    </div>
  </div>
);