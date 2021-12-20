import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { CONFERENCIA_GUIA, LOGISTICA } from "configs/constants";
import { useHistory } from "react-router-dom";

export default ({ uuid }) => {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSim = () => {
    history.push(`/${LOGISTICA}/${CONFERENCIA_GUIA}?uuid=${uuid}&editar=true`);
  };

  return (
    <>
      <span onClick={handleShow} className="link-acoes green">
        <i className="fas fa-eye" />
        Editar Conferência
      </span>
      |
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <p>
            Ao editar a conferência desta Guia de Remessa, o registro de
            reposição será apagado. Deseja continuar?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Botao
            texto="Não"
            type={BUTTON_TYPE.BUTTON}
            onClick={handleClose}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="ml-3"
          />
          <Botao
            texto="Sim"
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            className="ml-3"
            onClick={handleSim}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
