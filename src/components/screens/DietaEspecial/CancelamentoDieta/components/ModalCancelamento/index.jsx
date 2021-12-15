import React from "react";
import HTTP_STATUS from "http-status-codes";
import { Modal } from "react-bootstrap";
import Botao from "components/Shareable/Botao";
import { Field, Form } from "react-final-form";
import { getError } from "helpers/utilities";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import "./styles.scss";
import { TextAreaWYSIWYG } from "components/Shareable/TextArea/TextAreaWYSIWYG";
import ManagedInputFileField from "components/Shareable/Input/InputFile/ManagedField";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { escolaInativaDietaEspecial } from "services/dietaEspecial.service";
import {
  peloMenosUmCaractere,
  required,
  textAreaRequired
} from "helpers/fieldValidators";
import { composeValidators } from "helpers/utilities";

export default ({ dieta, showModal, setShowModal, filtros, setFiltros }) => {
  const onSubmit = values => {
    escolaInativaDietaEspecial(dieta.uuid, values).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Solicitação de cancelamento realizada com sucesso.");
        setShowModal(false);
        setFiltros({ ...filtros });
      } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
        toastError(getError(response.data));
      } else {
        toastError(
          `Erro ao solicitar dieta especial: ${getError(response.data)}`
        );
      }
    });
  };

  return (
    <Modal
      dialogClassName="modal-reclamacao-produto modal-80w"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Deseja cancelar Dieta Especial?</Modal.Title>
      </Modal.Header>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <section className="row attachments">
                <div className="col-9">
                  <div className="card-title font-weight-bold cinza-escuro mt-4">
                    * Laudo
                  </div>
                  <div className="text">
                    Anexe o laudo de alta médica fornecido pelo profissional.
                    Sem ele, a solicitação de cancelamento será negada.
                  </div>
                  <div className="card-warning mt-2">
                    <strong>IMPORTANTE:</strong> Envie um arquivo formato .doc,
                    .docx, .pdf, .png, .jpg ou .jpeg, com até 10Mb. <br /> O
                    Laudo deve ter sido emitido há, no máximo, 12 meses. Após a
                    data de aprovação no sistema, o laudo terá validade de 12
                    meses
                  </div>
                </div>
                <div className="col-3 btn">
                  <Field
                    component={ManagedInputFileField}
                    className="inputfile"
                    texto="Anexar"
                    name="anexos"
                    accept=".png, .doc, .pdf, .docx, .jpeg, .jpg"
                    icone={BUTTON_ICON.ATTACH}
                    toastSuccessMessage="Anexo incluso com sucesso"
                    concatenarNovosArquivos
                    validate={required}
                  />
                </div>
              </section>
              <section className="row mt-5">
                <div className="col-12">
                  <Field
                    component={TextAreaWYSIWYG}
                    label="Justificativa"
                    name="justificativa"
                    className="form-control mb-3"
                    required
                    validate={composeValidators(
                      textAreaRequired,
                      peloMenosUmCaractere
                    )}
                  />
                </div>
              </section>
            </Modal.Body>
            <br /> <br />
            <Modal.Footer>
              <div className="row">
                <div className="col-12 mt-3">
                  <Botao
                    key={0}
                    texto="Sim"
                    type={BUTTON_TYPE.SUBMIT}
                    style={BUTTON_STYLE.GREEN}
                  />
                  <Botao
                    key={1}
                    type={BUTTON_TYPE.BUTTON}
                    texto="Não"
                    className="ml-2"
                    style={BUTTON_STYLE.GREEN_OUTLINE}
                    onClick={() => setShowModal(false)}
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
