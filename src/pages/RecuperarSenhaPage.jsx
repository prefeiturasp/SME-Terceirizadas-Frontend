import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { Botao } from "../components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../components/Shareable/Botao/constants";
import { HeaderLogo } from "../components/Shareable/HeaderLogo";
import InputText from "../components/Shareable/Input/InputText";
import {
  toastError,
  toastSuccess
} from "../components/Shareable/Toast/dialogs";
import { required } from "../helpers/fieldValidators";
import { atualizarSenha } from "../services/perfil.service";
import "./style.scss";
import { getError } from "../helpers/utilities";

class RecuperarSenhaPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mensagem: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(payLoad) {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const confirmationKey = urlParams.get("confirmationKey");
    atualizarSenha(uuid, confirmationKey, payLoad).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        this.setState({ mensagem: "Senha atualizada com sucesso!" });
        this.props.reset();
        toastSuccess("Senha atualizada com sucesso!");
        setTimeout(function() {
          window.location.href = "/";
        }, 1000);
      } else {
        this.setState({ mensagem: response.data.detail });
        toastError(`Erro: ${getError(response.data)}`);
      }
    });
  }

  render() {
    const { senha1, senha2, pristine, handleSubmit } = this.props;
    const { mensagem } = this.state;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <HeaderLogo />
        <div className="container pt-3">
          <div className="card">
            <div className="card-body alinha-centro">
              <div className="">
                <div className="card-title font-weight-bold">
                  Troca de senha
                </div>
                {mensagem}
                <Field
                  component={InputText}
                  label="Senha:"
                  required
                  name="senha1"
                  type="password"
                  validate={[required]}
                  maxlength={20}
                  pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                  title="Pelo menos 8 caracteres, uma letra e um número"
                  helpText="Pelo menos 8 caracteres, uma letra e um número"
                />
                <Field
                  component={InputText}
                  label="Repetir senha:"
                  required
                  name="senha2"
                  type="password"
                  validate={required}
                  maxlength={20}
                  helpText={"As senhas devem ser iguais"}
                  pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                  title="Pelo menos 8 caracteres, uma letra e um número"
                />
                <div className="pt-3 text-center">
                  <Botao
                    texto="Confirmar senha"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    disabled={senha1 !== senha2 || pristine}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
const formName = "recuperarSenha";

RecuperarSenhaPage = reduxForm({
  form: formName
})(RecuperarSenhaPage);

const selector = formValueSelector(formName);

const mapStateToProps = state => {
  return {
    senha1: selector(state, "senha1"),
    senha2: selector(state, "senha2")
  };
};

export default connect(mapStateToProps)(RecuperarSenhaPage);
