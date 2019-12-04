import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Botao from "../../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../../Shareable/Botao/constants";

export class ModalCadastroTipoAlimentacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiposAlimentacoes: null,
      frameAtual: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const tiposAlimentacoes = this.props.tiposAlimentacoes;
    if (tiposAlimentacoes !== prevState.tiposAlimentacoes) {
      this.setState({ tiposAlimentacoes });
    }
  }

  render() {
    const { tiposAlimentacoes, frameAtual } = this.state;
    const { showModal, closeModal, onSubmit } = this.props;
    return (
      <Modal dialogClassName="modal-90w" show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação dos cadastros de possibilidades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-header-body">
            Abaixo segue os resumos de cada alimentação cadastrada com base nos
            seus períodos.
          </div>
          <div className="wizard-container modal-wizard">
            {tiposAlimentacoes &&
              tiposAlimentacoes.map((periodo, indice) => {
                return (
                  <a
                    key={indice}
                    href={`#${indice}`}
                    className={
                      indice === frameAtual
                        ? "current-step"
                        : indice < frameAtual
                        ? "passed-step"
                        : "next-step"
                    }
                    onClick={event => {
                      event.preventDefault();
                      this.setState({ frameAtual: indice });
                    }}
                  >
                    <span>{periodo.periodo_escolar.nome}</span>
                  </a>
                );
              })}
          </div>
          <div className="descricao">Tipo de alimentação</div>
          {tiposAlimentacoes &&
            tiposAlimentacoes[frameAtual].substituicoes.map(
              (alimentacao, indice) => {
                return (
                  <div key={indice} className="detalhe-alimentacao">
                    <div className="titulo-descricao">De:</div>
                    <div className="titulo-descricao">Para:</div>
                    <div>{alimentacao.tipo_alimentacao.nome}</div>
                    <div>
                      {tiposAlimentacoes[frameAtual].substituicoes[
                        indice
                      ].substituicoes.map((combinacao, indice) => {
                        return <div key={indice}>{combinacao.nome}</div>;
                      })}
                    </div>
                  </div>
                );
              }
            )}
        </Modal.Body>
        <Modal.Footer>
          <div className="botao-footer-modal">
            <Botao
              texto={"Cancelar"}
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN_OUTLINE}
              onClick={() => closeModal()}
            />
            <Botao
              texto={"Confirmar"}
              className="ml-3"
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.GREEN}
              onClick={onSubmit}
            />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}
