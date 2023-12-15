import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import HTTP_STATUS from "http-status-codes";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { toastSuccess, toastError } from "components/Shareable/Toast/dialogs";

export class ModalAprovarSolicitacaoAlteracao extends Component {
  async autorizarSolicitacao(uuid) {
    const resp = await this.props.endpoint(
      uuid,
      {
        justificativa:
          this.props.justificativa && this.props.justificativa.length > 0
            ? this.props.justificativa
            : "Sem observações por parte da CODAE",
      },
      this.props.tipoSolicitacao
    );
    if (resp.status === HTTP_STATUS.OK) {
      this.props.loadSolicitacao();
      toastSuccess("Solicitação autorizada com sucesso!");
    } else {
      toastError(resp.detail);
    }
    this.props.closeModal();
  }

  render() {
    const { showModal, closeModal, justificativa, uuid } = this.props;
    return (
      <Modal
        dialogClassName="modal-50w"
        show={showModal}
        onHide={() => closeModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deseja autorizar a solicitação?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <Field
                component={TextArea}
                label="Informações da CODAE"
                name="justificativa"
                placeholder="Qual a sua observação para essa decisão?"
                maxLength={1500}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col-12">
              <Botao
                texto="Não"
                type={BUTTON_TYPE.BUTTON}
                onClick={() => closeModal()}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="ms-3"
              />
              <Botao
                texto="Sim"
                type={BUTTON_TYPE.BUTTON}
                onClick={() => this.autorizarSolicitacao(uuid)}
                disabled={justificativa && justificativa.length >= 1500}
                style={BUTTON_STYLE.GREEN}
                className="ms-3"
              />
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
