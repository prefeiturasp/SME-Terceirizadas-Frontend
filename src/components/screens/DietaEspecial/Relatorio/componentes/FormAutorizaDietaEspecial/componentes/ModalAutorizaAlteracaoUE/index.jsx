import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "../../../../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../../../../Shareable/Botao/constants";
import { Spin } from "antd";

export default props => (
  <Modal show={props.showModal} onHide={props.closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Solicitação de Alteração de U.E</Modal.Title>
    </Modal.Header>
    <Spin tip="Carregando..." spinning={props.submitting}>
      <Modal.Body>
        <label>Nome Completo do Aluno</label>
        <p>
          <b>{props.dietaEspecial.aluno.nome}</b>
        </p>
        <label>Tempo de vigência</label>
        <p>
          Início: <b>{props.dietaEspecial.data_inicio}</b> Término:
          <b> {props.dietaEspecial.data_termino}</b>
        </p>
        Deseja continuar?
      </Modal.Body>
      <Modal.Footer>
        <Botao
          texto="Não"
          type={BUTTON_TYPE.BUTTON}
          onClick={props.closeModal}
          style={BUTTON_STYLE.BLUE_OUTLINE}
          className="ml-3"
        />
        <Botao
          texto="Sim"
          type={BUTTON_TYPE.BUTTON}
          onClick={props.handleSubmit}
          style={BUTTON_STYLE.BLUE}
          className="ml-3"
        />
      </Modal.Footer>
    </Spin>
  </Modal>
);
