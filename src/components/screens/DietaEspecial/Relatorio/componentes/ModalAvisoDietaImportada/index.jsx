import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "../../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../../Shareable/Botao/constants";
import "./style.scss";

const ModalAvisoDietaImportada = ({ showModal, closeModal }) => {
  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Dieta Especial Importada</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <p className="informacao-dieta">
              Essa Dieta Especial foi autorizada anteriormente a implantação do
              SIGPAE.
            </p>
            <p className="observacao">
              Para ter acesso ao Protocolo da Dieta Especial, entre em contato
              com o Núcleo de Dieta Especial através do e-mail:
              smecodaedietaespecial@sme.prefeitura.sp.gov.br.
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="row mt-4">
          <div className="col-12">
            <Botao
              texto="Confirmar"
              type={BUTTON_TYPE.BUTTON}
              onClick={closeModal}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAvisoDietaImportada;
