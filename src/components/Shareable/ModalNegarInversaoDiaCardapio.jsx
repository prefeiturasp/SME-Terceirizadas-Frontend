import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import { statusEnum } from "../../constants/shared";
import { required } from "../../helpers/fieldValidators";
import { mensagemCancelamento } from "../../helpers/utilities";
import {
  CODAENegaInversaoDeDiaDeCardapio,
  DRENegaInversaoDeDiaDeCardapio
} from "../../services/inversaoDeDiaDeCardapio.service";
import Botao from "./Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "./Botao/constants";
import Select from "./Select";
import { toastError, toastSuccess } from "./Toast/dialogs";

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
    const { showModal, closeModal, uuid, inversaoDeDiaDeCardapio } = this.props;
    let negarValidar = "negar";
    if (
      inversaoDeDiaDeCardapio &&
      inversaoDeDiaDeCardapio.status === statusEnum.DRE_A_VALIDAR
    )
      negarValidar = "não validar";

    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{`Deseja ${negarValidar} a solicitação?`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <p className="label--red">
                {inversaoDeDiaDeCardapio &&
                  mensagemCancelamento(inversaoDeDiaDeCardapio.status)}
                Deseja seguir em frente com o cancelamento?
              </p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-12">
              <Field
                component={Select}
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
                component={Select}
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
              this.negarInversaoDiaCardapio(uuid);
            }}
            style={BUTTON_STYLE.BLUE}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
