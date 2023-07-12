import React from "react";
import HTTP_STATUS from "http-status-codes";
import { Field, Form } from "react-final-form";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

export const ModalAprovarSolicitacaoAlteracao = ({ ...props }) => {
  const {
    showModal,
    closeModal,
    solicitacao,
    endpoint,
    loadSolicitacao,
    tipoSolicitacao
  } = props;

  const onSubmit = async values => {
    values.justificativa =
      values.justificativa && values.justificativa.length > 0
        ? values.justificativa
        : "Sem observações por parte da CODAE";
    const response = await endpoint(solicitacao.uuid, values, tipoSolicitacao);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Solicitação autorizada com sucesso!");
      loadSolicitacao();
    } else {
      toastError(response.data.detail);
    }
    closeModal();
  };

  return (
    <Modal dialogClassName=" modal-50w" show={showModal} onHide={closeModal}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title className="modal-alteracao-cardapio-cemei">
                Deseja autorizar a solicitação?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-row">
                <div className="form-group col-12">
                  <Field
                    component={TextArea}
                    placeholder="Qual a sua observação para essa decisão?"
                    label="Informações da CODAE"
                    name="justificativa"
                    maxLength={1500}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Botao
                texto="Não"
                type={BUTTON_TYPE.BUTTON}
                onClick={closeModal}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="ml-3"
              />
              <Botao
                texto="Sim"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                className="ml-3"
              />
            </Modal.Footer>
          </form>
        )}
      </Form>
    </Modal>
  );
};
