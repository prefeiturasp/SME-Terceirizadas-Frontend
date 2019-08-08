import React from "react";
import { Modal } from "react-bootstrap";
import BaseButton, { ButtonStyle, ButtonType } from "../../Shareable/button";

export default props => (
  <Modal show={props.showModal} onHide={props.closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Atenção</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Atenção, a solicitação está fora do prazo contratual (entre{" "}
      <b>2 e 5 dias úteis</b>). Sendo assim, a autorização dependerá da
      disponibilidade dos alimentos adequados para o cumprimento do cardápio.
    </Modal.Body>
    <Modal.Footer>
      <BaseButton
        label="OK"
        type={ButtonType.BUTTON}
        onClick={props.closeModal}
        style={ButtonStyle.Primary}
        className="ml-3"
      />
    </Modal.Footer>
  </Modal>
);
