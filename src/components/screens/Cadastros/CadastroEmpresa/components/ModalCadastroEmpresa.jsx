import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Botao } from "../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../Shareable/Botao/constants.js";

export class ModalCadastroEmpresa extends Component {
  onSubmit(values) {
    this.props.onSubmit(values);
  }

  render() {
    const { showModal, closeModal, values, titulo } = this.props;
    return (
      <Modal
        dialogClassName="modal-cadastro-empresa modal-50w"
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
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
            onClick={() => this.onSubmit(values)}
            style={BUTTON_STYLE.BLUE}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
