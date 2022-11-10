import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  length,
  required,
  rfOuCpf,
  semCaracteresEspeciais,
  validaCPF
} from "../../helpers/fieldValidators";
import authService from "../../services/auth";
import {
  atualizarSenhaLogado,
  recuperaSenha,
  setUsuario
} from "../../services/perfil.service";
import { Botao } from "../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Shareable/Botao/constants";
import { InputText } from "../Shareable/Input/InputText";
import { InputPassword } from "../Shareable/Input/InputPassword";
import Select from "../Shareable/Select";
import RequisitosSenha from "../Shareable/RequisitosSenha";
import { toastError, toastSuccess } from "../Shareable/Toast/dialogs";
import { TIPOS_EMAIL_CADASTRO, TABS } from "./constans";
import "./style.scss";
import { validarForm } from "./validar";
import {
  fieldCnpj,
  fieldCpf
} from "../screens/Cadastros/CadastroEmpresa/helper";
import { connect } from "react-redux";
import { composeValidators, deepCopy } from "helpers/utilities";
import { Form, Field as FieldFF } from "react-final-form";

const TOOLTIP_CPF = `Somente números`;
const TOOLTIP_CNPJ = `Somente números`;
const TOOLTIP_RF = `Somente números`;
const TOOLTIP_SENHA = `Pelo menos 8 caracteres, uma letra e um número" e ícone de "olho" onde ao clicar irá mostrar e ocular a senha.`;

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
      componenteAtivo: this.COMPONENTE.LOGIN,
      tab: TABS.ESCOLA,
      senhaAtual: null
    };
    this.emailInput = React.createRef();
  }

  COMPONENTE = {
    LOGIN: 0,
    RECUPERAR_SENHA: 1,
    CADASTRAR: 2,
    RECUPERACAO_SENHA_OK: 3,
    RECUPERACAO_SENHA_NAO_OK: 4,
    PRIMEIRO_ACESSO: 5
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get("tab") || TABS.ESCOLA;
    this.setState({
      tab,
      componenteAtivo:
        tab === TABS.TERCEIRIZADAS
          ? this.COMPONENTE.CADASTRAR
          : this.COMPONENTE.PRIMEIRO_ACESSO
    });
  }

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

  handleSubmit = async values => {
    const { login, password } = values;
    if (login && password) {
      const retorno = await authService.login(login, password);
      if (retorno === "primeiro_acesso") {
        this.setState({
          senhaAtual: password,
          componenteAtivo: this.COMPONENTE.PRIMEIRO_ACESSO
        });
      }
    }
  };

  handleAtualizarSenhaPrimeiroAcesso = async values => {
    const { senhaAtual } = this.state;
    const values_ = deepCopy(values);
    values_["senha_atual"] = senhaAtual;
    const response = await atualizarSenhaLogado(values_);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("senha atualizada com sucesso!");
      this.setState({ componenteAtivo: this.COMPONENTE.LOGIN });
    }
  };

  handleRecuperaSenha = values => {
    recuperaSenha(values.recuperar_login).then(resp => {
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
    const erro = validarForm(values, this.state);
    if (erro) {
      toastError(erro);
    } else {
      this.setState({ bloquearBotao: true });
      const newValues = Object.assign({}, values);
      if (this.state.tab === TABS.DRE_CODAE) {
        if (newValues["tipo_email"] === 0 || newValues["tipo_email"] === "0") {
          newValues["email"] = newValues["email"] + "@sme.prefeitura.sp.gov.br";
        }
        if (newValues["tipo_email"] === 1 || newValues["tipo_email"] === "1") {
          newValues["email"] = newValues["email"] + "@prefeitura.sp.gov.br";
        }
      }
      setUsuario(newValues).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess(
            `Cadastro efetuado com sucesso!${
              this.state.tab === TABS.ESCOLA ||
              this.state.tab === TABS.DRE_CODAE
                ? " Confirme seu e-mail para poder se logar."
                : ""
            }`
          );
          this.setState({
            bloquearBotao: false,
            componenteAtivo: this.COMPONENTE.LOGIN
          });
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError(response.data.detail);
          this.setState({ bloquearBotao: false });
        }
      });
    }
  };

  handleSubmitPrimeiroAcesso = () => {};

  switchTab(tab) {
    this.setState({ tab });
  }

  renderLogin() {
    const { handleSubmit, submitting } = this.props;
    const { bloquearBotao } = this.state;
    return (
      <div className="form">
        <form className="login" onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            component={InputText}
            esconderAsterisco
            label="Login"
            name="login"
            placeholder={"RF ou CPF"}
            required
            type="text"
            maxlength="11"
            apenasNumeros
            validate={[required, rfOuCpf]}
          />
          <Field
            component={InputPassword}
            esconderAsterisco
            label="Senha"
            name="password"
            placeholder={"******"}
            required
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
            disabled={submitting || bloquearBotao}
            type={BUTTON_TYPE.SUBMIT}
          />
          <p className="mt-3">
            Não possui uma conta? &nbsp;
            <Link
              className="hyperlink"
              data-cy="ainda-nao-cadastrado"
              onClick={() =>
                this.setState({ componenteAtivo: this.COMPONENTE.CADASTRAR })
              }
              to="#"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    );
  }

  renderCadastro() {
    const { handleSubmit } = this.props;
    const { bloquearBotao, tab } = this.state;
    return (
      <div className="signup-form">
        <div className="tabs d-md-block d-none">
          <div className="row">
            <div
              onClick={() => this.switchTab(TABS.ESCOLA)}
              className={`tab col-4 ${
                tab === TABS.ESCOLA ? "active" : "inactive"
              }`}
            >
              {TABS.ESCOLA}
            </div>
            <div
              onClick={() => this.switchTab(TABS.DRE_CODAE)}
              className={`tab col-4 ${
                tab === TABS.DRE_CODAE ? "active" : "inactive"
              }`}
            >
              {TABS.DRE_CODAE}
            </div>
            <div
              onClick={() => this.switchTab(TABS.TERCEIRIZADAS)}
              className={`tab col-4 ${
                tab === TABS.TERCEIRIZADAS ? "active" : "inactive"
              }`}
            >
              {TABS.TERCEIRIZADAS}
            </div>
          </div>
        </div>
        <div className="input-group-append d-block d-md-none col-md-6 col-12">
          <Field
            component={Select}
            name="tipo_cadastro"
            label="Tipo de Cadastro"
            options={[
              {
                nome: "ESCOLA"
              },
              {
                nome: "DRE/CODAE"
              },
              {
                nome: "EMPRESA"
              }
            ]}
            onChange={evt => {
              this.switchTab(evt.target.value);
            }}
            naoDesabilitarPrimeiraOpcao
          />
        </div>
        <div className="form">
          <form onSubmit={handleSubmit(this.handleSubmitCadastro)}>
            {tab === TABS.DRE_CODAE && (
              <div className="row">
                <div className="input-group email-sme">
                  <div ref={this.emailInput} className="col-12 col-md-6">
                    <Field
                      component={InputText}
                      placeholder={"Início do seu E-mail SME"}
                      label="E-mail"
                      name="email"
                      required
                      type="text"
                      validate={[required, semCaracteresEspeciais]}
                    />
                  </div>
                  <div className="input-group-append d-none d-md-flex col-md-6">
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
                  <div className="input-group-append d-block d-md-none col-md-6">
                    <Field
                      component={Select}
                      name="tipo_email"
                      label="Tipo de e-mail"
                      options={TIPOS_EMAIL_CADASTRO}
                      required
                      validate={required}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                </div>
              </div>
            )}
            {(tab === TABS.TERCEIRIZADAS || tab === TABS.ESCOLA) && (
              <div className="row">
                <div className="col-12">
                  <Field
                    component={InputText}
                    placeholder={"seu_email@dominio.com"}
                    label="E-mail"
                    name="email"
                    required
                    type="email"
                    validate={[required]}
                  />
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-12 col-md-6">
                <Field
                  {...fieldCpf}
                  component={InputText}
                  label="CPF"
                  name="cpf"
                  placeholder={"Digite seu CPF"}
                  tooltipText={TOOLTIP_CPF}
                  required
                  type="text"
                  validate={required}
                />
              </div>
              {(tab === TABS.ESCOLA || tab === TABS.DRE_CODAE) && (
                <div className="col-12 col-md-6">
                  <Field
                    component={InputText}
                    label="Nº RF"
                    name="registro_funcional"
                    placeholder={"Digite seu RF"}
                    tooltipText={TOOLTIP_RF}
                    required
                    type="text"
                    pattern="\d*"
                    title="somente números"
                    maxlength="7"
                    validate={[required, length(7)]}
                  />
                </div>
              )}
              {tab === TABS.TERCEIRIZADAS && (
                <div className="col-12 col-md-6">
                  <Field
                    {...fieldCnpj}
                    component={InputText}
                    label="CNPJ"
                    name="cnpj"
                    placeholder={"Digite o CNPJ da Empresa"}
                    tooltipText={TOOLTIP_CNPJ}
                    required
                    type="text"
                    validate={[required]}
                  />
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <Field
                  component={InputPassword}
                  label="Senha"
                  name="password"
                  placeholder={"******"}
                  tooltipText={TOOLTIP_SENHA}
                  required
                  validate={required}
                  pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                  title="Pelo menos 8 caracteres, uma letra e um número"
                />
              </div>
              <div className="col-12 col-md-6">
                <Field
                  component={InputPassword}
                  label="Confirme sua senha"
                  name="confirmar_password"
                  placeholder={"******"}
                  required
                  validate={required}
                />
              </div>
            </div>
            <div className="alinha-direita mt-3 ml-4">
              <Botao
                style={BUTTON_STYLE.GREEN_OUTLINE}
                texto="Cancelar"
                className="col-md-2 ml-3"
                disabled={bloquearBotao}
                onClick={() =>
                  this.setState({ componenteAtivo: this.COMPONENTE.LOGIN })
                }
              />
              <Botao
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                texto="Cadastrar"
                className="col-md-2 ml-3"
                disabled={bloquearBotao}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
  renderRecuperacaoOK() {
    return (
      <div>
        <h3 className="texto-simples-grande mt-3">Recuperação de Senha</h3>
        <center>
          <div className="mt-3">
            <div className="alerta-verde mt-2">
              <i className="far fa-check-circle" />
              <p>E-mail de recuperação enviado com sucesso</p>
            </div>
            <p className="mt-1">
              {`Seu link de recuperação de senha foi enviado para
            ${this.state.email_recuperacao}`}
            </p>
            <p className="mt-2">Verifique sua caixa de entrada ou spam</p>
          </div>
        </center>
        <center className="mt-4">
          <Botao
            className="col-sm-4 col-8"
            style={BUTTON_STYLE.GREEN}
            texto="Voltar ao Início"
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
        <center className="mt-4">
          <div className="mt-3">
            <div className="alerta-vermelho mt-2">
              <i className="far fa-times-circle" />
              <p>Usuário não encontrado</p>
            </div>
            <p className="mt-1">
              Você não tem um usuário cadastrado para recuperar sua senha.
            </p>
            <p className="mt-2">
              Para restabelecer o seu acesso, procure o Diretor da sua unidade.
            </p>
          </div>
        </center>
        <center>
          <Botao
            className="col-sm-4 col-6"
            style={BUTTON_STYLE.GREEN}
            texto="Voltar ao Início"
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
    const { servidor, handleSubmit } = this.props;
    return (
      <div className="form">
        <h3 className="texto-simples-grande mt-3">Recuperação de Senha</h3>
        <p className="texto-simples mt-4">
          Caso você tenha cadastro, ao continuar você receberá um e-mail com as
          orientações para redefinição da sua senha.
        </p>
        <p className="texto-simples">
          Se você não tem e-mail cadastrado ou não tem mais acesso ao endereço
          de e-mail cadastrado, procure o responsável pelo SIGPAE na sua
          unidade.
        </p>
        <p>É Servidor?</p>
        <form className="login">
          <div className="row ml-0">
            <div className="col-3">
              <label className="container-radio">
                Sim
                <Field
                  component={"input"}
                  type="radio"
                  value="1"
                  name="servidor"
                />
                <span className="checkmark" />
              </label>
            </div>
            <div className="col-3">
              <label className="container-radio">
                Não
                <Field
                  component={"input"}
                  type="radio"
                  value="0"
                  name="servidor"
                />
                <span className="checkmark" />
              </label>
            </div>
          </div>
          {servidor !== undefined && (
            <Field
              component={InputText}
              type="number"
              label={servidor === "1" ? "RF" : "CPF"}
              name="recuperar_login"
              placeholder={`Digite seu ${servidor === "1" ? "RF" : "CPF"}`}
              validate={composeValidators(
                required,
                servidor === "1" ? length(7) : validaCPF
              )}
            />
          )}
        </form>

        <div className="alinha-direita mt-3 ml-4 mr-4">
          <Botao
            className="col-md-2 ml-3"
            style={BUTTON_STYLE.GREEN_OUTLINE}
            texto="Cancelar"
            type={BUTTON_TYPE.SUBMIT}
            onClick={() =>
              this.setState({ componenteAtivo: this.COMPONENTE.LOGIN })
            }
          />
          <Botao
            className="col-md-2 ml-3"
            style={BUTTON_STYLE.GREEN}
            texto="Continuar"
            type={BUTTON_TYPE.SUBMIT}
            onClick={handleSubmit(values => this.handleRecuperaSenha(values))}
          />
        </div>
      </div>
    );
  }

  renderPrimeiroAcesso() {
    return (
      <div className="form primeiro-acesso">
        <Form
          onSubmit={this.handleSubmitPrimeiroAcesso}
          initialValues={{}}
          validate={() => {}}
          render={({ form, handleSubmit, values }) => {
            const letra = values.senha
              ? values.senha.match(/[a-zA-Z]/g)
              : false;
            const numero = values.senha ? values.senha.match(/[0-9]/g) : false;
            const tamanho = values.senha ? values.senha.length >= 8 : false;
            return (
              <form onSubmit={handleSubmit}>
                <p className="mb-0">
                  Seja bem-vindo(a) ao <strong>SIGPAE</strong>
                </p>
                <p>SISTEMA DE GESTÂO DO PROGRAMA DE ALIMENTAÇÂO ESCOLAR!</p>
                <p className="font-weight-bold">
                  Atualize sua senha de acesso:
                </p>
                <div className="row">
                  <div className="col-12">
                    <FieldFF
                      component={InputPassword}
                      label="Nova Senha"
                      name="senha"
                      placeholder={"Digite uma nova senha de acesso"}
                      onChange={event =>
                        this.onSenhaChanged(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <FieldFF
                      component={InputPassword}
                      label="Confirmação da Nova Senha"
                      name="confirmar_senha"
                      placeholder={"Confirme a senha digitada"}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <Botao
                      className="w-100 my-2"
                      style={BUTTON_STYLE.GREEN}
                      texto="Confirmar"
                      disabled={
                        !letra ||
                        !numero ||
                        !tamanho ||
                        values.senha !== values.confirmar_senha
                      }
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        this.handleAtualizarSenhaPrimeiroAcesso(values);
                      }}
                    />
                  </div>
                </div>

                <RequisitosSenha
                  letra={letra}
                  numero={numero}
                  tamanho={tamanho}
                />
              </form>
            );
          }}
        />
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
      case this.COMPONENTE.PRIMEIRO_ACESSO:
        return this.renderPrimeiroAcesso();
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
            {componenteAtivo !== this.COMPONENTE.PRIMEIRO_ACESSO ? (
              <div className="logo-sigpae">
                <img src="/assets/image/logo-sigpae-com-texto.svg" alt="" />
              </div>
            ) : (
              <div className="logo-sigpae-primeiro-acesso">
                <img src="/assets/image/logo-sigpae.png" alt="" />
                <div className="titulo">Primeiro Acesso</div>
              </div>
            )}
            {this.renderSwitch(componenteAtivo)}
            <div className="logo-prefeitura">
              <img src="/assets/image/EDUCAÇÃO_FUNDO_CLARO.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login = reduxForm({
  form: "login",
  destroyOnUnmount: false,
  initialValues: { tipo_email: 0 }
})(Login);
const selector = formValueSelector("login");
const mapStateToProps = state => {
  return {
    servidor: selector(state, "servidor")
  };
};

export default connect(mapStateToProps)(Login);
