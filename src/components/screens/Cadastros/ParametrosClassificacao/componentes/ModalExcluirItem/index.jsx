import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { deletarParametrosClassificacao } from "services/parametrosClassificacao.service";
import { Form } from "react-final-form";
import { Spin } from "antd";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "components/Shareable/Botao/constants";

export default ({ closeModal, showModal, item, fetchData }) => {
  const [carregando, setCarregando] = useState(false);

  const onSubmit = async () => {
    setCarregando(true);
    await deletarParametrosClassificacao(item.uuid)
      .then(() => {
        toastSuccess("Parâmetro de Classificação excluído com sucesso");
      })
      .catch((error) => {
        toastError(error.response.data.detail);
      });
    setCarregando(false);
    closeModal();
    fetchData();
  };

  return (
    <Modal dialogClassName="modal-50w" show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Excluir Parâmetro de Classificação</Modal.Title>
      </Modal.Header>
      <Spin tip="Carregando..." spinning={carregando}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="row">
                  <div className="col-12">
                    <p>Deseja excluir o cadastro do item selecionado?</p>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="row mt-4">
                  <div className="col-12">
                    <Botao
                      texto="Não"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={closeModal}
                      style={BUTTON_STYLE.DARK_OUTLINE}
                      className="ms-3"
                    />
                    <Botao
                      texto="Sim"
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
