import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "../Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../Botao/constants";

export default props => (
  <Modal show={props.showModal} onHide={props.closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Atenção</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      A solicitação está fora do prazo contratual de cinco dias úteis. Sendo
      assim, a autorização dependerá da disponibilidade dos alimentos adequados
      para o cumprimento do cardápio.
    </Modal.Body>
    <Modal.Footer>
      <Botao
        texto="OK"
        type={BUTTON_TYPE.BUTTON}
        onClick={props.closeModal}
        style={BUTTON_STYLE.BLUE}
        className="ml-3"
      />
    </Modal.Footer>
  </Modal>
);
