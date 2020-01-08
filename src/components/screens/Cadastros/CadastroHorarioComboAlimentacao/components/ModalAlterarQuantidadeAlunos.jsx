import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Botao from "../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../Shareable/Botao/constants";
import { InputText } from "../../../../Shareable/Input/InputText";
import { Field } from "redux-form";
import {
  required,
  numericInteger,
  textAreaRequired
} from "../../../../../helpers/fieldValidators";
import { TextAreaWYSIWYG } from "../../../../Shareable/TextArea/TextAreaWYSIWYG";

class ModalAlterarQuantidadeAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoAlunos: null
    };
  }

  componentDidUpdate(prevProps) {
    let infoAlunos = this.props.infoAlunos;
    if (infoAlunos === prevProps.infoAlunos && !this.state.infoAlunos) {
      this.setState({ infoAlunos });
    }
  }

  // onSubmit = values => {
  //   // console.log(values);
  // };

  render() {
    const { showModal, closeModal, handleSubmit } = this.props;
    return (
      <Modal
        show={showModal}
        onHide={closeModal}
        dialogClassName="modal-50w modal-question"
      >
        <Modal.Header closeButton>
          <Modal.Title>Alteração de número de alunos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <main className="modal-form-att-alunos">
            <section className="input-qtd-alunos">
              <Field
                component={InputText}
                label="Nº de Alunos"
                className="form-control"
                name="qtd-alunos"
                validate={[required, numericInteger]}
              />
            </section>
            <section className="aviso-modal">
              IMPORTANTE: O número de alunos apresentado é proveniente do EOL
              sendo possível alterar para as solicitações que serão realizadas
              apenas para hoje. Atualize os alunos no EOL para para que essa
              informação esteja sempre correta.
            </section>
            <section className="justificatica-quantidade-alunos">
              <Field
                component={TextAreaWYSIWYG}
                label="Justificativa"
                className="form-control"
                name="observacao"
                validate={[required, textAreaRequired]}
              />
            </section>
          </main>
        </Modal.Body>
        <Modal.Footer>
          <Botao
            texto="Cancelar"
            type={BUTTON_TYPE.BUTTON}
            onClick={closeModal}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="ml-3"
          />
          <Botao
            texto="Confirmar"
            type={BUTTON_TYPE.BUTTON}
            onClick={handleSubmit(values =>
              this.onSubmit({
                ...values
              })
            )}
            style={BUTTON_STYLE.GREEN_OUTLINE}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalAlterarQuantidadeAlunos;
