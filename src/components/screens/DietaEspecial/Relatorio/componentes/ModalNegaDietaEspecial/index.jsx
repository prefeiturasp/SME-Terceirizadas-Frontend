import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field, Form } from "react-final-form";
import { required } from "../../../../../../helpers/fieldValidators";
import { TextAreaWYSIWYG } from "../../../../../Shareable/TextArea/TextAreaWYSIWYG";
import {
  toastError,
  toastSuccess
} from "../../../../../Shareable/Toast/dialogs";
import Botao from "../../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../../Shareable/Botao/constants";
import Select from "../../../../../Shareable/Select";
import { agregarDefault } from "../../../../../../helpers/utilities";
import { getMotivosNegacaoDietaEspecial } from "../../../../../../services/painelNutricionista.service";
import { formataMotivos } from "./helper";

import { CODAENegaDietaEspecial } from "../../../../../../services/dietaEspecial.service";

export default class ModalNegarSolicitacao extends Component {
  constructor(props) {
    super(props);
    this.state = { motivosNegacao: [] };
  }

  onSubmit = async values => {
    const { uuid } = this.props;
    const resp = await CODAENegaDietaEspecial(uuid, values);
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      toastSuccess("Solicitação negada com sucesso!");
      if (this.props.onNegar) {
        this.props.onNegar();
      }
    } else {
      toastError(resp.data.detail);
    }
  };

  componentDidMount = async () => {
    const motivosNegacao = await getMotivosNegacaoDietaEspecial();
    this.setState({
      motivosNegacao: agregarDefault(formataMotivos(motivosNegacao.results))
    });
  };

  render() {
    const { motivosNegacao } = this.state;
    const { showModalNegaDieta, closeModal } = this.props;
    return (
      <Modal
        dialogClassName="modal-90w"
        show={showModalNegaDieta}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deseja negar a solicitação?</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={this.onSubmit}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="row">
                  <div className="col-12">
                    <Field
                      component={Select}
                      label="Motivo"
                      name="motivo_negacao"
                      options={motivosNegacao}
                      validate={required}
                    />
                  </div>
                </div>
                <div className="form-row mb-3">
                  <div className="form-group col-12">
                    <Field
                      component={TextAreaWYSIWYG}
                      label="Justificativa"
                      name="justificativa_negacao"
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
                      style={BUTTON_STYLE.DARK_OUTLINE}
                      className="ml-3"
                    />
                    <Botao
                      texto="Sim"
                      type={BUTTON_TYPE.SUBMIT}
                      style={BUTTON_STYLE.GREEN}
                      className="ml-3"
                      disabled={submitting}
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
