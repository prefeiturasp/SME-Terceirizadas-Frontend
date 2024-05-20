import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  cadastrarTipoAlimento,
  atualizarTipoAlimento,
} from "services/tipoAlimento.service";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { Spin } from "antd";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  required,
  alphaNumericAndSingleSpaceBetweenCharacters,
  noSpaceStartOrEnd,
} from "helpers/fieldValidators";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import { composeValidators } from "helpers/utilities";
import "./style.scss";

export default ({ closeModal, showModal, item, changePage }) => {
  const [carregando, setCarregando] = useState(false);

  const onSubmit = async (formValues) => {
    setCarregando(true);
    const payload = {
      nome: formValues.nome,
      tipo: formValues.tipo,
    };
    if (item) {
      await atualizarTipoAlimento(payload, item.uuid)
        .then(() => {
          toastSuccess("Cadastro atualizado com sucesso");
        })
        .catch((error) => {
          toastError(error.response.data[0]);
        });
    } else {
      await cadastrarTipoAlimento(payload)
        .then(() => {
          toastSuccess("Cadastro realizado com sucesso");
        })
        .catch((error) => {
          toastError(error.response.data[0]);
        });
    }

    setCarregando(false);
    closeModal();
    changePage();
  };

  return (
    <Modal dialogClassName="modal-50w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {item ? "Editar Tipo de Alimento" : "Cadastrar Tipo de Alimento"}
        </Modal.Title>
      </Modal.Header>
      <Spin tip="Carregando..." spinning={carregando}>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="row mb-3">
                  <div className="col-12">
                    <label className="col-form-label mb-1">
                      <span className="asterisco">* </span>
                      Nome
                    </label>
                    <Field
                      name="nome"
                      defaultValue={item ? item.nome : undefined}
                      component={InputText}
                      required
                      validate={composeValidators(
                        required,
                        alphaNumericAndSingleSpaceBetweenCharacters,
                        noSpaceStartOrEnd
                      )}
                      toUppercaseActive
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="row mt-4">
                  <div className="col-12">
                    <Botao
                      texto="Cancelar"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={closeModal}
                      style={BUTTON_STYLE.DARK_OUTLINE}
                      className="ms-3"
                    />
                    <Botao
                      texto="Salvar"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="ms-3"
                      disabled={submitting}
                    />
                  </div>
                </div>
              </Modal.Footer>
            </form>
          )}
        />
      </Spin>
    </Modal>
  );
};
