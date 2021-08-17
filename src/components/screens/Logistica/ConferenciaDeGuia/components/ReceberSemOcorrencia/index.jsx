import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { CONFERIR_ENTREGA, LOGISTICA } from "configs/constants";
import { recebeGuiaSemOcorrencia } from "services/logistica.service";
import { Spin } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

export default ({ values, disabled }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSim = () => {
    setLoading(true);
    const payload = { ...values };
    delete payload.data_entrega;
    delete payload.numero_guia;
    delete payload.data_entrega_real;

    recebeGuiaSemOcorrencia(payload)
      .then(() => {
        toastSuccess("Guia de remessa recebida com sucesso");
        setShow(false);
        setLoading(false);
        goToConferir();
      })
      .catch(e => {
        toastError(e.response.data.detail);
        setShow(false);
        setLoading(false);
      });
  };

  const goToConferir = () => {
    history.push(`/${LOGISTICA}/${CONFERIR_ENTREGA}`);
  };

  return (
    <>
      <Botao
        texto="Salvar e Continuar"
        type={BUTTON_TYPE.SUBMIT}
        style={BUTTON_STYLE.GREEN}
        className="float-right ml-3"
        onClick={handleShow}
        disabled={disabled}
      />

      <Modal show={show} onHide={handleClose}>
        <Spin tip="Carregando..." spinning={loading}>
          <Modal.Header closeButton>
            <Modal.Title>Registro de conferência</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Deseja realizar o registro de sua conferência?</p>
            <strong>
              <i>
                Data de conferência: {moment(new Date()).format("DD/MM/YYYY")}
              </i>
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Botao
              texto="Cancelar"
              type={BUTTON_TYPE.BUTTON}
              onClick={handleClose}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              className="ml-3"
            />
            <Botao
              texto="Registrar Conferência"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
              onClick={handleSim}
            />
          </Modal.Footer>
        </Spin>
      </Modal>
    </>
  );
};
