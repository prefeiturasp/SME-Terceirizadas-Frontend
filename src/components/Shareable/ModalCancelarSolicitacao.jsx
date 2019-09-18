import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import BaseButton, { ButtonStyle, ButtonType } from "./button";
import { LabelAndTextArea } from "./labelAndInput/labelAndInput";

export class ModalCancelarSolicitacao extends Component {
  render() {
    const { showModal, closeModal } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cancelamento de Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row">
            <div className="col-12">
              <p className="label--red">
                Este pedido já foi autorizado pela CODAE. Deseja seguir em
                frente com o cancelamento?
              </p>
            </div>
            <div className="col-12 label--gray margin-fix">
              <b>Resumo</b>
              <p>Resumo Solicitação Unificada nº 12083 - 7A IP I</p>
              <p>Solicitante: Dre Ipiranga</p>
              <p>Data: 27/04/2019</p>
              <p>Quantidade de Alimentações: 203</p>
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
            label="Não"
            type={ButtonType.BUTTON}
            onClick={closeModal}
            style={ButtonStyle.OutlinePrimary}
            className="ml-3"
          />
          <BaseButton
            label="Sim"
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
