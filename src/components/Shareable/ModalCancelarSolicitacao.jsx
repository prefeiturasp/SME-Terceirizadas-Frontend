import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import { cancelaKitLancheAvulsoEscola } from "../../services/solicitacaoDeKitLanche.service";
import BaseButton, { ButtonStyle, ButtonType } from "./button";
import { LabelAndTextArea } from "./labelAndInput/labelAndInput";
import { toastError, toastSuccess } from "./Toast/dialogs";

export class ModalCancelarSolicitacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      justificativa: ""
    };
  }

  async cancelarSolicitacaoDaEscola(uuid) {
    const { justificativa } = this.state;
    const resp = await cancelaKitLancheAvulsoEscola(uuid, justificativa);
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      toastSuccess("Solicitação cancelada com sucesso!");
    } else {
      toastError(resp.detail);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.justificativa !== this.props.justificativa) {
      this.setState({ justificativa: this.props.justificativa });
    }
  }
  render() {
    const { showModal, closeModal, uuid, solicitacaoKitLanche } = this.props;
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
              <p>{`Solicitação nº #${solicitacaoKitLanche &&
                solicitacaoKitLanche.id_externo}`}</p>
              <p>{`Solicitante: AGUARDANDO DEFINIÇÃO DE PERFIL`}</p>
              <p>{`Data: ${solicitacaoKitLanche &&
                solicitacaoKitLanche.data}`}</p>
              <p>{`Quantidade de Alimentações: ${solicitacaoKitLanche &&
                solicitacaoKitLanche.quantidade_alimentacoes}`}</p>
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
            onClick={() => {
              this.cancelarSolicitacaoDaEscola(uuid);
            }}
            style={ButtonStyle.Primary}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
