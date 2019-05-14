import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { email, required } from "../../../helpers/fieldValidators";
import { LabelAndCombo, LabelAndInput } from "../../Shareable/labelAndInput";
import { generateOptions } from "./helper";
class EmailConfiguration extends Component {
  render() {
    return (
      <div className="container">
        <div>
          <label className="category">Configurações de Emails</label>
        </div>
        <form>
          <div className="border rounded p-2">
            <div className="form-group row">
              <Field
                component={LabelAndInput}
                label="Usuário"
                type="e-mail"
                name="username"
                validate={email}
                placeholder="contato@sme.prefeitura.sp.gov.br"
                cols="6 6 6 6"
              />
              <Field
                component={LabelAndInput}
                label="Senha"
                type="password"
                name="password"
                validate={required}
                cols="6 6 6 6"
              />
            </div>
          </div>
          <div className="border rounded p-2 mt-3">
            <div className="form-group row">
              <Field
                component={LabelAndInput}
                cols="6 6 6 6"
                label="Remetente padrão"
                name="from_email"
                validate={email}
                placeholder="contato@sme.prefeitura.sp.gov.br"
              />
            </div>
            <div className="form-group row">
              <Field
                component={LabelAndInput}
                cols="5 5 5 5"
                label="Servidor SMTP"
                validate={required}
                placeholder="smtp.sme.prefeitura.sp.gov.br"
                name="host"
              />
              <Field
                component={LabelAndCombo}
                cols="2 2 2 2"
                options={generateOptions([587, 465, 25])}
                label="Porta"
                name="port"
              />
              <Field
                component={LabelAndCombo}
                cols="2 2 2 2"
                options={generateOptions(["SSL", "TLS"])}
                label="Segurança"
                name="security"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default (EmailConfiguration = reduxForm({
  form: "emailConfiguration",
  destroyOnUnmount: false
})(EmailConfiguration));
