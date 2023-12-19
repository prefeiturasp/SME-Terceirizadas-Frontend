import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import React from "react";
import { Modal } from "react-bootstrap";
import "./style.scss";

export const ModalCronograma = ({ ...props }) => {
  const { event, showModal, closeModal, setShowModalConfirmarExclusao } = props;

  return (
    <Modal
      dialogClassName="modal-editar-sobremesa modal-50w"
      show={showModal}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Informações de cadastro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>modal cronograma xdd {event.title}</p>
      </Modal.Body>
      <div className="footer">
        <Botao
          texto="Excluir"
          type={BUTTON_TYPE.BUTTON}
          onClick={() => {
            closeModal();
            setShowModalConfirmarExclusao();
          }}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          className="ms-3"
        />
        <Botao
          texto="Manter"
          onClick={closeModal}
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          className="ms-3"
        />
      </div>
    </Modal>
  );
};
