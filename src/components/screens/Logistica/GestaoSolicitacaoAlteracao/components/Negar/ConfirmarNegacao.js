import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { dilogNegaAlteracao } from "services/logistica.service";
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

  const negarSolicitacao = async () => {
    const payload = { ...values };
    const res = await dilogNegaAlteracao(solicitacao.uuid, payload);
    if (res.status === 200) {
      setShow(false);
      handleCloseAll();
      toastSuccess("Solicitação de alteração negada");
      updatePage();
    } else {
      toastError("Houve um erro ao negar a solicitação de alteração.");
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
          <Modal.Title> Confirmar Aceite</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja negar a solicitação de alteração?</Modal.Body>
        <Modal.Footer>
          <Botao
            texto="Sim"
            type={BUTTON_TYPE.SUBMIT}
            style={BUTTON_STYLE.BLUE}
            onClick={negarSolicitacao}
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
