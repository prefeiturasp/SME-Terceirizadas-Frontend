import React, { Component } from "react";
import { Field } from "redux-form";
import { Modal } from "react-bootstrap";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "./../../../../Shareable/Botao/constants";
import Botao from "../../../../Shareable/Botao";
import InputText from "../../../../Shareable/Input/InputText";

export class ModalAlterarSenha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letra: false,
      numero: false,
      tamanho: false
    };
  }

  render() {
    const { letra, numero, tamanho } = this.state;
    const { showModal, closeModal } = this.props;
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
                    esconderAsterisco
                    label="Senha atual"
                    name="senha_atual"
                    type="password"
                  />
                </div>
                <div className="form-group col-12">
                  <Field
                    component={InputText}
                    esconderAsterisco
                    label="Nova Senha"
                    name="senha"
                    type="password"
                  />
                </div>
                <div className="form-group col-12">
                  <Field
                    component={InputText}
                    esconderAsterisco
                    label="Confirmação da Nova Senha"
                    name="confirmar_senha"
                    type="password"
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
                    Ao menos um numero
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
            type={BUTTON_TYPE.BUTTON}
            style={BUTTON_STYLE.GREEN}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalAlterarSenha;
