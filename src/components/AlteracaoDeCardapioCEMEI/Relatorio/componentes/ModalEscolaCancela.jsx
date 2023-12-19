import React from "react";
import HTTP_STATUS from "http-status-codes";
import { Field, Form } from "react-final-form";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import { TextArea } from "components/Shareable/TextArea/TextArea";
import { textAreaRequired } from "helpers/fieldValidators";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

export const ModalEscolaCancela = ({ ...props }) => {
  const { showModal, closeModal, solicitacao, endpoint, loadSolicitacao } =
    props;

  const onSubmit = async (values) => {
    const response = await endpoint(solicitacao.uuid, values);
    if (response.status === HTTP_STATUS.OK) {
      toastSuccess("Alteração do Tipo de Alimentação cancelada com sucesso!");
      loadSolicitacao();
    } else {
      toastError(response.data.detail);
    }
    closeModal();
  };

  return (
    <Modal dialogClassName=" modal-90w" show={showModal} onHide={closeModal}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title className="modal-alteracao-cardapio-cemei">
                Deseja cancelar a solicitação?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-row">
                <div className="row">
                  <div className="col-12">
                    <p className="label--red">
                      Deseja seguir em frente com o cancelamento?
                    </p>
                  </div>
                </div>
                <div className="form-group col-12">
                  <Field
                    component={TextArea}
                    placeholder="Obrigatório"
                    label="Justificativa"
                    name="justificativa"
                    validate={textAreaRequired}
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
                className="ms-3"
              />
              <Botao
                texto="Sim"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                className="ms-3"
              />
            </Modal.Footer>
          </form>
        )}
      </Form>
    </Modal>
  );
};
