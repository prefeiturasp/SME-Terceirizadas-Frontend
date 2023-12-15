import React from "react";
import HTTP_STATUS from "http-status-codes";
import { Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { required } from "helpers/fieldValidators";
import { getError, mensagemCancelamento } from "helpers/utilities";
import { escolaCancelaSuspensao } from "services/suspensaoDeAlimentacao.service";

export const ModalCancelaSuspensao = ({ ...props }) => {
  const {
    showModal,
    closeModal,
    uuid,
    solicitacao,
    tipoSolicitacao,
    loadSolicitacao,
  } = props;

  const onSubmit = async (values) => {
    const resp = await escolaCancelaSuspensao(uuid, values);
    if (resp.status === HTTP_STATUS.OK) {
      closeModal();
      toastSuccess(
        "A solicitação de Suspensão de Alimentação foi cancelada com sucesso!"
      );
      if (loadSolicitacao) loadSolicitacao(uuid, tipoSolicitacao);
    } else {
      closeModal();
      toastError(getError(resp.data));
    }
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                Cancelamento de Suspensão de Alimentação
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <p className="label--red">
                    {solicitacao && mensagemCancelamento(solicitacao.status)}
                    Deseja seguir em frente com o cancelamento?
                  </p>
                </div>
              </div>
              <div className="row pl-3 pr-3">
                <label>* Justificativa</label>
                <Field
                  className="col-12 pb-5"
                  component="textarea"
                  name="justificativa"
                  validate={required}
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Botao
                texto="Não"
                type={BUTTON_TYPE.BUTTON}
                onClick={closeModal}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="ms-3"
              />
              <Botao
                texto="Sim"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                disabled={submitting}
                className="ms-3"
              />
            </Modal.Footer>
          </form>
        )}
      </Form>
    </Modal>
  );
};
