import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import { TextAreaWYSIWYG } from "../TextArea/TextAreaWYSIWYG";
import { toastError, toastSuccess } from "../Toast/dialogs";
import "./style.scss";
import { textAreaRequiredAndAtLeastOneCharacter } from "../../../helpers/fieldValidators";

export class ModalPadrao extends Component {
  enviarJustificativa = async formValues => {
    const { justificativa } = formValues;
    const { uuid, toastSuccessMessage } = this.props;
    const resp = await this.props.endpoint(uuid, justificativa);
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      this.props.loadSolicitacao(this.props.uuid);
      toastSuccess(toastSuccessMessage);
    } else {
      toastError(resp.data.detail);
    }
  };

  render() {
    const {
      showModal,
      closeModal,
      modalTitle,
      textAreaPlaceholder
    } = this.props;
    return (
      <Modal
        dialogClassName="modal-50w modal-question"
        show={showModal}
        onHide={closeModal}
      >
        <Form
          onSubmit={this.enviarJustificativa}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-12">
                    <Field
                      component={TextAreaWYSIWYG}
                      label="Justificativa"
                      placeholder={textAreaPlaceholder}
                      name="justificativa"
                      required
                      validate={textAreaRequiredAndAtLeastOneCharacter}
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
                      style={BUTTON_STYLE.BLUE_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Enviar"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.BLUE}
                      className="ml-3"
                    />
                  </div>
                </div>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    );
  }
}
