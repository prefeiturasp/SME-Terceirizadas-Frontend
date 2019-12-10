import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import { TextArea } from "../TextArea/TextArea";
import { toastError, toastSuccess } from "../Toast/dialogs";
import "./style.scss";
import { required } from "../../../helpers/fieldValidators";

export class ModalTerceirizadaRespondeQuestionamento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      observacao_questionamento_terceirizada: ""
    };
  }

  async responderQuestionamento(uuid) {
    const { observacao_questionamento_terceirizada } = this.state;
    const { resposta_sim_nao } = this.props;
    const payload = {
      resposta_sim_nao: resposta_sim_nao === "Sim",
      justificativa: observacao_questionamento_terceirizada
    };
    let resp = "";
    resp = await this.props.endpointTerceirizadaRespondeQuestionamento(
      uuid,
      payload
    );
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      this.props.loadSolicitacao(this.props.uuid);
      toastSuccess("Questionamento respondido com sucesso!");
    } else {
      toastError(resp.detail);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.observacao_questionamento_terceirizada !==
      this.props.observacao_questionamento_terceirizada
    ) {
      this.setState({
        observacao_questionamento_terceirizada: this.props
          .observacao_questionamento_terceirizada
      });
    }
  }
  render() {
    const {
      showModal,
      closeModal,
      uuid,
      observacao_questionamento_terceirizada,
      resposta_sim_nao
    } = this.props;
    return (
      <Modal
        dialogClassName="modal-50w modal-question"
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Resposta: {resposta_sim_nao}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <p className="title">Referente ao questionamento da CODAE</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Field
                component={TextArea}
                label="Observação"
                placeholder="Qual a sua justificativa para a resposta acima?"
                name="observacao_questionamento_terceirizada"
                validate={required}
                required
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
                  this.responderQuestionamento(uuid);
                }}
                disabled={observacao_questionamento_terceirizada === undefined}
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
