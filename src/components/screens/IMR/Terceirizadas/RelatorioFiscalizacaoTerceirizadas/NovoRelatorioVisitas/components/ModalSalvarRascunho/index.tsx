import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";

export const ModalSalvarRascunho = ({ ...props }) => {
  const {
    show,
    handleClose,
    salvarRascunho,
    values,
    escolaSelecionada,
    navigate,
  } = props;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-cancelar-analise-layout"
    >
      <Modal.Header closeButton>
        <Modal.Title>Salvar Rascunho</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Deseja salvar o rascunho do relatório de fiscalização da visita a
        Unidade Educacional: <b>{escolaSelecionada?.label}</b>?
      </Modal.Body>
      <Modal.Footer>
        <Botao
          texto="Não"
          type={BUTTON_TYPE.BUTTON}
          onClick={() => {
            handleClose();
          }}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          className="ms-3"
        />
        <Botao
          texto="Sim"
          type={BUTTON_TYPE.BUTTON}
          onClick={async () => {
            await salvarRascunho(values);
            handleClose();
            navigate(-1);
          }}
          style={BUTTON_STYLE.GREEN}
          className="ms-3"
        />
      </Modal.Footer>
    </Modal>
  );
};
