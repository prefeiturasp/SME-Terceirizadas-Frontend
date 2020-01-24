import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import {
  required,
  textAreaRequired
} from "../../../../../../helpers/fieldValidators";
import { TextAreaWYSIWYG } from "../../../../../Shareable/TextArea/TextAreaWYSIWYG";
import { escolaCancelaSolicitacao } from "../../../../../../services/dietaEspecial.service";

import Botao from "../../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../../Shareable/Botao/constants";
import { toastSuccess } from "../../../../../Shareable/Toast/dialogs";

export class ModalCancelaDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = { justificativa: null };
  }

  cancelaDietaEspecial = (uuid, values) => {
    escolaCancelaSolicitacao(uuid, values).then(response => {
      toastSuccess(response.status);
    });
  };

  render() {
    const { showModal, closeModal, uuid, handleSubmit } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <form onSubmit={this.props.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Deseja cancelar a solicitação?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Field
              component={TextAreaWYSIWYG}
              label="Justificativa"
              name="justificativa"
              required
              validate={[required, textAreaRequired]}
            />
          </Modal.Body>
          <Modal.Footer>
            <div className="row mt-4">
              <div className="col-12">
                <Botao
                  texto="Não"
                  type={BUTTON_TYPE.BUTTON}
                  onClick={closeModal}
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  className="ml-3"
                />
                <Botao
                  texto="Sim"
                  type={BUTTON_TYPE.BUTTON}
                  onClick={handleSubmit(values =>
                    this.cancelaDietaEspecial(uuid, values)
                  )}
                  style={BUTTON_STYLE.BLUE}
                  className="ml-3"
                />
              </div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

const formName = "modalCancelaDietaEspecial";
const CancelaDietaForm = reduxForm({
  form: formName,
  enableReinitialize: true
})(ModalCancelaDietaEspecial);
const selector = formValueSelector(formName);
const mapStateToProps = state => {
  return {
    justificativa: selector(state, "justificativa")
  };
};
export default connect(mapStateToProps)(CancelaDietaForm);
