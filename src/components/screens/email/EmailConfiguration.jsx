import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { email, required } from "../../../helpers/fieldValidators";
import { getEmailConfiguration, setEmailConfiguration, testEmailConfiguration } from "../../../services/email";
import BaseButton, { ButtonStyle, ButtonType } from "../../Shareable/button";
import { LabelAndCombo, LabelAndInput } from "../../Shareable/labelAndInput";
import IsVisible from "../../Shareable/layout";
import { generateOptions, SECURITY_OPTIONS } from "./helper";
class EmailConfiguration extends Component {
  state = { showTest: false };
  onSubmit(values) {
    if (values.security === SECURITY_OPTIONS.TLS) {
      values.use_tls = true;
      values.use_ssl = false;
    } else {
      values.use_tls = false;
      values.use_ssl = true;
    }
    const resp = setEmailConfiguration(values);
    resp.then(e => console.log("PUT", e));
  }

  onTestConfiguration(toEmail) {
    const prom = testEmailConfiguration(toEmail);
    prom.then(resp => {
      console.log("RESPOSTA....", resp);
    });
  }

  componentDidMount() {
    const conf = getEmailConfiguration();
    conf
      .then(resp => {
        this.props.reset();
        this.props.change("username", resp.username);
        this.props.change("from_email", resp.from_email);
        this.props.change("host", resp.host);
        this.props.change("port", resp.port);
        this.props.change("password", resp.password);
        if (resp.use_tls) {
          this.props.change("security", SECURITY_OPTIONS.TLS);
        } else {
          this.props.change("security", SECURITY_OPTIONS.SSL);
        }
        this.setState({ showTest: true });
      })
      .catch(resp => {
        this.setState({ showTest: false });
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
                options={generateOptions([
                  "",
                  SECURITY_OPTIONS.SSL,
                  SECURITY_OPTIONS.TLS
                ])}
                label="Segurança"
                name="security"
              />
            </div>
            <IsVisible isVisible={this.state.showTest}>
              <div className="form-group row">
                <Field
                  component={LabelAndInput}
                  name="testEmail"
                  cols="3 3 3 3"
                  label="Insira um email pessoal para testar"
                  validate={email}
                  placeholder="seu-email@sme.com"
                />
                <BaseButton
                  label="Testar"
                  className="ml-3"
                  type={ButtonType.SUBMIT}
                  onClick={handleSubmit(values =>
                    this.onTestConfiguration(values.testEmail)
                  )}
                  style={ButtonStyle.OutlineDark}
                />
              </div>
            </IsVisible>
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
  // initialValues: {
  //   username: "mmaia.cc@gmail.com",
  //   password: "asoidjasiod",
  //   from_email: "mmaia.cc@gmail.com",
  //   host: "smtp.gmail.com",
  //   security: "TLS",
  //   port: "587"
  // }
})(EmailConfiguration));
