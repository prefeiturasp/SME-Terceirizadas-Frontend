import React, { useState } from "react";
import { Spin } from "antd";
import HTTP_STATUS from "http-status-codes";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Field } from "redux-form";
import { Modal } from "react-bootstrap";
import InputText from "components/Shareable/Input/InputText";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import { CODAEHomologaProduto } from "services/produto.service";

export const ModalVincularEditais = ({ ...props }) => {
  const {
    showModal,
    closeModal,
    editaisOptions,
    editais,
    onChangeEditais,
    uuid,
    loadSolicitacao
  } = props;

  const [loading, setLoading] = useState(false);

  const renderizarLabelEditais = (selected, options) => {
    if (selected.length === 0) {
      return "Selecione os editais vinculados";
    }
    if (selected.length === options.length) {
      return "Todos os editais estão selecionados";
    }
    if (selected.length === 1) {
      return `${selected.length} edital selecionado`;
    }
    return `${selected.length} editais selecionados`;
  };

  const onSubmit = () => {
    setLoading(true);
    CODAEHomologaProduto(uuid, editais).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Solicitação de homologado enviada com sucesso");
        setLoading(false);
        closeModal();
        loadSolicitacao(uuid);
      } else {
        toastError(response.data.detail);
        setLoading(false);
      }
    });
  };

  return (
    <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
      <Spin tip="Enviando..." spinning={loading}>
        <Modal.Header closeButton>
          <Modal.Title>Homologação do Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-3">
            <div className="col-4">
              <Field
                name="nome"
                label="Nome do Produto"
                component={InputText}
                disabled
              />
            </div>
            <div className="col-4">
              <Field
                name="marca"
                label="Marca do Produto"
                component={InputText}
                disabled
              />
            </div>
            <div className="col-4">
              <Field
                name="fabricante"
                label="Fabricante do Produto"
                component={InputText}
                disabled
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <Field
                name="tipo"
                label="Tipo do Produto"
                component={InputText}
                disabled
              />
            </div>
            <div className="col-4">
              <div className="mb-2">
                <label>Editais</label>
              </div>
              <Field
                component={StatefulMultiSelect}
                name="editais"
                selected={editais}
                disableSearch={true}
                options={editaisOptions.map(edital => ({
                  label: edital.numero,
                  value: edital.uuid
                }))}
                valueRenderer={(selected, options) =>
                  renderizarLabelEditais(selected, options)
                }
                overrideStrings={{
                  selectAll: "Todos os editais"
                }}
                onSelectedChanged={values => onChangeEditais(values)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row mt-4">
            <div className="col-12">
              <Botao
                texto="Voltar"
                type={BUTTON_TYPE.BUTTON}
                onClick={closeModal}
                style={BUTTON_STYLE.GREEN_OUTLINE_WHITE}
                className="ml-3"
              />
              <Botao
                texto="Homologar"
                type={BUTTON_TYPE.BUTTON}
                onClick={() => onSubmit()}
                style={BUTTON_STYLE.GREEN}
                className="ml-3"
                disabled={editais.length === 0}
              />
            </div>
          </div>
        </Modal.Footer>
      </Spin>
    </Modal>
  );
};
