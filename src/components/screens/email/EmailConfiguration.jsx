import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { email, required } from "../../../helpers/fieldValidators";
import { getEmailConfiguration, setEmailConfiguration } from "../../../services/email";
import BaseButton, { ButtonStyle, ButtonType } from "../../Shareable/button";
import { LabelAndCombo, LabelAndInput } from "../../Shareable/labelAndInput";
import { generateOptions } from "./helper";
class EmailConfiguration extends Component {
  onSubmit(values) {
    const resp = setEmailConfiguration();
    resp.then(e => console.log("PUT", e));
  }

  componentWillMount() {
    const conf = getEmailConfiguration();
    conf.then(resp => {
      console.log(resp);
    });
  }

  render() {
    const { handleSubmit } = this.props;
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
                cols="6 6 6 6"
                label="Servidor SMTP"
                validate={required}
                placeholder="smtp.sme.prefeitura.sp.gov.br"
                name="host"
              />
              <Field
                component={LabelAndCombo}
                cols="2 2 2 2"
                options={generateOptions(["", "587", "465", "25"])}
                label="Porta"
                name="port"
              />
              <Field
                component={LabelAndCombo}
                cols="2 2 2 2"
                options={generateOptions(["", "SSL", "TLS"])}
                label="Segurança"
                name="security"
              />
            </div>
          </div>
          <div className="form-group row float-right">
            <BaseButton
              label="Cancelar"
              type={ButtonType.RESET}
              style={ButtonStyle.OutlinePrimary}
            />
            <BaseButton
              label="Enviar Configuração"
              type={ButtonType.SUBMIT}
              className="ml-2"
              onClick={handleSubmit(values =>
                this.onSubmit({
                  ...values
                })
              )}
              style={ButtonStyle.Primary}
            />
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
