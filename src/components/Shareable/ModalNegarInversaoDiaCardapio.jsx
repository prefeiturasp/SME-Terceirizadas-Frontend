import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import { required } from "../../helpers/fieldValidators";
import {
  DRENegaInversaoDeDiaDeCardapio,
  CODAENegaInversaoDeDiaDeCardapio
} from "../../services/inversaoDeDiaDeCardapio.service";
import BaseButton, { ButtonStyle, ButtonType } from "./button";
import { LabelAndCombo, LabelAndTextArea } from "./labelAndInput/labelAndInput";
import { toastError, toastSuccess } from "./Toast/dialogs";
import { statusEnum } from "../../constants/statusEnum";

export class ModalNegarInversaoDiaCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = { justificativa: "", motivoCancelamento: "" };
  }

  async negarInversaoDiaCardapio(uuid) {
    const { justificativa, motivoCancelamento } = this.state;
    const { inversaoDeDiaDeCardapio } = this.props;

    const function_NegaInversaoDiaCardapio =
      inversaoDeDiaDeCardapio &&
      inversaoDeDiaDeCardapio.status === statusEnum.DRE_A_VALIDAR
        ? DRENegaInversaoDeDiaDeCardapio
        : CODAENegaInversaoDeDiaDeCardapio;

    const resp = await function_NegaInversaoDiaCardapio(
      uuid,
      `${motivoCancelamento} - ${justificativa}`
    );
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      toastSuccess("Alteração de Dia de Cardápio recusado com sucesso!");
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
    const { showModal, closeModal, uuid } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja negar a solicitação?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              this.negarInversaoDiaCardapio(uuid);
            }}
            style={ButtonStyle.Primary}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
