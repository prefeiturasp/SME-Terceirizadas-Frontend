import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";

export default ({ show, setShow, form }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Botao
        texto="Enviar"
        type={BUTTON_TYPE.BUTTON}
        onClick={handleShow}
        style={BUTTON_STYLE.GREEN}
        className="float-right ml-3"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Confirmar Envio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja confirmar o envio da solicitação de alteração?
        </Modal.Body>
        <Modal.Footer>
          <Botao
            texto="Sim"
            type={BUTTON_TYPE.SUBMIT}
            style={BUTTON_STYLE.BLUE}
            onClick={form.submit}
            className="ml-3"
          />
          <Botao
            texto="Não"
            type={BUTTON_TYPE.BUTTON}
            onClick={handleClose}
            style={BUTTON_STYLE.BLUE_OUTLINE}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
