import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { JWT_AUTH } from "../constants/config.constants";
import { required } from "../helpers/fieldValidators";
import BaseButton, { ButtonStyle, ButtonType } from "./Shareable/button";
import { LabelAndInput } from "./Shareable/labelAndInput";

export class Login extends Component {
  handleSubmit = values => {
    const { email, password } = values;
    if (email && password) {
      axios.post(JWT_AUTH, values).then(res => {
        console.log("POST", res.data);
      });
    }
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <div className="container">
          <div className="card mb-5 mt-5 mx-auto card-width bg-dark">
            <div className="card-body">
              <div className="card-body text-center text-white">LOGO</div>
            </div>
          </div>
          <div className="card card-login mx-auto mt-5 card-width">
            <div className="card-body">
              <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="form-group">
                  <Field
                    component={LabelAndInput}
                    label="E-mail"
                    name="email"
                    // type="email"
                    validate={[required]}
                  />
                </div>
                <div className="form-group">
                  <Field
                    component={LabelAndInput}
                    label="Senha"
                    type="password"
                    name="password"
                    validate={required}
                  />
                  <p className="text-right mt-2">
                    <a href="#teste" className="text-primary">
                      Esqueci minha senha
                    </a>
                  </p>
                </div>
                <BaseButton
                  type={ButtonType.SUBMIT}
                  style={ButtonStyle.Primary}
                  label="Acessar"
                  disabled={pristine || submitting}
                  className="btn-block"
                />

                <p className="text-center mt-3">
                  <a href="#teste" className="text-primary">
                    Ainda não sou cadastrado
                  </a>
                </p>
              </form>
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

const selector = formValueSelector("login");
const mapStateToProps = state => {
  return {
    email: selector(state, "email"),
    password: selector(state, "password")
  };
};

export default connect(mapStateToProps)(Login);
