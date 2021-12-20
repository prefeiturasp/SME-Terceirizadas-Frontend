import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import {
  maxLengthProduto,
  textAreaRequiredAndAtLeastOneCharacter
} from "helpers/fieldValidators";
import { TextAreaWYSIWYG } from "../TextArea/TextAreaWYSIWYG";
import { toastError, toastSuccess, toastWarn } from "../Toast/dialogs";
import { MENSAGEM_VAZIA } from "../TextArea/constants";
import { composeValidators } from "helpers/utilities";

const maxLength1500 = maxLengthProduto(1500);

export class ModalCODAEAutoriza extends Component {
  constructor(props) {
    super(props);
    this.state = { desabilitarSubmit: true };

    this.setDesabilitarSubmit = this.setDesabilitarSubmit.bind(this);
  }

  setDesabilitarSubmit(value) {
    this.setState({
      desabilitarSubmit:
        [undefined, null, "", "<p></p>\n"].includes(value) ||
        maxLength1500(value)
    });
  }

  async autorizarSolicitacao(uuid, values) {
    if (values.justificativa_autorizacao === MENSAGEM_VAZIA) {
      toastWarn("Justificativa é obrigatória.");
    } else {
      const resp = await this.props.endpoint(
        uuid,
        values.justificativa_autorizacao,
        this.props.tipoSolicitacao
      );
      if (resp.status === HTTP_STATUS.OK) {
        this.props.closeModal();
        toastSuccess("Solicitação autorizada com sucesso!");
        if (this.props.loadSolicitacao) {
          this.props.loadSolicitacao(
            this.props.uuid,
            this.props.tipoSolicitacao
          );
        }
      } else {
        toastError(resp.data.detail);
      }
    }
  }

  render() {
    const { showModal, closeModal, uuid } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Form
          onSubmit={() => {}}
          initialValues={{}}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Deseja autorizar a solicitação?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="form-row mb-3">
                  <div className="form-group col-12">
                    <Field
                      component={TextAreaWYSIWYG}
                      label="Informações da CODAE"
                      name="justificativa_autorizacao"
                      required
                      validate={composeValidators(
                        textAreaRequiredAndAtLeastOneCharacter,
                        maxLength1500
                      )}
                    />
                    <OnChange name="justificativa_autorizacao">
                      {value => {
                        this.setDesabilitarSubmit(value);
                      }}
                    </OnChange>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="row mt-4">
                  <div className="col-12">
                    <Botao
                      texto="Não"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={closeModal}
                      style={BUTTON_STYLE.BLUE_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Sim"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={() => {
                        this.autorizarSolicitacao(uuid, values);
                      }}
                      style={BUTTON_STYLE.BLUE}
                      className="ml-3"
                      disabled={this.state.desabilitarSubmit}
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
