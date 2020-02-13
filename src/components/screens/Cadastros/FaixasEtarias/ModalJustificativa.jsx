import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { required } from "../../../../helpers/fieldValidators";
import { TextAreaWYSIWYG } from "../../../Shareable/TextArea/TextAreaWYSIWYG";
import { toastWarn } from "../../../Shareable/Toast/dialogs";
import Botao from "../../../Shareable/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "../../../Shareable/Botao/constants";
import { MENSAGEM_VAZIA } from "../../../Shareable/TextArea/constants";

export class ModalJustificativa extends Component {
  constructor(props) {
    super(props);
    this.state = { justificativa: "" };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { justificativa } = this.state;
    if (justificativa === MENSAGEM_VAZIA) {
      toastWarn("Justificativa é obrigatória.");
    } else {
      this.props.onSubmit(justificativa);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.justificativa !== this.props.justificativa) {
      this.setState({ justificativa: this.props.justificativa });
    }
  }

  render() {
    const { showModal, closeModal } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Redefinição de Novas Faixas Etárias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row mb-3">
            <div className="form-group col-12">
              <TextAreaWYSIWYG
                label="Justificativa"
                required
                validate={required}
                input={{
                  onChange: valor => this.setState({ justificativa: valor }),
                  value: this.state.justificativa,
                  onBlur: () => {}
                }}
              />
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
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="ml-3"
              />
              <Botao
                texto="Sim"
                type={BUTTON_TYPE.BUTTON}
                onClick={this.onSubmit}
                style={BUTTON_STYLE.GREEN_OUTLINE}
                className="ml-3"
              />
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalJustificativa;
