import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { distribuidorAltera } from "services/logistica.service";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

export default ({
  show,
  setShow,
  form,
  handleCloseAll,
  updatePage,
  solicitacao,
  values
}) => {
  const handleClose = () => setShow(false);

  const enviarSolicitacao = async () => {
    const payload = { ...values };
    payload.requisicao = solicitacao.uuid;
    const res = await distribuidorAltera(payload);
    if (res.status === 201) {
      setShow(false);
      handleCloseAll();
      toastSuccess("Solicitação enviada para análise da CODAE.");
      updatePage();
    } else {
      toastError("Houve um erro ao solicitar a alteração de requisição.");
    }
  };

  return (
    <>
      <Botao
        texto="Enviar"
        type={BUTTON_TYPE.BUTTON}
        style={BUTTON_STYLE.GREEN}
        onClick={form.submit}
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
            onClick={enviarSolicitacao}
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
