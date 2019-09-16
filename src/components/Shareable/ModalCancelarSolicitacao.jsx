import React, { Component } from "react";
import { Field } from "redux-form";
import { LabelAndTextArea, LabelAndCombo } from "./labelAndInput/labelAndInput";
import { required } from "../../helpers/fieldValidators";
import { Modal } from "react-bootstrap";
import BaseButton, { ButtonStyle, ButtonType } from "./button";

export class ModalCancelarSolicitacao extends Component {
  render() {
    const { showModal, closeModal } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja cancelar a solicitação?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row">
            <div className="form-group col-12">

            </div>
            <div className="form-group col-12">
              <Field
                component={LabelAndTextArea}
                placeholder="Obrigatório"
                label="Justificativa"
                name="obs"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BaseButton
            label="Recusar"
            type={ButtonType.BUTTON}
            onClick={closeModal}
            style={ButtonStyle.Primary}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
