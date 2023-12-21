import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import React from "react";
import { Modal } from "react-bootstrap";
import "./style.scss";
import { useHistory } from "react-router-dom";
import { ALTERACAO_CRONOGRAMA } from "../../../../../configs/constants";
import { usuarioEhCronograma } from "../../../../../helpers/utilities";

export const ModalCronograma = ({ ...props }) => {
  const { event, showModal, closeModal } = props;
  const history = useHistory();

  return (
    <Modal
      dialogClassName="modal-info-cronograma modal-50w"
      show={showModal}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Informações do Cronograma</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <span className="fw-bold">Nº do Cronograma: </span>
            <span className="fw-bold green">{event.numero_cronograma}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <span className="fw-bold">Nome do Produto: </span>
            <span>{event.nome_produto}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <span className="fw-bold">Nome do Fornecedor: </span>
            <span>{event.nome_fornecedor}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <span className="fw-bold">Data da Entrega: </span>
            <span>{event.data_programada}</span>
          </div>
          <div className="col-6">
            <span className="fw-bold">Empenho: </span>
            <span>{event.numero_empenho}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <span className="fw-bold">Etapa: </span>
            <span>{event.etapa}</span>
          </div>
          <div className="col-4">
            <span className="fw-bold">Parte: </span>
            <span>{event.parte}</span>
          </div>
          <div className="col-4">
            <span className="fw-bold">Quantidade: </span>
            <span>{event.quantidade}</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {usuarioEhCronograma() && (
          <Botao
            texto="Alterar"
            type={BUTTON_TYPE.BUTTON}
            onClick={() => {
              history.push(
                `${ALTERACAO_CRONOGRAMA}?uuid=${event.uuid_cronograma}`
              );
            }}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="ms-3"
          />
        )}
        <Botao
          texto="Fechar"
          onClick={closeModal}
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN}
          className="ms-3"
        />
      </Modal.Footer>
    </Modal>
  );
};
