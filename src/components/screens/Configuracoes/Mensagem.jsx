import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { required } from "../../../helpers/fieldValidators";
import {
  atualizarTemplateMensagem,
  getTemplateMensagemDetalhe,
  getTemplatesMensagem
} from "../../../services/configuracoesMensagens";
import BaseButton, { ButtonStyle, ButtonType } from "../../Shareable/button";
import { toastError, toastSuccess } from "../../Shareable/Toast/dialogs";
import {
  LabelAndCombo,
  LabelAndInput,
  LabelAndTextArea
} from "../../Shareable/labelAndInput/labelAndInput";
import { getOptions } from "./helper";
import "./style.scss";

class Mensagem extends Component {
  constructor(props) {
    super(props);
    this.state = { templates: [] };
  }

  onTipoEmailComboChanged(uuid) {
    if (uuid !== "Selecione") {
      getTemplateMensagemDetalhe(uuid).then(resp => {
        this.props.change("assunto", resp.assunto);
        this.props.change("template_html", resp.template_html);
      });
    } else {
      this.props.reset();
    }
  }

  onSubmit(values) {
    const uuid = values.tipo_email;
    atualizarTemplateMensagem(uuid, values).then(resp => {
      if (resp.status === HTTP_STATUS.OK) {
        toastSuccess("Configurações de E-mail salvas com sucesso!");
      } else {
        toastError("Falhou em atualizar o template");
      }
    });
  }

  componentDidMount() {
    getTemplatesMensagem().then(resp => {
      const templates = resp.results;
      this.setState({ templates });
    });
  }

  render() {
    const { handleSubmit, tipo_email } = this.props;
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
                    onChange={value => this.onTipoEmailComboChanged(value)}
                    options={getOptions(this.state.templates)}
                    validate={required}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <label className="label">Assunto</label>
                  <Field component={LabelAndInput} name="assunto" disabled />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-12">
                  <label className="label">Template</label>
                  <Field
                    component={LabelAndTextArea}
                    name="template_html"
                    temOpcoesCustomizadas
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-4" />
                <div className="col-8 text-right">
                  <BaseButton
                    label="Cancelar"
                    onClick={() => this.props.reset()}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label={"Salvar"}
                    onClick={handleSubmit(values => {
                      this.onSubmit(values);
                    })}
                    className="ml-3"
                    disabled={!tipo_email || tipo_email === "Selecione"}
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
    tipo_email: selector(state, "tipo_email")
  };
};

export default connect(mapStateToProps)(MensagemForm);
