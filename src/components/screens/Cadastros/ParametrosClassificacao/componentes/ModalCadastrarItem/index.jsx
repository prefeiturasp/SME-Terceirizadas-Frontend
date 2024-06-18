import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  cadastrarParametrosClassificacao,
  atualizarParametrosClassificacao,
} from "services/parametrosClassificacao.service";
import { Field, Form } from "react-final-form";
import InputText from "components/Shareable/Input/InputText";
import { Spin } from "antd";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import {
  required,
  alphaNumericAndSingleSpaceBetweenCharacters,
  noSpaceStartOrEnd,
  inteiroOuDecimalComVirgula
} from "helpers/fieldValidators";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";
import { composeValidators } from "helpers/utilities";
import "./style.scss";

export default ({ closeModal, showModal, item, fetchData, tipo }) => {
  const [carregando, setCarregando] = useState(false);
  const [formItem, setFormItem] = useState({});

  useEffect(() => {
    if (showModal) {
      setFormItem({
        ...(item ?? {}),        
        valor: item?.valor ? item.valor.replaceAll('.', ',') : ''
      })
    }
  }, [showModal]);

  const onClose = () => {
    setFormItem({});
    closeModal();
  }

  const validateForm = (payload) => {
    if (payload.valor < 0 || payload.valor > 100) {
      toastError("O valor deve estar entre 0 e 100");
      return false;
    }
    return true;
  }

  const onSubmit = async (formValues) => {
    const onSuccess = (msg) => {
      setCarregando(false);
      toastSuccess(msg);
      onClose();
      fetchData();
    }

    const onError = (error) => {
      setCarregando(false);
      if (error.response.data.non_field_errors) {
        toastError(error.response.data.non_field_errors[0]);
      } else {
        toastError(error.response.data[0]);
      }
    }

    const payload = {
      uuid: formItem?.uuid,
      descricao: formValues.descricao,
      tipo: tipo.uuid,
      valor: parseFloat(formValues.valor.toString().replaceAll('.','').replaceAll(',','.'))
    };

    if (!validateForm(payload)) return;

    setCarregando(true);

    if (item?.uuid) {
      await atualizarParametrosClassificacao(payload, formItem.uuid)
        .then(() => onSuccess("Cadastro atualizado com sucesso"))
        .catch(onError);
      
    } else {
        await cadastrarParametrosClassificacao(payload)
        .then(() => onSuccess("Cadastro realizado com sucesso"))
        .catch(onError);
    }    
  };

  return (
    <Modal dialogClassName="modal-50w" show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {item ? "Editar Parametro de Classificação" : "Cadastrar Parametro de Classificação"}
        </Modal.Title>
      </Modal.Header>
      <Spin tip="Carregando..." spinning={carregando}>
        <Form
          onSubmit={onSubmit}
          initialValues={{}}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
              <div className="row">
                  <div className="col-12">
                    <Field
                      label="Tipo"
                      name="tipo"
                      defaultValue={tipo.nome}
                      component={InputText}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Field
                      label="Descricão"
                      name="descricao"
                      defaultValue={formItem ? formItem.descricao : undefined}
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
                <div className="row">
                  <div className="col-12">
                    <Field
                        label="Valor menor ou igual a"
                        name="valor"
                        component={InputText}
                        placeholder={"Digite o Valor"}
                        required
                        proibeLetras
                        defaultValue={formItem ? formItem.valor : undefined}
                        validate={composeValidators(
                          required,
                          inteiroOuDecimalComVirgula,
                        )}
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
                      onClick={onClose}
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
