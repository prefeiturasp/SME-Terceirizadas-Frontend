import React from "react";
import { Field, Form } from "react-final-form";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import InputText from "components/Shareable/Input/InputText";
import HTTP_STATUS from "http-status-codes";
import { getError } from "helpers/utilities";
import { toastSuccess, toastError } from "components/Shareable/Toast/dialogs";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "components/Shareable/Botao/constants";
import { cadastraProtocoloDietaEspecial } from "services/dietaEspecial.service";
import { required } from "helpers/fieldValidators";

const ModalAdicionaProtocolo = ({
  showModal,
  closeModal,
  atualizaProtocolos
}) => {
  const onSubmit = async values => {
    try {
      const response = await cadastraProtocoloDietaEspecial(values);
      if (response.status === HTTP_STATUS.CREATED) {
        atualizaProtocolos();
        closeModal();
        toastSuccess("Protocolo de dieta especial criado com sucesso");
      } else {
        closeModal();
        toastError("Houve um erro ao cadastrar protocolo de dieta especial");
      }
    } catch (e) {
      if (e.response.status === HTTP_STATUS.BAD_REQUEST) {
        toastError(getError(e.response));
      } else {
        closeModal();
        toastError("Houve um erro ao cadastrar protocolo de dieta especial");
      }
    }
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro Protocolo de Dieta Especial</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-row">
                <div className="col-12">
                  <Field
                    component={InputText}
                    name="nome"
                    label="* Nome do Protocolo de Dieta Especial"
                    validate={required}
                  />
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <div className="row mt-4">
                <div className="col-12">
                  <Botao
                    key={0}
                    texto="Cancelar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.BLUE_OUTLINE}
                    onClick={closeModal}
                    disabled={submitting}
                  />
                  <Botao
                    key={1}
                    type={BUTTON_TYPE.SUBMIT}
                    texto="Salvar"
                    style={BUTTON_STYLE.BLUE}
                    className="ml-3"
                    disabled={submitting}
                  />
                </div>
              </div>
            </Modal.Footer>
          </form>
        )}
      />
    </Modal>
  );
};

export default ModalAdicionaProtocolo;
