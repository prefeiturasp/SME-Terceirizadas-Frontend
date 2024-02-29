import React from "react";
import { Modal } from "react-bootstrap";

import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import Botao from "../Botao";
import { CENTRAL_DOWNLOADS } from "configs/constants";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const ModalSolicitacaoDownload = ({ show, setShow }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-downloads">
      <Modal.Header closeButton>
        <Modal.Title>Geração solicitada com sucesso.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Como este arquivo poderá ser muito grande, acompanhe o seu
          processamento na Central de Downloads.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Botao
          texto="Fechar"
          type={BUTTON_TYPE.BUTTON}
          onClick={handleClose}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          className="ms-3"
        />
        <Botao
          texto="Ir para a Central de Downloads"
          type={BUTTON_TYPE.BUTTON}
          onClick={() => {
            navigate(`/${CENTRAL_DOWNLOADS}`);
          }}
          style={BUTTON_STYLE.GREEN}
          className="ms-3"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSolicitacaoDownload;
