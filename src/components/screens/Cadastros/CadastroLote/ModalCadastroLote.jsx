import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import "../style.scss";

export class ModalCadastroLote extends Component {
  render() {
    const { showModal, closeModal, resumo, escolasSelecionadas } = this.props;
    return (
      <Modal
        dialogClassName="modal-cadastro-lote modal-90w"
        show={showModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deseja criar um novo lote?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <p>Resumo</p>
              <p>{resumo.dre}</p>
              {resumo.subprefeitura && (
                <p>Subprefeitura: {resumo.subprefeitura}</p>
              )}
              <p>Lote: {resumo.nome}</p>
              <p>Número: {resumo.numero}</p>
            </div>
          </div>
          {escolasSelecionadas.length > 0 && (
            <div className="row pt-3">
              <div className="col-12">
                <label className="label-selected-unities">
                  Unidades Específicas do Lote Selecionadas
                </label>
                {escolasSelecionadas.map((escola, indice) => {
                  return (
                    <div className="value-selected-unities" key={indice}>
                      {escola}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <BaseButton
            label="Não"
            type={ButtonType.BUTTON}
            onClick={closeModal}
            style={ButtonStyle.OutlinePrimary}
            className="ml-3"
          />
          <BaseButton
            label="Sim"
            type={ButtonType.BUTTON}
            onClick={closeModal}
            style={ButtonStyle.Primary}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
