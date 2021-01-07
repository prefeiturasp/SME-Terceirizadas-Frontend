import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import { distribuidorConfirmaTodos } from "services/logistica.service";
import { Spin } from "antd";

export default ({ updatePage, numEnviadas }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSim = () => {
    setLoading(true);
    distribuidorConfirmaTodos()
      .then(() => {
        updatePage();
        setShow(false);
        setLoading(false);
      })
      .catch(() => {
        updatePage();
        setShow(false);
        setLoading(false);
      });
  };

  return (
    <>
      <Botao
        texto="Confirmar todos"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN_OUTLINE}
        icon={BUTTON_ICON.CHECK_CIRCLE}
        className="float-right"
        disabled={numEnviadas === 0}
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Spin tip="Carregando..." spinning={loading}>
          <Modal.Header closeButton>
            <Modal.Title> Confirmar todos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Você está confirmando que realizará a entrega de todas as
            Requisições apresentadas na grade.
          </Modal.Body>
          <Modal.Footer>
            <Botao
              texto="Sim"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.BLUE}
              className="ml-3"
              onClick={handleSim}
            />
            <Botao
              texto="Não"
              type={BUTTON_TYPE.BUTTON}
              onClick={handleClose}
              style={BUTTON_STYLE.BLUE_OUTLINE}
              className="ml-3"
            />
          </Modal.Footer>
        </Spin>
      </Modal>
    </>
  );
};
