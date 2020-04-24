import React, { Component } from "react";

import Botao from "../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../Shareable/Botao/constants";
import ModalCancelaDietaEspecial from "./ModalCancelaDietaEspecial";

export default class EscolaCancelaDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  onOpenModal = () => {
    this.setState({ showModal: true });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
    const { onCancelar } = this.props;
    return (
      <>
        <ModalCancelaDietaEspecial
          showModal={showModal}
          onCloseModal={this.onCloseModal}
          onCancelar={() => {
            this.onCloseModal();
            onCancelar();
          }}
          {...this.props}
        />
        <div className="form-group row float-right mt-4">
          <Botao
            texto="Cancelar"
            className="ml-3"
            onClick={this.onOpenModal}
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN_OUTLINE}
          />
        </div>
      </>
    );
  }
}
