import React, { useContext, useState } from "react";
import { Field, Form } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { Modal } from "react-bootstrap";
import HTTP_STATUS from "http-status-codes";
import { composeValidators, getError } from "helpers/utilities";
import {
  peloMenosUmCaractere,
  textAreaRequired,
} from "helpers/fieldValidators";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { SolicitacaoAlimentacaoContext } from "context/SolicitacaoAlimentacao";
import CKEditorField from "components/Shareable/CKEditorField";

export const ModalNegarFinalForm = ({ ...props }) => {
  const {
    showModal,
    closeModal,
    solicitacao,
    endpoint,
    loadSolicitacao,
    tipoSolicitacao,
  } = props;
  const [justificativa, setJustificativa] = useState("");

  const solicitacaoAlimentacaoContext = useContext(
    SolicitacaoAlimentacaoContext
  );

  const onSubmit = async (values) => {
    const resp = await endpoint(solicitacao.uuid, values, tipoSolicitacao);
    if (resp.status === HTTP_STATUS.OK) {
      closeModal();
      toastSuccess("Solicitação negada com sucesso!");
      if (loadSolicitacao) {
        const response = await loadSolicitacao(solicitacao.uuid);
        if (response && response.status === HTTP_STATUS.OK) {
          solicitacaoAlimentacaoContext.updateSolicitacaoAlimentacao(
            response.data
          );
        }
      }
    } else {
      closeModal();
      toastError(`Houve um erro ao negar solicitação: ${getError(resp.data)}`);
    }
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Deseja negar a solicitação?</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-row">
                <div className="form-group col-12">
                  <Field
                    component={CKEditorField}
                    label="Justificativa"
                    name="justificativa"
                    required
                    validate={composeValidators(
                      textAreaRequired,
                      peloMenosUmCaractere
                    )}
                  />
                  <OnChange name="justificativa">
                    {(value) => setJustificativa(value)}
                  </OnChange>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Botao
                texto="Não"
                type={BUTTON_TYPE.BUTTON}
                onClick={closeModal}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="ms-3"
              />
              <Botao
                texto="Sim"
                type={BUTTON_TYPE.SUBMIT}
                style={BUTTON_STYLE.GREEN}
                disabled={justificativa === "" || justificativa === undefined}
                className="ms-3"
              />
            </Modal.Footer>
          </form>
        )}
      />
    </Modal>
  );
};
