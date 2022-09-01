import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";

export default ({ closeModal, showModal, onSubmit }) => {
  const onClickVoltar = () => {
    closeModal();
  };

  const onClickSalvar = () => {
    onSubmit();
    closeModal();
  };

  return (
    <Modal dialogClassName="modal-50w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Salvar lançamentos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-12 mt-3 mb-3">
          <h5>Deseja salvar as informações do lançamento?</h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Botao
          className="ml-3"
          texto="Não"
          type={BUTTON_TYPE.BUTTON}
          onClick={() => onClickVoltar()}
          style={BUTTON_STYLE.GREEN_OUTLINE}
        />
        <Botao
          className="ml-3 mr-3"
          texto="Sim"
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          onClick={() => onClickSalvar()}
        />
      </Modal.Footer>
    </Modal>
  );
};
