import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { length, required, semArroba } from "../../helpers/fieldValidators";
import authService from "../../services/auth";
import { setUsuario } from "../../services/perfil.service";
import { Botao } from "../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Shareable/Botao/constants";
import { Checkbox } from "../Shareable/Checkbox";
import { InputText } from "../Shareable/Input/InputText";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import "./style.scss";
import { validarForm } from "./validar";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarCadastro: false,
      termos: false,
      habilitarCampos: false
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

  handleSubmitCadastro = values => {
    const erro = validarForm(values);
    if (erro) {
      toastError(erro);
    } else {
      setUsuario(values).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(
            "Cadastro efetuado com sucesso! Confirme seu e-mail para poder se logar."
          );
          setTimeout(() => window.location.reload(), 2000);
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(response.data.detail);
        }
      });
    }
  };

  renderLogin() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="form">
        <form className="login" onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            component={InputText}
            esconderAsterisco
            label="E-mail"
            name="email"
            placeholder={"nome@sme.prefeitura.sp.gov.br"}
            required
            type="email"
            validate={[required]}
          />
          <Field
            component={InputText}
            esconderAsterisco
            label="Senha"
            name="password"
            placeholder={"******"}
            required
            type="password"
            validate={required}
          />
          <p className="mt-2">
            <Link className="hyperlink" to="#" data-cy="esqueci-senha">
              Esqueci minha senha
            </Link>
          </p>
          <Botao
            className="col-12"
            style={BUTTON_STYLE.GREEN}
            texto="Acessar"
            disabled={pristine || submitting}
            type={BUTTON_TYPE.SUBMIT}
          />
          <Link
            className="hyperlink text-center mt-3 d-block"
            data-cy="ainda-nao-cadastrado"
            onClick={() => this.setState({ mostrarCadastro: true })}
            to="#"
          >
            Ainda não sou cadastrado
          </Link>
        </form>
      </div>
    );
  }

  renderCadastro() {
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <form onSubmit={handleSubmit(this.handleSubmitCadastro)}>
          <div className="row">
            <div className="col-12">
              <div className="input-group email-sme">
                <div className="col-8">
                  <Field
                    component={InputText}
                    placeholder={"seu.nome"}
                    label="E-mail"
                    name="email"
                    required
                    type="text"
                    validate={[required]}
                  />
                </div>
                <div className="input-group-append col-4">
                  <span className="input-group-text" id="basic-addon2">
                    @sme.prefeitura.sp.gov.br
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                component={InputText}
                label="Nº RF"
                name="registro_funcional"
                placeholder={"Digite o RF"}
                required
                type="text"
                pattern="\d*"
                title="somente números"
                helpText="Somente números"
                maxlength="7"
                validate={[required, length(7)]}
              />
            </div>
            <div className="col-6">
              <Field
                component={InputText}
                label="CPF"
                name="cpf"
                placeholder={"Digite o seu CPF"}
                required
                type="text"
                helpText="Somente números"
                pattern="\d*"
                maxlength="11"
                validate={[required, length(11)]}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                component={InputText}
                label="Senha"
                name="password"
                placeholder={"******"}
                required
                type="password"
                validate={required}
                pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                title="Pelo menos 8 caracteres, uma letra e um número"
                helpText="Pelo menos 8 caracteres, uma letra e um número"
              />
            </div>
            <div className="col-6">
              <Field
                component={InputText}
                label="Confirme sua senha"
                name="confirmar_password"
                placeholder={"******"}
                required
                type="password"
                validate={required}
              />
            </div>
          </div>
          <p className="terms my-auto pt-2">Termos de uso</p>
          <div className="row">
            <div className="col-8 pt-2">
              <Field
                classNameTexto={"text-terms"}
                component={Checkbox}
                name="termos"
                onClick={() => this.onTermosClicked()}
                texto="Li e concordo com os termos de uso"
              />
            </div>
            <div className="col-4">
              <Link
                className="hyperlink text-right mt-3 d-block"
                data-cy="voltar"
                onClick={() => this.setState({ mostrarCadastro: false })}
                to="#"
              >
                Voltar
              </Link>
            </div>
          </div>
          <div className="pt-2">
            <Botao
              type={BUTTON_TYPE.SUBMIT}
              style={BUTTON_STYLE.GREEN}
              texto="Cadastrar"
              className="col-12"
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
              <img src="/assets/image/logo-sme.svg" alt="" />
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
