import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import BaseButton, { ButtonStyle, ButtonType } from "../Shareable/button";
import { Link } from "react-router-dom";

export class ModalCancelarConfigEmail extends Component {
  render() {
    const { showModal, closeModal } = this.props;
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja cancelar o procedimento?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            As Informações não serão salvas
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Link to="/">
          <BaseButton
            label="Confirmar"
            type={ButtonType.BUTTON}
            onClick={closeModal}
            style={ButtonStyle.Primary}
            className="ml-3"
          />
        </Link>
        </Modal.Footer>
      </Modal>
    );
  }
}
