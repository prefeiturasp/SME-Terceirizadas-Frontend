import HTTP_STATUS from "http-status-codes";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import AutoCompleteField from "components/Shareable/AutoCompleteField";

import Botao from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "../Botao/constants";
import CKEditorField from "../CKEditorField";
import { toastError, toastSuccess } from "../Toast/dialogs";
import { textAreaRequiredAndAtLeastOneCharacter } from "../../../helpers/fieldValidators";
import "./style.scss";
import InputText from "../Input/InputText";
import { PAINEL_GESTAO_PRODUTO } from "configs/constants";
import { Redirect } from "react-router-dom";

export class ModalPadrao extends Component {
  propTypes = {
    labelJustificativa: PropTypes.string
  };

  defaultProps = {
    labelJustificativa: "Justificativa"
  };

  enviarJustificativa = async formValues => {
    const { justificativa } = formValues;
    const { uuid, toastSuccessMessage } = this.props;
    let resp = undefined;
    if (this.props.eAnalise !== undefined && this.props.eAnalise) {
      const terceirizada = this.props.terceirizadas.find(
        t => t.nome_fantasia === formValues.nome_terceirizada
      );
      resp = await this.props.endpoint(uuid, justificativa, terceirizada.uuid);
    } else {
      resp = await this.props.endpoint(uuid, justificativa);
    }
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      this.props.loadSolicitacao(this.props.uuid);
      toastSuccess(toastSuccessMessage);
      if (this.props.endpoint.name === "CODAECancelaAnaliseSensorialProduto") {
        return <Redirect to={`/${PAINEL_GESTAO_PRODUTO}`} />;
      }
    } else {
      toastError(resp.data.detail);
    }
  };

  getTerceirizadasFiltrado = t => {
    const { terceirizadas } = this.props;
    if (t) {
      const reg = new RegExp(t, "i");
      return terceirizadas.map(t => t.nome_fantasia).filter(a => reg.test(a));
    }
    return terceirizadas.map(t => t.nome_fantasia);
  };

  getTerceirizadas = () => {
    const { terceirizadas } = this.props;
    return terceirizadas.map(t => t.nome_fantasia);
  };

  getSelectedItem = terceirizada => {
    const { terceirizadas } = this.props;
    const item = terceirizadas.find(
      opt => opt.nome_fantasia === terceirizada.nome_fantasia
    );
    return item ? item.nome_fantasia : {};
  };

  render() {
    const {
      showModal,
      closeModal,
      labelJustificativa,
      modalTitle,
      textAreaPlaceholder,
      protocoloAnalise,
      status,
      terceirizada,
      tipoModal,
      cancelaAnaliseSensorial,
      ...textAreaProps
    } = this.props;
    return (
      <Modal
        dialogClassName="modal-50w modal-question"
        show={showModal}
        onHide={closeModal}
      >
        <Form
          onSubmit={this.enviarJustificativa}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {protocoloAnalise !== null && tipoModal === "analise" && (
                  <div className="numero-protocolo">
                    <div>Número Protocolo: {protocoloAnalise}</div>
                  </div>
                )}
                {this.props.cancelaAnaliseSensorial !== undefined &&
                  this.props.cancelaAnaliseSensorial && (
                    <div className="row">
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Nome do Produto"
                          name="nome_produto"
                          defaultValue={cancelaAnaliseSensorial.produto.nome}
                          disabled={true}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Marca do Produto"
                          name="marca_produto"
                          defaultValue={
                            cancelaAnaliseSensorial.produto.marca.nome
                          }
                          disabled={true}
                        />
                      </div>
                      <div className="col-4">
                        <Field
                          component={InputText}
                          label="Fabricante do Produto"
                          name="fabricante_produto"
                          defaultValue={
                            cancelaAnaliseSensorial.produto.fabricante.nome
                          }
                          disabled={true}
                        />
                      </div>
                    </div>
                  )}

                {this.props.eAnalise !== undefined && this.props.eAnalise && (
                  <div className="row">
                    <div className="col-12">
                      <Field
                        component={AutoCompleteField}
                        dataSource={this.getTerceirizadasFiltrado(
                          values.nome_terceirizada
                        )}
                        label="Nome da empresa solicitante (Terceirizada)"
                        placeholder="Digite nome da terceirizada"
                        name="nome_terceirizada"
                        validate={value =>
                          !value ? "Campo obrigatório" : undefined
                        }
                        required
                        defaultValue={
                          status === "CODAE_PENDENTE_HOMOLOGACAO"
                            ? terceirizada.nome_fantasia
                            : null
                        }
                        disabled={
                          status === "CODAE_PENDENTE_HOMOLOGACAO" ? true : false
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-12">
                    <Field
                      component={CKEditorField}
                      label={labelJustificativa}
                      placeholder={textAreaPlaceholder}
                      name="justificativa"
                      required
                      validate={textAreaRequiredAndAtLeastOneCharacter}
                      {...textAreaProps}
                    />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className="row">
                  <div className="col-12">
                    <Botao
                      texto="Cancelar"
                      type={BUTTON_TYPE.BUTTON}
                      onClick={closeModal}
                      style={BUTTON_STYLE.GREEN_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Enviar"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                    />
                  </div>
                </div>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal>
    );
  }
}
