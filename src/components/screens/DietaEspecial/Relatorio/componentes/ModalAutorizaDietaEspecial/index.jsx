import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "../../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../../Shareable/Botao/constants";

export default props => (
  <Modal show={props.showModal} onHide={props.closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Atenção</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      O aluno {props.dietaEspecial.aluno.nome} já possui uma dieta especial
      ativa. Ao prosseguir com a autorização, esta será inativada. Deseja
      continuar?
    </Modal.Body>
    <Modal.Footer>
      <Botao
        texto="Cancelar"
        type={BUTTON_TYPE.BUTTON}
        onClick={props.closeModal}
        style={BUTTON_STYLE.BLUE_OUTLINE}
        className="ml-3"
      />
      <Botao
        texto="Inativar e continuar"
        type={BUTTON_TYPE.BUTTON}
        onClick={props.handleSubmit}
        style={BUTTON_STYLE.BLUE}
        className="ml-3"
      />
    </Modal.Footer>
  </Modal>
);
