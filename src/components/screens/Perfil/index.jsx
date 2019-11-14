import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { meusDados, atualizarEmail } from "../../../services/perfil.service";
import { AvatarCODAE } from "../../Shareable/Avatar/AvatarCODAE";
import { AvatarDRE } from "../../Shareable/Avatar/AvatarDRE";
import { AvatarEscola } from "../../Shareable/Avatar/AvatarEscola";
import { AvatarTerceirizada } from "../../Shareable/Avatar/AvatarTerceirizada";
import { TIPO_PERFIL } from "../../../constants";
import { formataCPF } from "../../../helpers/utilities";
import InputText from "../../Shareable/Input/InputText";
import "./style.scss";
import Botao from "../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../../Shareable/Botao/constants";
import ModalAlterarSenha from "./components/ModalAlterarSenha";
import { toastSuccess, toastError } from "../../Shareable/Toast/dialogs";
import authService from "../../../services/auth";

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
  }

  componentDidMount() {
    meusDados().then(meusDados => {
      this.setState({ meusDados });
      this.props.change("email", meusDados.email);
    });
  }

  abrirModal() {
    this.setState({ showModal: true });
  }

  fecharModal() {
    this.setState({ showModal: false });
  }

  onEditEmailClicked() {
    const { buttonLabel } = this.state;
    if (buttonLabel === "Editar") {
      this.setState({
        buttonLabel: "Salvar"
      });
    } else {
      atualizarEmail({ email: this.props.email }).then(response => {
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

  handleSubmit() {}

  render() {
    const tipo_perfil = localStorage.getItem("tipo_perfil");
    const { buttonLabel, meusDados, showModal } = this.state;
    const { handleSubmit } = this.props;
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
                        {tipo_perfil ===
                          TIPO_PERFIL.GESTAO_ALIMENTACAO_TERCEIRIZADA && (
                          <AvatarCODAE />
                        )}
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
                        <div>{meusDados.vinculo_atual.perfil.nome}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  <div className="form">
                    <form onSubmit={handleSubmit(this.handleSubmit)}>
                      <div className="row">
                        <div className="col-9">
                          <Field
                            component={InputText}
                            esconderAsterisco
                            label="E-mail"
                            name="email"
                            disabled={buttonLabel === "Editar"}
                            type="email"
                          />
                        </div>
                        <div className="col-3 button">
                          <Botao
                            style={BUTTON_STYLE.GREEN_OUTLINE}
                            texto={buttonLabel}
                            onClick={this.onEditEmailClicked}
                            type={BUTTON_TYPE.SUBMIT}
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
    email: selector(state, "email")
  };
};

export default connect(mapStateToProps)(Perfil);
