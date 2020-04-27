import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import HTTP_STATUS from "http-status-codes";
import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import { TextArea } from "../TextArea/TextArea";
import { required } from "../../../helpers/fieldValidators";
import { toastSuccess, toastError } from "../Toast/dialogs";

export class ModalAutorizarAposQuestionamento extends Component {
  async autorizarQuestionamento(uuid) {
    const resp = await this.props.endpoint(uuid, {
      justificativa: this.props.justificativa
    });
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      this.props.loadSolicitacao(this.props.uuid, this.props.ehEscolaTipoCei);
      toastSuccess("Solicitação autorizada com sucesso!");
    } else {
      toastError(resp.detail);
    }
  }

  render() {
    const { showModal, closeModal, justificativa, uuid } = this.props;
    return (
      <Modal
        dialogClassName="modal-50w modal-question"
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Atenção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <p className="title">
                A empresa terceirizada respondeu que <strong>não</strong> poderá
                atender a solicitação com todos os itens do cardápio, deseja
                autorizar mesmo assim?
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Field
                component={TextArea}
                label="Justificativa"
                placeholder="Qual a sua justificativa para essa decisão?"
                name="justificativa"
                validate={required}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row mt-5">
            <div className="col-12">
              <Botao
                texto="Não"
                type={BUTTON_TYPE.BUTTON}
                onClick={closeModal}
                style={BUTTON_STYLE.BLUE_OUTLINE}
                className="ml-3"
              />
              <Botao
                texto="Sim"
                type={BUTTON_TYPE.BUTTON}
                onClick={() => this.autorizarQuestionamento(uuid)}
                disabled={justificativa === undefined}
                style={BUTTON_STYLE.BLUE}
                className="ml-3"
              />
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
