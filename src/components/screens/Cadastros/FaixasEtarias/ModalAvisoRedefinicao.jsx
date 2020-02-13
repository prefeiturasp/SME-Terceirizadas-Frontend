import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";

const ModalAvisoRedefinicao = ({ showModal, closeModal, onCancelar }) => (
  <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Redefinição de Novas Faixas Etárias</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="form-row mb-3">
        <p>
          As faixas etárias já cadastradas serão alteradas após a finalização
        </p>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <div className="row mt-4">
        <div className="col-12">
          <Botao
            texto="Cancelar"
            type={BUTTON_TYPE.BUTTON}
            onClick={onCancelar}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="ml-3"
          />
          <Botao
            texto="Continuar"
            type={BUTTON_TYPE.BUTTON}
            onClick={closeModal}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="ml-3"
          />
        </div>
      </div>
    </Modal.Footer>
  </Modal>
);

export default ModalAvisoRedefinicao;
