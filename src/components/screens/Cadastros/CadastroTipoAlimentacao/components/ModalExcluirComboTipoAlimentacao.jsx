import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Botao from "../../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../../Shareable/Botao/constants";

export default class ModalExcluirComboTipoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      showModal,
      closeModal,
      deletaComboTipoAlimentacao,
      combo,
      indice
    } = this.props;
    return (
      <Modal dialogClassName="modal-50w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Exclusão de Combinação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-header-body">
            Tem certeza que deseja excluir essa combinação:{" "}
            {`${combo && combo.label}`} ?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="botao-footer-modal">
            <Botao
              texto={"Cancelar"}
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              onClick={() => closeModal()}
            />
            <Botao
              texto={"Confirmar"}
              className="ml-3"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              onClick={() => {
                deletaComboTipoAlimentacao(combo, indice);
                closeModal();
              }}
            />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
