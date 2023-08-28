import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { getDDMMYYYfromDate } from "configs/helper";
import React from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-final-form";
import { deleteDiaSobremesaDoce } from "services/medicaoInicial/diaSobremesaDoce.service";
import HTTP_STATUS from "http-status-codes";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { getError } from "helpers/utilities";

export const ModalConfirmarExclusao = ({ ...props }) => {
  const { event, showModal, closeModal, getDiasSobremesaDoceAsync } = props;

  const onSubmit = async () => {
    const response = await deleteDiaSobremesaDoce(event.uuid);
    if (response.status === HTTP_STATUS.NO_CONTENT) {
      toastSuccess("Dia de sobremesa excluído com sucesso");
      closeModal();
      getDiasSobremesaDoceAsync();
    } else {
      toastError(getError(response.data));
    }
  };

  return (
    <Modal
      dialogClassName="modal-editar-sobremesa modal-50w"
      show={showModal}
      onHide={closeModal}
    >
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Excluir Sobremesa Doce</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Deseja realmente excluir o cadastro de{" "}
                <strong>Sobremesa doce</strong> para a unidade{" "}
                <strong>{event.title}</strong> no dia{" "}
                <strong>{getDDMMYYYfromDate(event.start)}</strong>?
              </p>
            </Modal.Body>
            <div className="footer">
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
                disabled={submitting}
                className="ml-3"
              />
            </div>
          </form>
        )}
      </Form>
    </Modal>
  );
};
