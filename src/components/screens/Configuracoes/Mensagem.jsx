import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import {
  LabelAndCombo,
  LabelAndInput,
  LabelAndTextArea
} from "../../Shareable/labelAndInput/labelAndInput";
import BaseButton, { ButtonStyle, ButtonType } from "../../Shareable/button";
import { required } from "../../../helpers/fieldValidators";
import { toastSuccess } from "../../Shareable/dialogs";
import "./style.scss";

class Mensagem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  lidarComCampo(tipoCampo, value) {
    if (tipoCampo === "tipo_email") {
      const newValue = value === "Selecione" ? null : value;
      this.props.change("assunto", newValue);
    }
  }

  onSubmit(values) {
    toastSuccess("Configurações de E-mail salvas com sucesso!");
  }

  render() {
    const { handleSubmit, cancelar_notificacao } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="card configuracao-mensagem mt-3">
            <div className="card-body">
              <div className="row">
                <div className="col-8">
                  <label className="label">Tipo de email</label>
                  <Field
                    component={LabelAndCombo}
                    name="tipo_email"
                    onChange={value => this.lidarComCampo("tipo_email", value)}
                    options={[
                      {
                        value: null,
                        label: "Selecione"
                      },
                      {
                        value: "Alteração de Cardápio",
                        label: "Alteração de Cardápio"
                      },
                      {
                        value: "Inclusão de Alimentação",
                        label: "Inclusão de Alimentação"
                      },
                      {
                        value: "Suspensão de Alimentação",
                        label: "Suspensão de Alimentação"
                      },
                      {
                        value: "Alteração de Dias de Cardápio",
                        label: "Alteração de Dias de Cardápio"
                      },
                      {
                        value: "Solicitação de Kit Lanche",
                        label: "Solicitação de Kit Lanche"
                      },
                      {
                        value: "Aprovação de Kit Lanche",
                        label: "Aprovação de Kit Lanche"
                      }
                    ]}
                    validate={required}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <label className="label">Assunto</label>
                  <Field
                    component={LabelAndInput}
                    name="assunto"
                    onChange={value => this.lidarComCampo()}
                    disabled
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <label className="label">Mensagem</label>
                  <Field
                    component={LabelAndTextArea}
                    name="mensagem"
                    temOpcoesCustomizadas
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4">
                  <div className="cancel-notification">
                    <label htmlFor="check" className="checkbox-label">
                      <Field
                        component={"input"}
                        type="checkbox"
                        name="cancelar_notificacao"
                      />
                      <span
                        onClick={() =>
                          this.props.change(
                            "cancelar_notificacao",
                            !cancelar_notificacao
                          )
                        }
                        className="checkbox-custom"
                      />
                      Cancelar notificação
                    </label>
                  </div>
                </div>
                <div className="offset-4 col-4 text-right">
                  <BaseButton
                    label="Cancelar"
                    onClick={event => this.resetForm(event)}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label={"Salvar"}
                    onClick={handleSubmit(values =>
                      this.onSubmit({
                        ...values
                      })
                    )}
                    className="ml-3"
                    type={ButtonType.SUBMIT}
                    style={ButtonStyle.Primary}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const MensagemForm = reduxForm({
  form: "mensagemForm",
  enableReinitialize: true
})(Mensagem);
const selector = formValueSelector("mensagemForm");
const mapStateToProps = state => {
  return {
    cancelar_notificacao: selector(state, "cancelar_notificacao")
  };
};

export default connect(mapStateToProps)(MensagemForm);
