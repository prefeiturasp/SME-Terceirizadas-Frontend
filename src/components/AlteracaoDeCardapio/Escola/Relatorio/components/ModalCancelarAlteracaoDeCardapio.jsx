import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import { required } from "../../../../../helpers/fieldValidators";
import { EscolaCancelaAlteracaoCardapio } from "../../../../../services/alteracaoDecardapio.service";
import {
  LabelAndCombo,
  LabelAndTextArea
} from "../../../../Shareable/labelAndInput/labelAndInput";
import { toastError, toastSuccess } from "../../../../Shareable/Toast/dialogs";
import Botao from "../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../Shareable/Botao/constants";
import { mensagemCancelamento } from "../../../../../helpers/utilities";

export class ModalCancelarAlteracaoDeCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = { justificativa: "", motivoCancelamento: "" };
  }

  async negarAlteracaoCardapio(uuid) {
    const { justificativa, motivoCancelamento } = this.state;

    const function_CancelaAlteracaoCardapio = EscolaCancelaAlteracaoCardapio;

    const resp = await function_CancelaAlteracaoCardapio(
      uuid,
      `${motivoCancelamento} - ${justificativa}`
    );
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      toastSuccess("Alteração de Cardápio cancelada com sucesso!");
      this.props.setRedirect();
    } else {
      toastError(resp.detail);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.justificativa !== this.props.justificativa) {
      this.setState({ justificativa: this.props.justificativa });
    }
    if (prevProps.motivoCancelamento !== this.props.motivoCancelamento) {
      this.setState({ motivoCancelamento: this.props.motivoCancelamento });
    }
  }

  render() {
    const { showModal, closeModal, uuid, alteracaoDeCardapio } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja negar a solicitação?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <p className="label--red">
                {alteracaoDeCardapio &&
                  mensagemCancelamento(alteracaoDeCardapio.status)}
                Deseja seguir em frente com o cancelamento?
              </p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-12">
              <Field
                component={LabelAndCombo}
                name="motivo_cancelamento"
                label="Motivo"
                //TODO: criar campos a mais no backend?
                options={[
                  {
                    nome: "Sem motivo",
                    uuid: "Sem motivo"
                  },
                  {
                    nome: "Em desacordo com o contrato",
                    uuid: "Em desacordo com o contrato"
                  }
                ]}
                validate={required}
              />
            </div>
            <div className="form-group col-12">
              <Field
                component={LabelAndTextArea}
                placeholder="Obrigatório"
                label="Justificativa"
                name="justificativa"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
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
              this.negarAlteracaoCardapio(uuid);
            }}
            style={BUTTON_STYLE.BLUE}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
