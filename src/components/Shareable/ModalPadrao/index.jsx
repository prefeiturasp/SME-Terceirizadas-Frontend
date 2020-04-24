import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import { TextAreaWYSIWYG } from "../TextArea/TextAreaWYSIWYG";
import { toastError, toastSuccess } from "../Toast/dialogs";
import "./style.scss";
import { required } from "../../../helpers/fieldValidators";

export class ModalPadrao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      justificativa: ""
    };
  }

  async enviarJustificativa(uuid) {
    const { justificativa } = this.state;
    const { toastSuccessMessage } = this.props;
    let resp = "";
    resp = await this.props.endpoint(uuid, justificativa);
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      this.props.loadSolicitacao(this.props.uuid);
      toastSuccess(toastSuccessMessage);
    } else {
      toastError(resp.data.detail);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.justificativa !== this.props.justificativa) {
      this.setState({
        justificativa: this.props.justificativa
      });
    }
  }
  render() {
    const {
      showModal,
      closeModal,
      uuid,
      modalTitle,
      textAreaPlaceholder
    } = this.props;
    return (
      <Modal
        dialogClassName="modal-50w modal-question"
        show={showModal}
        onHide={closeModal}
      >
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
                validate={required}
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
                type={BUTTON_TYPE.BUTTON}
                onClick={() => {
                  this.enviarJustificativa(uuid);
                }}
                style={BUTTON_STYLE.BLUE}
                className="ml-3"
              />
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
