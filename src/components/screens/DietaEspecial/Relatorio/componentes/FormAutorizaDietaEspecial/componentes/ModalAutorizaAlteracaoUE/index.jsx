import React from "react";
import { Modal } from "react-bootstrap";
import Botao from "../../../../../../../Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE
} from "../../../../../../../Shareable/Botao/constants";
import { Spin } from "antd";

export default props => (
  <Modal show={props.showModal} onHide={props.closeModal} size="lg">
    <Modal.Header className="pb-1" closeButton>
      <Modal.Title>
        <p style={{ fontSize: "24px" }}>
          <b>Solicitação de Alteração de U.E</b>
        </p>
      </Modal.Title>
    </Modal.Header>
    <Spin tip="Carregando..." spinning={props.submitting}>
      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <p>
                  <b>Nome Completo do Aluno</b>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p>{props.dietaEspecial.aluno.nome}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <div className="row">
              <div className="col-4">
                <div className="row">
                  <div className="col-12">
                    <p>
                      <b>Início da Vigência</b>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p>{props.dietaEspecial.data_inicio}</p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="row">
                  <div className="col-12">
                    <p>
                      <b>Término da Vigência</b>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p>{props.dietaEspecial.data_termino}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="row">
        <div className="col-12" style={{ alignItems: "flex-end" }}>
          <div className="mr-2 float-left">
            <p>
              <b>Deseja continuar?</b>
            </p>
          </div>
          <Botao
            texto="Sim"
            type={BUTTON_TYPE.BUTTON}
            onClick={props.handleSubmit}
            style={BUTTON_STYLE.GREEN}
            className="ml-3 float-right"
          />
          <Botao
            texto="Cancelar"
            onClick={props.closeModal}
            style={BUTTON_STYLE.DARK_OUTLINE}
            className="ml-3 float-right"
          />
        </div>
      </Modal.Footer>
    </Spin>
  </Modal>
);
