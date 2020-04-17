import React, { Component } from 'react'

import Botao from "../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
} from "../../../../Shareable/Botao/constants";
import ModalCancelaDietaEspecial from "./ModalCancelaDietaEspecial";

export default class EscolaCancelaDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render(){
    const { showModal } = this.state;
    const { onCancelar } = this.props;
    return(
      <>
        <ModalCancelaDietaEspecial
          showModal={showModal}
          closeModal={this.closeModal}
          onCancelar={() => {
            this.closeModal();
            onCancelar()
          }}
          {...this.props}
        />
        <Botao
          texto="Cancelar"
          className="ml-3"
          onClick={this.openModal}
          type={BUTTON_TYPE.BUTTON}
          style={BUTTON_STYLE.GREEN_OUTLINE}
        />
      </>
    )
  }
}