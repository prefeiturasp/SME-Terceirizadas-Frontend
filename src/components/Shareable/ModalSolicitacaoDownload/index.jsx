import React from "react";
import { Modal } from "react-bootstrap";
import "antd/dist/antd.css";
import "./styles.scss";

const ModalSolicitacaoDownload = ({ show, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-entregas">
      <Modal.Header closeButton>
        <Modal.Title>Geração solicitada com sucesso.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        A geração foi solicitada. Em breve você receberá um aviso na central de
        downloads com o resultado.
      </Modal.Body>
    </Modal>
  );
};

export default ModalSolicitacaoDownload;
