import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import { TextArea } from "../TextArea/TextArea";
import { toastError, toastSuccess } from "../Toast/dialogs";
import "./style.scss";

export class ModalCODAEQuestiona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      observacao_questionamento_codae: ""
    };
  }

  async enviarQuestionamento(uuid) {
    const { observacao_questionamento_codae } = this.state;
    let resp = "";
    resp = await this.props.endpointCODAEQuestiona(
      uuid,
      observacao_questionamento_codae
    );
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      this.props.loadSolicitacao(this.props.uuid);
      toastSuccess("Questionamento enviado com sucesso!");
    } else {
      toastError(resp.detail);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.observacao_questionamento_codae !==
      this.props.observacao_questionamento_codae
    ) {
      this.setState({
        observacao_questionamento_codae: this.props
          .observacao_questionamento_codae
      });
    }
  }
  render() {
    const { showModal, closeModal, uuid } = this.props;
    return (
      <Modal
        dialogClassName="modal-50w modal-question"
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Questionamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <p className="title">
                É possível atender a solicitação com todos os itens previstos no
                contrato?
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Field
                component={TextArea}
                label="Observação"
                placeholder="Alguma observação para a Terceirizada?"
                name="observacao_questionamento_codae"
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
                  this.enviarQuestionamento(uuid);
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
