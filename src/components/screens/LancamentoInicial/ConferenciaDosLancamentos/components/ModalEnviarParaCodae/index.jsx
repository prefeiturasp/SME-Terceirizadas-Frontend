import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";

export const ModalEnviarParaCodae = ({ ...props }) => {
  const { showModal, setShowModal, aprovarSolicitacaoMedicao } = props;

  return (
    <Modal
      dialogClassName="modal-50w"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Enviar para CODAE</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <p>Deseja aprovar e enviar a Medição para análise da CODAE?</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="col-12">
          <Botao
            className="float-right"
            texto="Sim"
            type={BUTTON_TYPE.BUTTON}
            onClick={() => {
              aprovarSolicitacaoMedicao();
              setShowModal(false);
            }}
            style={BUTTON_STYLE.GREEN}
          />
          <Botao
            className="float-right mr-2"
            texto="Não"
            type={BUTTON_TYPE.BUTTON}
            onClick={() => setShowModal(false)}
            style={BUTTON_STYLE.GREEN_OUTLINE}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};
