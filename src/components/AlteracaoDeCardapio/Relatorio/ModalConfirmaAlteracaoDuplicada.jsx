import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../Shareable/Botao/constants";

export default props => (
  <Modal show={props.showModal} onHide={props.closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Atenção</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Essa unidade já possui esse tipo de solicitação dentro desse mesmo
      período, deseja validar?
    </Modal.Body>
    <Modal.Footer>
      <Botao
        texto="SIM"
        type={BUTTON_TYPE.BUTTON}
        onClick={() => {
          props.handleSubmit();
          props.closeModal();
        }}
        style={BUTTON_STYLE.BLUE}
        className="ml-3"
      />
      <Botao
        texto="NÃO"
        type={BUTTON_TYPE.BUTTON}
        onClick={props.closeModal}
        style={BUTTON_STYLE.BLUE}
        className="ml-3"
      />
    </Modal.Footer>
  </Modal>
);
