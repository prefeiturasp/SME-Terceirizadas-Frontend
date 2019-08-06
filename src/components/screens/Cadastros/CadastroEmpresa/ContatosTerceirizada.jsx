import React, { Fragment } from "react";
import { Field } from "redux-form";
import { required } from "../../../../helpers/fieldValidators";
import { fieldTel } from "./helper";

import {
  renderTelefone,
  renderEmail,
  renderNutri,
  renderCRN
} from "./RenderField";

export const ContatosTerceirizada = ({ fields, meta: { error } }) => (
  <div className="container-fields">
    <div className="fields">
      <div className="fields-set">
        <Field
          name={`nutricionista_nome`}
          component={renderNutri}
          validate={required}
        />
        <Field name={`nutricionista_crn`} component={renderCRN} />
      </div>
      <div className="pt-2" />

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
        <Fragment>
          <div key={index} className="fields-set pt-3">
            <Field
              name={`nutricionista_nome_${index}`}
              component={renderNutri}
              validate={required}
            />
            <Field name={`nutricionista_crn_${index}`} component={renderCRN} />
          </div>
          <div key={index} className="fields-set pt-2">
            <Field
              name={`telefone_terceirizada_${index}`}
              component={renderTelefone}
              {...fieldTel}
              validate={required}
            />
            <Field
              name={`email_terceirizada_${index}`}
              component={renderEmail}
              label={`E-mail`}
              validate={required}
            />
          </div>
        </Fragment>
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
