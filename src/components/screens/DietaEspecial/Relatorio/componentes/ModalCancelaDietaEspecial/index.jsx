import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import {
  peloMenosUmCaractere,
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
import {
  toastSuccess,
  toastError
} from "../../../../../Shareable/Toast/dialogs";
import { getError } from "../../../../../../helpers/utilities";

export class ModalCancelaDietaEspecial extends Component {
  constructor(props) {
    super(props);
    this.state = { justificativa: null };
  }

  cancelaDietaEspecial = (uuid, values) => {
    escolaCancelaSolicitacao(uuid, values).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Solicitação de Dieta Especial cancelada com sucesso!");
        this.props.loadSolicitacao(uuid);
        this.props.closeModal();
      } else {
        toastError(
          `Erro ao cancelar Solicitação de Dieta Especial: ${getError(
            response.data
          )}`
        );
      }
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
              validate={[required, textAreaRequired, peloMenosUmCaractere]}
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
