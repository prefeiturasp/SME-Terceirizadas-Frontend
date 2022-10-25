import HTTP_STATUS from "http-status-codes";
import React from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import CKEditorField from "../CKEditorField";
import { toastError, toastSuccess } from "../Toast/dialogs";
import "./style.scss";

export const ModalCODAEQuestiona = ({ ...props }) => {
  const {
    showModal,
    closeModal,
    uuid,
    justificativa,
    loadSolicitacao,
    endpoint,
    tipoSolicitacao
  } = props;

  const enviarQuestionamento = async uuid => {
    let resp = "";
    resp = await endpoint(
      uuid,
      justificativa && justificativa !== "<p></p>\n" ? justificativa : "",
      tipoSolicitacao
    );
    if (resp.status === HTTP_STATUS.OK) {
      closeModal();
      loadSolicitacao(uuid, tipoSolicitacao);
      toastSuccess("Questionamento enviado com sucesso!");
    } else {
      toastError(resp.data.detail);
    }
  };
  return (
    <Modal
      dialogClassName="modal-50w modal-question"
      show={showModal}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Questionamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <p className="title">
              É possível atender a solicitação com todos os itens previstos no
              contrato?
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Field
              component={CKEditorField}
              label="Observação"
              placeholder="Alguma observação para a Terceirizada?"
              name="justificativa"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="row mt-5">
          <div className="col-12">
            <Botao
              texto="Cancelar"
              type={BUTTON_TYPE.BUTTON}
              onClick={closeModal}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              className="ml-3"
            />
            <Botao
              texto="Enviar"
              type={BUTTON_TYPE.BUTTON}
              onClick={() => {
                enviarQuestionamento(uuid);
              }}
              style={BUTTON_STYLE.GREEN}
              className="ml-3"
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCODAEQuestiona;
