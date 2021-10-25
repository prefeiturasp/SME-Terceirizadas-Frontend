import HTTP_STATUS from "http-status-codes";
import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "../../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../../Shareable/Botao/constants";
import {
  toastSuccess,
  toastError
} from "../../../../../Shareable/Toast/dialogs";
import { terceirizadaMarcaConferencia } from "services/dietaEspecial.service";
import "./style.scss";

const ModalMarcarConferencia = ({
  showModal,
  closeModal,
  onMarcarConferencia,
  uuid
}) => {
  const marcaConferencia = async () => {
    const resp = await terceirizadaMarcaConferencia(uuid);
    if (resp.status === HTTP_STATUS.OK) {
      toastSuccess("Solicitação conferida com sucesso!");
      onMarcarConferencia();
      closeModal();
    } else {
      toastError(resp.data.detail);
    }
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Marcar Conferência da Solicitação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <p className="pergunta">
              Deseja marcar essa solicitação como conferida? A ação não poderá
              ser desfeita.
            </p>
            <p className="observacao">
              As solicitações marcadas como conferidas ficarão sinalizadas em
              verde no painel de solicitações.
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="row mt-4">
          <div className="col-12">
            <Botao
              texto="Cancelar"
              type={BUTTON_TYPE.BUTTON}
              onClick={closeModal}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              className="ml-3"
            />
            <Botao
              texto="Confirmar"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
              onClick={() => marcaConferencia()}
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMarcarConferencia;
