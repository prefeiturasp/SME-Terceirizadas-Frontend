import React, { Component, Fragment } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import { TextArea } from "../../../../Shareable/TextArea/TextArea";
import { Botao } from "../../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../../Shareable/Botao/constants";
import "../../../style.scss";
import HTTP_STATUS from "http-status-codes";
import {
  negarInclusaoContinuaCodae,
  negarInclusaoNormalCodae
} from "../../../../../services/inclusaoDeAlimentacaoAvulsa.service";
import { toastSuccess, toastError } from "../../../../Shareable/Toast/dialogs";

export class ModalNegarInclusaoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      justificativa: ""
    };
  }

  async negarInclusaoDeEscolaCodae(uuid, ehInclusaoContinua) {
    const { justificativa } = this.state;
    let resp = "";

    ehInclusaoContinua
      ? (resp = await negarInclusaoContinuaCodae(uuid, justificativa))
      : (resp = await negarInclusaoNormalCodae(uuid, justificativa));
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      toastSuccess("Solicitação negada com sucesso!");
    } else {
      toastError(resp.detail);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.justificativa !== this.props.justificativa) {
      this.setState({ justificativa: this.props.justificativa });
    }
  }

  render() {
    const {
      showModal,
      closeModal,
      inclusaoDeAlimentacao,
      ehInclusaoContinua
    } = this.props;
    const uuid = inclusaoDeAlimentacao && inclusaoDeAlimentacao.uuid;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja não validar a inclusão?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row conteudo">
            <div className="form-group col-12">
              <div className="info-inclusao">
                <div className="titulo">Resumo</div>
                {inclusaoDeAlimentacao && (
                  <Fragment>
                    <div>ID Inclusão: #{inclusaoDeAlimentacao.id_externo}</div>
                    <div>
                      Escola Solicitante: {inclusaoDeAlimentacao.escola.nome}
                    </div>
                    <div>
                      Data da solicitação: {inclusaoDeAlimentacao.criado_em}
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
            <div className="form-group col-12">
              <Field
                component={TextArea}
                placeholder="Obrigatório"
                label="Justificativa"
                name="obs"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Botao
            texto="Confirmar"
            type={BUTTON_TYPE.BUTTON}
            onClick={() => {
              this.negarInclusaoDeEscolaCodae(uuid, ehInclusaoContinua);
            }}
            style={BUTTON_STYLE.BLUE}
            className="ml-3"
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
