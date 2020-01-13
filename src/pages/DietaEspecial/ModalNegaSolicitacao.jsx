import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";

import Select from "../../components/Shareable/Select";
import {
  toastSuccess,
  toastError
} from "../../components/Shareable/Toast/dialogs";
import { TextAreaWYSIWYG } from "../../components/Shareable/TextArea/TextAreaWYSIWYG";

import {
  getMotivosNegacaoDietaEspecial,
  negaSolicitacaoDietaEspecial
} from "../../services/painelNutricionista.service";

class ModalNegaSolicitacaoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      motivosNegacao: []
    };
  }

  componentDidMount = async () => {
    const motivosNegacao = await getMotivosNegacaoDietaEspecial();
    this.setState({
      motivosNegacao: motivosNegacao.results
    });
  };

  render() {
    const { show, onClose, motivo, handleSubmit } = this.props;
    const { motivosNegacao } = this.state;
    const opcoesMotivo =
      motivosNegacao.length === 0
        ? [{ uuid: "0", nome: "Carregando..." }]
        : [{ uuid: "0", nome: "Selecione" }].concat(
            motivosNegacao.map(m => {
              return {
                uuid: m.id.toString(),
                nome: m.descricao,
                selected: m.id.toString() === motivo.toString()
              };
            })
          );
    return (
      <Modal show={show} onHide={() => onClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja negar a solicitação?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="row title">
              <div className="col-12">
                <p>Motivo</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Field
                  component={Select}
                  name="motivo"
                  options={opcoesMotivo}
                  onChange={event => {
                    this.props.change("motivo", event.target.value.toString());
                  }}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Field
                  component={TextAreaWYSIWYG}
                  label="Justificativa"
                  name="justificativa"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => onClose()}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleSubmit}>
            Negar Solicitação
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalNegaSolicitacaoForm = reduxForm({
  form: "nega-dieta-especial",
  enableReinitialize: true,
  initialValues: {
    motivo: "0"
  },
  validate: ({ justificativa, motivo }) => {
    let erros = {};
    if (
      justificativa === undefined ||
      justificativa === "" ||
      justificativa === "<p></p>\n"
    ) {
      erros.justificativa = "É necessário preencher a justificativa";
    }
    if (motivo === undefined || motivo === "0") {
      erros.motivo = "Selecione um motivo";
    }
    return erros;
  }
})(ModalNegaSolicitacaoForm);

const selector = formValueSelector("nega-dieta-especial");
ModalNegaSolicitacaoForm = connect(state => {
  const motivo = selector(state, "motivo");
  return { motivo };
})(ModalNegaSolicitacaoForm);

export default class ModalNegaSolicitacao extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = async formData => {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const resposta = await negaSolicitacaoDietaEspecial({ uuid, ...formData });
    if (resposta.status === 200) {
      this.props.onClose();
      toastSuccess(resposta.data.mensagem);
    } else {
      toastError(`Erro ao negar solicitação: ${resposta}`);
    }
  };

  render() {
    return <ModalNegaSolicitacaoForm onSubmit={this.submit} {...this.props} />;
  }
}
