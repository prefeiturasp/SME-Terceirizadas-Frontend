import React, { Component } from "react";
import { Field } from "redux-form";
import { required } from "../../helpers/fieldValidators";
import { Modal } from "react-bootstrap";
import { BUTTON_TYPE, BUTTON_STYLE } from "./Botao/constants";
import Botao from "./Botao";
import Select from "./Select";
import { TextArea } from "./TextArea/TextArea";

export class ModalRecusarSolicitacao extends Component {
  render() {
    const { showModal, closeModal } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja recusar a solicitação?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row">
            <div className="form-group col-12">
              <Field
                component={Select}
                name="razao"
                label="Motivo"
                onChange={value => this.props.change("razao", value)}
                options={[
                  {
                    value: "Fora do prazo",
                    label: "Fora do prazo/em desacordo com o contrato"
                  }
                ]}
                validate={required}
              />
            </div>
            <div className="form-group col-12">
              <Field
                component={TextArea}
                placeholder="Obrigatório"
                label="Justificativa"
                name="obs"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Botao
            label="Recusar"
            type={BUTTON_TYPE.BUTTON}
            onClick={closeModal}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
