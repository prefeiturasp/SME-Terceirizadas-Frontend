import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";

export class ModalCancelarConfigEmail extends Component {
  render() {
    const { showModal, closeModal, closeOnly } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeOnly}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja cancelar o procedimento?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            As Informações não serão salvas
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BaseButton
            label="Confirmar"
            type={ButtonType.BUTTON}
            onClick={closeModal}
            style={ButtonStyle.Primary}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
