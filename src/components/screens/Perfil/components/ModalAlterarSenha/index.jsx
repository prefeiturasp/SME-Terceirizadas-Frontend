import React, { Component } from "react";
import { Field } from "redux-form";
import { Modal } from "react-bootstrap";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "./../../../../Shareable/Botao/constants";
import Botao from "../../../../Shareable/Botao";
import InputText from "../../../../Shareable/Input/InputText";
import { required } from "../../../../../helpers/fieldValidators";

export class ModalAlterarSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letra: false,
      numero: false,
      tamanho: false
    };
  }

  onSenhaChanged(value) {
    const numbers = /[0-9]/g;
    const letters = /[a-zA-Z]/g;
    this.setState({
      numero: value.match(numbers),
      tamanho: value.length >= 8,
      letra: value.match(letters)
    });
  }

  render() {
    const { letra, numero, tamanho } = this.state;
    const { showModal, closeModal, onSubmit } = this.props;
    return (
      <Modal dialogClassName="modal-50w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-8">
              <div className="form-row">
                <div className="form-group col-12">
                  <Field
                    component={InputText}
                    label="Senha atual"
                    name="senha_atual"
                    type="password"
                    required
                    validate={required}
                  />
                </div>
                <div className="form-group col-12">
                  <Field
                    component={InputText}
                    label="Nova Senha"
                    name="senha"
                    type="password"
                    onChange={event => this.onSenhaChanged(event.target.value)}
                    required
                    validate={required}
                  />
                </div>
                <div className="form-group col-12">
                  <Field
                    component={InputText}
                    label="Confirmação da Nova Senha"
                    name="confirmar_senha"
                    type="password"
                    required
                    validate={required}
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="password-requirements">
                <div className="title">Requisitos de segurança da senha:</div>
                <div className="requirements">
                  <div className={`${letra ? "accepted" : "denied"}`}>
                    Ao menos uma letra
                    <i
                      className={`fas fa-${letra ? "check" : "times"} fa-lg`}
                    />
                  </div>
                  <div className={`${numero ? "accepted" : "denied"}`}>
                    Ao menos um número
                    <i
                      className={`fas fa-${numero ? "check" : "times"} fa-lg`}
                    />
                  </div>
                  <div className={`${tamanho ? "accepted" : "denied"}`}>
                    Mínimo 8 caracteres
                    <i
                      className={`fas fa-${tamanho ? "check" : "times"} fa-lg`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
            type={BUTTON_TYPE.SUBMIT}
            style={BUTTON_STYLE.GREEN}
            className="ml-3"
            onClick={() => onSubmit(letra && numero && tamanho)}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalAlterarSenha;
