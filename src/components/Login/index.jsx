import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { length, required } from "../../helpers/fieldValidators";
import authService from "../../services/auth";
import { recuperaSenha, setUsuario } from "../../services/perfil.service";
import { Botao } from "../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Shareable/Botao/constants";
import { InputText } from "../Shareable/Input/InputText";
import Select from "../Shareable/Select";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import { TIPOS_EMAIL_CADASTRO } from "./constans";
import "./style.scss";
import { validarForm } from "./validar";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarCadastro: false,
      termos: false,
      habilitarCampos: false,
      email_recuperacao: "",
      bloquearBotao: false,
      width: null,
      componenteAtivo: this.COMPONENTE.LOGIN
    };
    this.emailInput = React.createRef();
  }

  COMPONENTE = {
    LOGIN: 0,
    RECUPERAR_SENHA: 1,
    CADASTRAR: 2,
    RECUPERACAO_SENHA_OK: 3,
    RECUPERACAO_SENHA_NAO_OK: 4
  };

  componentDidUpdate() {
    if (this.emailInput.current && !this.state.width) {
      const width = this.emailInput.current.offsetWidth;
      this.setState({ width });
    }
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

  handleRecuperaSenha = registro_funcional => {
    recuperaSenha(registro_funcional.email_ou_rf).then(resp => {
      if (resp.status === HTTP_STATUS.OK) {
        this.setState({
          componenteAtivo: this.COMPONENTE.RECUPERACAO_SENHA_OK,
          email_recuperacao: resp.data.email
        });
      } else {
        this.setState({
          componenteAtivo: this.COMPONENTE.RECUPERACAO_SENHA_NAO_OK
        });
      }
    });
  };

  handleSubmitCadastro = values => {
    const erro = validarForm(values);
    if (erro) {
      toastError(erro);
    } else {
      this.setState({ bloquearBotao: true });
      setUsuario(values).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(
            "Cadastro efetuado com sucesso! Confirme seu e-mail para poder se logar."
          );
          this.setState({ bloquearBotao: false });
          setTimeout(() => window.location.reload(), 2000);
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(response.data.detail);
          this.setState({ bloquearBotao: false });
        }
      });
    }
  };

  renderLogin() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { bloquearBotao } = this.state;
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
            <Link
              className="hyperlink"
              to="#"
              data-cy="esqueci-senha"
              onClick={() =>
                this.setState({
                  componenteAtivo: this.COMPONENTE.RECUPERAR_SENHA
                })
              }
            >
              Esqueci minha senha
            </Link>
          </p>
          <Botao
            className="col-12"
            style={BUTTON_STYLE.GREEN}
            texto="Acessar"
            disabled={pristine || submitting || bloquearBotao}
            type={BUTTON_TYPE.SUBMIT}
          />
          <Link
            className="hyperlink text-center mt-3 d-block"
            data-cy="ainda-nao-cadastrado"
            onClick={() =>
              this.setState({ componenteAtivo: this.COMPONENTE.CADASTRAR })
            }
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
    const { bloquearBotao } = this.state;
    return (
      <div className="form">
        <form onSubmit={handleSubmit(this.handleSubmitCadastro)}>
          <div className="row">
            <div className="input-group email-sme">
              <div ref={this.emailInput} className="col-6">
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
              <div className="input-group-append col-6">
                <Field
                  component={Select}
                  name="tipo_email"
                  options={TIPOS_EMAIL_CADASTRO}
                  required
                  validate={required}
                  naoDesabilitarPrimeiraOpcao
                  width={this.state.width}
                />
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
          <div className="pt-2">
            <Botao
              type={BUTTON_TYPE.SUBMIT}
              style={BUTTON_STYLE.GREEN}
              texto="Cadastrar"
              className="col-12"
              disabled={bloquearBotao}
            />
          </div>
        </form>
      </div>
    );
  }
  renderRecuperacaoOK() {
    return (
      <div>
        <h3 className="texto-simples-grande mt-3">Recuperação de Senha</h3>
        <center className="mt-5">
          <div className="div-circular-verde">
            <div>
              <i className="fas fa-check fa-3x check-verde" />
            </div>
          </div>
        </center>
        <div className="mt-3 alinha-centro">
          <div>
            <p className="texto-simples-verde mt-2">
              {`Seu link de recuperação de senha foi enviado para
            ${this.state.email_recuperacao}`}
            </p>
            <p className="texto-simples-verde mt-2">
              Verifique sua caixa de entrada!
            </p>
          </div>
        </div>
        <center className="mt-5">
          <Botao
            className="col-4 "
            style={BUTTON_STYLE.GREEN}
            texto="Continuar"
            type={BUTTON_TYPE.SUBMIT}
            onClick={() =>
              this.setState({ componenteAtivo: this.COMPONENTE.LOGIN })
            }
          />
        </center>
      </div>
    );
  }

  renderRecuperacaoNOK() {
    return (
      <div>
        <h3 className="texto-simples-grande mt-3">Recuperação de Senha</h3>
        <center className="mt-5">
          <div className="div-circular-vermelho">
            <div>
              <i className="fas fa-times fa-3x check-vermelho" />
            </div>
          </div>
        </center>
        <center>
          <div className="col-8 mt-3">
            <p className="texto-simples-vermelho mt-2">
              Você não tem um e-mail cadastrado para recuperar sua senha.
            </p>
            <p className="texto-simples-vermelho mt-2">
              Para restabelecer o seu acesso, procure o Diretor da sua unidade.
            </p>
          </div>
        </center>
        <center>
          <Botao
            className="col-4"
            style={BUTTON_STYLE.GREEN}
            texto="Continuar"
            type={BUTTON_TYPE.SUBMIT}
            onClick={() =>
              this.setState({ componenteAtivo: this.COMPONENTE.LOGIN })
            }
          />
        </center>
      </div>
    );
  }

  renderEsqueciSenha() {
    const { handleSubmit } = this.props;
    return (
      <div className="form">
        <h3 className="texto-simples-grande mt-3">Recuperação de Senha</h3>
        <p className="texto-simples mt-4">
          Caso você tenha cadastrado um endereço de e-mail, informe seu usuário
          ou RF e ao continuar você receberá um e-mail com as orientações para
          redefinição da sua senha.
        </p>
        <p className="texto-simples">
          Se você não tem e-mail cadastrado ou não tem mais acesso ao endereço
          de e-mail cadastrado, procure o responsável pelo SIGPAE na sua
          unidade.
        </p>
        <form className="login ml-4 mr-4">
          <Field
            component={InputText}
            esconderAsterisco
            label="E-mail ou RF"
            name="email_ou_rf"
            placeholder={"nome@sme.prefeitura.sp.gov.br ou RF"}
            validate={[required]}
          />
        </form>

        <div className="alinha-direita mt-3 ml-4 mr-4">
          <Botao
            className="col-3"
            style={BUTTON_STYLE.BLUE_OUTLINE}
            texto="Voltar"
            onClick={() =>
              this.setState({ componenteAtivo: this.COMPONENTE.LOGIN })
            }
            type={BUTTON_TYPE.SUBMIT}
          />
          <Botao
            className="col-3 ml-2"
            style={BUTTON_STYLE.GREEN_OUTLINE}
            texto="Cancelar"
            type={BUTTON_TYPE.SUBMIT}
            onClick={() =>
              this.setState({ componenteAtivo: this.COMPONENTE.LOGIN })
            }
          />
          <Botao
            className="col-3 ml-2"
            style={BUTTON_STYLE.GREEN}
            texto="Continuar"
            type={BUTTON_TYPE.SUBMIT}
            onClick={handleSubmit(values => this.handleRecuperaSenha(values))}
          />
        </div>
      </div>
    );
  }

  renderSwitch(param) {
    switch (param) {
      case this.COMPONENTE.LOGIN:
        return this.renderLogin();
      case this.COMPONENTE.CADASTRAR:
        return this.renderCadastro();
      case this.COMPONENTE.RECUPERAR_SENHA:
        return this.renderEsqueciSenha();
      case this.COMPONENTE.RECUPERACAO_SENHA_OK:
        return this.renderRecuperacaoOK();
      case this.COMPONENTE.RECUPERACAO_SENHA_NAO_OK:
        return this.renderRecuperacaoNOK();
      default:
        return this.renderLogin();
    }
  }

  render() {
    const { componenteAtivo } = this.state;

    return (
      <div>
        <div className="login-bg" />
        <div className="right-half">
          <div className="container my-auto">
            <div className="logo-sigpae">
              <img src="/assets/image/logo-sigpae-com-texto.png" alt="" />
            </div>
            {this.renderSwitch(componenteAtivo)}
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
