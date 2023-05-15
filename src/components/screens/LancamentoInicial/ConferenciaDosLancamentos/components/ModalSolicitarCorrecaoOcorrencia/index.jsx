import React from "react";
import HTTP_STATUS from "http-status-codes";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { peloMenosUmCaractere, required } from "helpers/fieldValidators";
import { Field, Form } from "react-final-form";
import CKEditorField from "components/Shareable/CKEditorField";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { drePedeCorrecaoOcorrencia } from "services/medicaoInicial/solicitacaoMedicaoInicial.service";

export const ModalSolicitarCorrecaoOcorrencia = ({ ...props }) => {
  const { showModal, setShowModal, ocorrencia, atualizarDados } = props;

  const onSubmit = async values => {
    const response = await drePedeCorrecaoOcorrencia(ocorrencia.uuid, values);
    if (response.status === HTTP_STATUS.OK) {
      setShowModal(false);
      toastSuccess(
        `Solicitação de correção no Formulário de Ocorrências salva com sucesso!`
      );
      atualizarDados();
    } else {
      toastError(
        `Houve um erro ao salvar correção no Formulário de Ocorrências!`
      );
    }
    setShowModal(false);
  };

  return (
    <Modal
      dialogClassName="modal-50w"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Solicitar correção no formulário de ocorrências
        </Modal.Title>
      </Modal.Header>

      <Form
        onSubmit={values => onSubmit(values)}
        initialValues={{}}
        render={({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-row row-ativacao mt-3">
                <div className="col-12">
                  <p>
                    Informe quais os pontos necessários de correção no
                    Formulário de Ocorrências
                  </p>
                </div>
                <div className="col-12">
                  <Field
                    component={CKEditorField}
                    label="Descrição da Correção"
                    name="justificativa"
                    required
                    validate={value => {
                      for (let validator of [peloMenosUmCaractere, required]) {
                        const erro = validator(value);
                        if (erro) return erro;
                      }
                    }}
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <div className="row mt-4">
                <div className="col-12">
                  <Botao
                    texto="Voltar"
                    type={BUTTON_TYPE.BUTTON}
                    onClick={() => setShowModal(false)}
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    className="ml-3"
                  />
                  <Botao
                    texto="Enviar"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                    className="ml-3"
                    disabled={
                      submitting ||
                      peloMenosUmCaractere(values.justificativa) !== undefined
                    }
                  />
                </div>
              </div>
            </Modal.Footer>
          </form>
        )}
      />
    </Modal>
  );
};
