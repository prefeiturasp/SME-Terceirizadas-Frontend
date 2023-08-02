import { agregarDefault } from "helpers/utilities";
import HTTP_STATUS from "http-status-codes";
import React from "react";
import { Modal } from "react-bootstrap";
import { Field } from "react-final-form";
import { required } from "../../../helpers/fieldValidators";
import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import Select from "../Select";
import { TextArea } from "../TextArea/TextArea";
import { toastError, toastSuccess } from "../Toast/dialogs";

export const ModalNaoValidarSolicitacao = ({ ...props }) => {
  const {
    showModal,
    closeModal,
    uuid,
    motivosDREnaoValida,
    motivoCancelamento,
    tipoSolicitacao,
    justificativa,
    endpoint,
    loadSolicitacao
  } = props;

  const naoValidarSolicitacao = async uuid => {
    if (!motivoCancelamento) {
      toastError("O campo motivo é obrigatório");
      return;
    }
    if (!justificativa) {
      toastError("O campo Justificativa é obrigatório");
      return;
    }
    const resp = await endpoint(
      uuid,
      {
        justificativa: `${
          motivosDREnaoValida.find(motivo => motivo.uuid === motivoCancelamento)
            .nome
        } - ${justificativa}`
      },
      tipoSolicitacao
    );
    if (resp.status === HTTP_STATUS.OK) {
      closeModal();
      toastSuccess("Solicitação não validada com sucesso!");
      if (loadSolicitacao) {
        loadSolicitacao(uuid, tipoSolicitacao);
      }
    } else {
      toastError(resp.detail);
    }
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Deseja não validar solicitação?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-row">
          <div className="form-group col-12">
            <Field
              component={Select}
              name="motivo_cancelamento"
              label="Motivo"
              //TODO: criar campos a mais no backend?
              naoDesabilitarPrimeiraOpcao
              options={agregarDefault(motivosDREnaoValida)}
              required
              validate={required}
            />
          </div>
          <div className="form-group col-12">
            <Field
              component={TextArea}
              placeholder="Obrigatório"
              label="Justificativa"
              name="justificativa"
              validate={required}
              required
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Botao
          texto="Não"
          type={BUTTON_TYPE.BUTTON}
          onClick={closeModal}
          style={BUTTON_STYLE.GREEN_OUTLINE}
          className="ml-3"
        />
        <Botao
          texto="Sim"
          type={BUTTON_TYPE.BUTTON}
          onClick={() => {
            naoValidarSolicitacao(uuid);
          }}
          style={BUTTON_STYLE.GREEN}
          className="ml-3"
        />
      </Modal.Footer>
    </Modal>
  );
};
