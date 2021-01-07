import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import { Button } from "react-bootstrap";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { distribuidorConfirma } from "services/logistica.service";
import { Spin } from "antd";

export default ({ solicitacao, updatePage }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSim = () => {
    setLoading(true);
    distribuidorConfirma(solicitacao.uuid)
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
      <Button
        className="acoes confirmar"
        onClick={handleShow}
        variant="link"
        disabled={solicitacao.status !== "Enviada"}
      >
        <i className="fas fa-check-circle confirmar" /> Confirmar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Spin tip="Carregando..." spinning={loading}>
          <Modal.Header closeButton>
            <Modal.Title> Confirmar </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Você está confirmando que realizará a entrega conforme <br />{" "}
            Requisição <b>nº {solicitacao.numero_solicitacao}</b>.
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
