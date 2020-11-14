import React from "react";
import { Modal } from "react-bootstrap";

import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import "./style.scss";

export default ({ showModal, closeModal, mensagem, modalTitle }) => {
  return (
    <Modal
      dialogClassName="modal-50w modal-question"
      show={showModal}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <p>{mensagem}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="row mt-5">
          <div className="col-12">
            <Botao
              texto="Não"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => closeModal("Não")}
              style={BUTTON_STYLE.BLUE_OUTLINE}
              className="ml-3"
            />
            <Botao
              texto="Sim"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => closeModal("Sim")}
              style={BUTTON_STYLE.BLUE}
              className="ml-3"
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
