import HTTP_STATUS from "http-status-codes";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Field } from "redux-form";
import { cancelaInversaoDiaCardapioEscola } from "../../services/inversaoDeDiaDeCardapio.service";
import { toastError, toastSuccess } from "./Toast/dialogs";
import { statusEnum } from "../../constants/statusEnum";
import Botao from "./Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "./Botao/constants";
import { TextArea } from "./TextArea/TextArea";

export const ORIGEM_SOLICITACAO = {
  ESCOLA: 0,
  DRE: 1
};
export class ModalCancelarInversaoDiaCardapio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      justificativa: ""
    };
  }

  async cancelarSolicitacaoDaEscola(uuid) {
    const { justificativa } = this.state;
    let resp = "";

    resp = await cancelaInversaoDiaCardapioEscola(uuid, justificativa);
    if (resp.status === HTTP_STATUS.OK) {
      this.props.closeModal();
      toastSuccess("Solicitação cancelada com sucesso!");
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
      uuid,
      solicitacaoInversaoDeDiaDeCardapio
    } = this.props;
    const { justificativa } = this.state;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cancelamento de Inversão de Dia de Cardapio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row">
            <div className="col-12">
              <p className="label--red">
                {solicitacaoInversaoDeDiaDeCardapio &&
                solicitacaoInversaoDeDiaDeCardapio.status ===
                  statusEnum.CODAE_AUTORIZADO
                  ? "Esta solicitação já foi autorizada pela CODAE. "
                  : "Esta solicitação está aguardando validação da DRE ou autorização da CODAE. "}
                Deseja seguir em frente com o cancelamento?
              </p>
            </div>
            <div className="col-12 label--gray margin-fix">
              <b>Resumo</b>
              <p>{`Solicitação nº #${solicitacaoInversaoDeDiaDeCardapio &&
                solicitacaoInversaoDeDiaDeCardapio.id_externo}`}</p>
              <p>{`Solicitante: AGUARDANDO DEFINIÇÃO DE PERFIL`}</p>
              <p>{`Data: ${solicitacaoInversaoDeDiaDeCardapio &&
                solicitacaoInversaoDeDiaDeCardapio.data_de} ->
                ${solicitacaoInversaoDeDiaDeCardapio &&
                  solicitacaoInversaoDeDiaDeCardapio.data_para}`}</p>
              <p>{`Quantidade de Alimentações: ${solicitacaoInversaoDeDiaDeCardapio &&
                solicitacaoInversaoDeDiaDeCardapio.escola
                  .quantidade_alunos}`}</p>
            </div>
            <div className="form-group col-12">
              <Field
                component={TextArea}
                placeholder="Obrigatório"
                label="Justificativa"
                name="justificativa"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
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
            onClick={() => {
              this.cancelarSolicitacaoDaEscola(uuid);
            }}
            style={BUTTON_STYLE.BLUE}
            className="ml-3"
            disabled={justificativa === "" || justificativa === undefined}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}
