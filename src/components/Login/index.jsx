import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { required } from "../../helpers/fieldValidators";
import authService from "../../services/auth";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { LabelAndInput } from "../Shareable/labelAndInput/labelAndInput";
import "./style.scss";
import "../Shareable/style.scss";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarCadastro: false,
      termos: false
    };
  }

  onTermosClicked() {
    const termos = !this.state.termos;
    this.props.change("termos", termos);
    this.setState({ termos });
  }

  handleSubmit = values => {
    const { email, password } = values;
    if (email && password) {
      authService.login(email, password);
    }
  };

  renderLogin() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="form">
        <form className="login" onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            component={LabelAndInput}
            placeholder={"nome@sme.prefeitura.sp.gov.br"}
            label="E-mail"
            name="email"
            type="email"
            cols="12 12 12 12"
            validate={[required]}
          />
          <div className="form-group">
            <Field
              component={LabelAndInput}
              placeholder={"******"}
              label="Senha"
              type="password"
              name="password"
              cols="12 12 12 12"
              validate={required}
            />
            <p className="mt-2">
              <a href="#teste" className="text-primary">
                Esqueci minha senha
              </a>
            </p>
          </div>
          <BaseButton
            type={ButtonType.SUBMIT}
            style={ButtonStyle.Success}
            label="Acessar"
            disabled={pristine || submitting}
            className="btn-block"
          />
          <p
            onClick={() => this.setState({ mostrarCadastro: true })}
            className="text-center text-primary c-pointer mt-3"
          >
            Ainda não sou cadastrado
          </p>
        </form>
      </div>
    );
  }

  renderCadastro() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="form">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="row">
            <Field
              component={LabelAndInput}
              placeholder={"nome@sme.prefeitura.sp.gov.br"}
              label="E-mail"
              name="email"
              type="email"
              cols="12 12 12 12"
              validate={[required]}
            />
          </div>
          <div className="row">
            <Field
              component={LabelAndInput}
              placeholder={"Digite seu nome"}
              label="Nome"
              name="nome"
              type="text"
              cols="6 6 6 6"
              validate={[required]}
            />
            <Field
              component={LabelAndInput}
              placeholder={"Digite seu sobrenome"}
              label="Sobrenome"
              name="sobrenome"
              type="text"
              cols="6 6 6 6"
              validate={[required]}
            />
          </div>
          <div className="row">
            <Field
              component={LabelAndInput}
              placeholder={"Digite o RF"}
              label="Nº RF"
              name="rf"
              type="text"
              cols="6 6 6 6"
              validate={[required]}
            />
            <Field
              component={LabelAndInput}
              placeholder={"Digite o vínculo da função"}
              label="Nº Vínculo"
              name="vinculo"
              type="text"
              cols="6 6 6 6"
              validate={[required]}
            />
          </div>
          <div className="row">
            <Field
              component={LabelAndInput}
              placeholder={"******"}
              label="Senha"
              type="password"
              name="senha"
              cols="6 6 6 6"
              validate={required}
            />
            <Field
              component={LabelAndInput}
              placeholder={"******"}
              label="Confirme sua senha"
              type="password"
              name="confirmar_senha"
              cols="6 6 6 6"
              validate={required}
            />
          </div>
          <p className="terms my-auto pt-2">Termos de uso</p>
          <div className="col-12 pl-4 pt-2 pb-2" >
            <label htmlFor="check" className="checkbox-label">
              <Field component={"input"} type="checkbox" name="termos" />
              <span
                onClick={() => this.onTermosClicked()}
                className="checkbox-custom"
              />{" "}
              Li e concordo com os termos de usp
            </label>
            <span
              onClick={() => this.setState({ mostrarCadastro: false })}
              className="text-primary c-pointer float-right"
            >
              Voltar
            </span>
          </div>
          <div className="pt-2">
            <BaseButton
              type={ButtonType.SUBMIT}
              style={ButtonStyle.Success}
              label="Cadastrar"
              disabled={pristine || submitting}
              className="btn-block"
            />
          </div>
        </form>
      </div>
    );
  }

  render() {
    const { mostrarCadastro } = this.state;
    return (
      <div>
        <div className="login-bg" />
        <div className="right-half">
          <div className="container my-auto">
            <div className="logo-sigpae">
              <img src="/assets/image/logo-sigpae-com-texto.png" alt="" />
            </div>
            {!mostrarCadastro ? this.renderLogin() : this.renderCadastro()}
            <div className="logo-prefeitura">
              <img src="/assets/image/logo-prefeitura.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login = reduxForm({
  form: "login",
  destroyOnUnmount: false
})(Login);

export default Login;
