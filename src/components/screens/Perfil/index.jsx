import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  meusDados,
  atualizarEmail,
  atualizarSenhaLogado
} from "../../../services/perfil.service";
import { AvatarCODAE } from "../../Shareable/Avatar/AvatarCODAE";
import { AvatarDRE } from "../../Shareable/Avatar/AvatarDRE";
import { AvatarEscola } from "../../Shareable/Avatar/AvatarEscola";
import { AvatarTerceirizada } from "../../Shareable/Avatar/AvatarTerceirizada";
import { TIPO_PERFIL, ENTER } from "../../../constants";
import { formataCPF } from "../../../helpers/utilities";
import InputText from "../../Shareable/Input/InputText";
import "./style.scss";
import Botao from "../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../Shareable/Botao/constants";
import ModalAlterarSenha from "./components/ModalAlterarSenha";
import { toastSuccess, toastError } from "../../Shareable/Toast/dialogs";
import { TIPOS_EMAIL_CADASTRO } from "../../Login/constans";
import Select from "../../Shareable/Select";
import { required } from "../../../helpers/fieldValidators";
import authService from "../../../services/auth";
import { formatarTipoPerfil } from "./helper";

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLabel: "Editar",
      meusDados: null,
      showModal: false
    };
    this.abrirModal = this.abrirModal.bind(this);
    this.fecharModal = this.fecharModal.bind(this);
    this.onEditEmailClicked = this.onEditEmailClicked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    meusDados().then(meusDados => {
      this.setState({ meusDados });
      this.props.change("email", meusDados.email);
      this.props.change("tipo_email", meusDados.tipo_email);
    });
  }

  abrirModal() {
    this.setState({ showModal: true });
  }

  fecharModal() {
    this.setState({ showModal: false });
  }

  onSubmit(validado) {
    if (!validado) {
      toastError("Preencha os requisitos de segurança da senha");
    } else {
      const { senha_atual, senha, confirmar_senha } = this.props;
      const values = {
        senha_atual: senha_atual,
        senha: senha,
        confirmar_senha: confirmar_senha
      };
      atualizarSenhaLogado(values).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Senha atualizada com sucesso!");
          this.props.change("senha_atual", "");
          this.props.change("senha", "");
          this.props.change("confirmar_senha", "");
          this.fecharModal();
        } else {
          toastError(response.data.detail);
        }
      });
    }
  }

  onEditEmailClicked() {
    const { buttonLabel } = this.state;
    if (buttonLabel === "Editar") {
      this.setState({
        buttonLabel: "Salvar"
      });
    } else {
      atualizarEmail({
        email: this.props.email,
        tipo_email: this.props.tipo_email
      }).then(response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("E-mail atualizado com sucesso! Você será deslogado...");
          setTimeout(() => {
            authService.logout();
          }, 3000);
        } else {
          toastError("Erro ao atualizar e-mail");
        }
      });
    }
  }

  onKeyPress(event) {
    if (event.which === ENTER) {
      event.preventDefault();
    }
  }

  render() {
    const tipo_perfil = localStorage.getItem("tipo_perfil");
    const { buttonLabel, meusDados, showModal } = this.state;
    const { handleSubmit, senha } = this.props;
    return (
      <div className="profile">
        {!meusDados ? (
          <div>Carregando...</div>
        ) : (
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-4 information text-center">
                  <div className="row">
                    <div className="col-12">
                      <div className="avatar">
                        {[
                          TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA,
                          TIPO_PERFIL.DIETA_ESPECIAL
                        ].includes(tipo_perfil) && <AvatarCODAE />}
                        {tipo_perfil === TIPO_PERFIL.DIRETORIA_REGIONAL && (
                          <AvatarDRE />
                        )}
                        {tipo_perfil === TIPO_PERFIL.ESCOLA && <AvatarEscola />}
                        {tipo_perfil === TIPO_PERFIL.TERCEIRIZADA && (
                          <AvatarTerceirizada />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="name">{meusDados.nome}</div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="data">
                        <div>RF: {meusDados.registro_funcional}</div>
                        <div>CPF: {formataCPF(meusDados.cpf)}</div>
                        <div>
                          {formatarTipoPerfil(
                            meusDados.vinculo_atual.perfil.nome
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <div className="form">
                    <form
                      onSubmit={handleSubmit(this.onSubmit)}
                      onKeyPress={this.onKeyPress}
                    >
                      <div className="row">
                        <div className="col-11">
                          {tipo_perfil === TIPO_PERFIL.TERCEIRIZADA ? (
                            <Field
                              component={InputText}
                              esconderAsterisco
                              label="E-mail"
                              name="email"
                              disabled={buttonLabel === "Editar"}
                              type="email"
                            />
                          ) : (
                            <div className="input-group email-sme">
                              <div ref={this.emailInput} className="col-6">
                                <Field
                                  component={InputText}
                                  esconderAsterisco
                                  placeholder={"seu.nome"}
                                  label="E-mail"
                                  name="email"
                                  disabled={buttonLabel === "Editar"}
                                  type="text"
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
                                  disabled={buttonLabel === "Editar"}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-1 button">
                          <Botao
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            texto={buttonLabel}
                            onClick={this.onEditEmailClicked}
                            type={BUTTON_TYPE.BUTTON}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div
                          onClick={this.abrirModal}
                          className="col-12 password"
                        >
                          Alterar senha
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <ModalAlterarSenha
              showModal={showModal}
              closeModal={this.fecharModal}
              onSubmit={this.onSubmit}
              senha={senha}
            />
          </div>
        )}
      </div>
    );
  }
}

Perfil = reduxForm({
  form: "perfil",
  destroyOnUnmount: false
})(Perfil);

const selector = formValueSelector("perfil");
const mapStateToProps = state => {
  return {
    email: selector(state, "email"),
    tipo_email: selector(state, "tipo_email"),
    senha_atual: selector(state, "senha_atual"),
    senha: selector(state, "senha"),
    confirmar_senha: selector(state, "confirmar_senha")
  };
};

export default connect(mapStateToProps)(Perfil);
