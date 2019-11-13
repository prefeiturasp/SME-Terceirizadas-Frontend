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
import { minLength, required } from "../helpers/fieldValidators";

class RecuperarSenhaPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const confirmationKey = urlParams.get("confirmationKey");
    // confirmarEmail(uuid, confirmationKey).then(response => {
    //   if (response.status === HTTP_STATUS.OK) {
    //     this.setState({ mensagem: "E-mail confirmado com sucesso!" });
    //   } else {
    //     this.setState({ mensagem: response.data.detail });
    //   }
    // });
  }

  render() {
    const { senha1, senha2, pristine } = this.props;
    return (
      <div>
        <HeaderLogo />
        <div className="container pt-3">
          <div className="card">
            <div className="card-body">
              <div className="card-title font-weight-bold">Troca de senha</div>
              <Field
                component={InputText}
                className="col-4"
                label="Senha:"
                required
                name="senha1"
                type="password"
                validate={[required, minLength(6)]}
                maxlength={20}
              />
              <Field
                component={InputText}
                className="col-4"
                label="Repetir senha:"
                required
                name="senha2"
                type="password"
                validate={required}
                maxlength={20}
                helpText={"As senhas devem ser iguais"}
              />
              <div className="pt-3">
                <Botao
                  texto="Confirmar senha"
                  type={BUTTON_TYPE.SUBMIT}
                  style={BUTTON_STYLE.GREEN}
                  disabled={senha1 !== senha2 || pristine}
                  className="ml-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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
