import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Botao from "./Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "./Botao/constants";

export class ModalCancelarConfigEmail extends Component {
  render() {
    const { showModal, closeModal } = this.props;
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja cancelar o procedimento?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>As Informações não serão salvas</div>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <Botao
              texto="Confirmar"
              type={BUTTON_TYPE.BUTTON}
              onClick={closeModal}
              style={BUTTON_STYLE.BLUE}
              className="ml-3"
            />
          </Link>
        </Modal.Footer>
      </Modal>
    );
  }
}
