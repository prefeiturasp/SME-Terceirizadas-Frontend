import React, { Component } from "react";
import "./style.scss";
import { TIPO_SOLICITACAO } from "constants/shared";

export default class Rascunhos extends Component {
  removerRascunho(id, uuid) {
    this.props.removerRascunho(id, uuid, TIPO_SOLICITACAO.SOLICITACAO_CEI);
    this.props.resetForm();
  }

  render() {
    const { meusRascunhos, carregarRascunho } = this.props;
    const cardsInclusoesCei = meusRascunhos.map(
      (inclusaoAlimentacaoCei, indice) => {
        const { id_externo, uuid } = inclusaoAlimentacaoCei;
        let backgroundColor = "#DADADA";
        return (
          <div
            key={indice}
            className="draft bg-white border rounded rascunhos-inclusao"
          >
            <div className="">
              <label className="bold ml-3">
                {`Inclusão de Alimentação # ${id_externo}`}
              </label>
              <span
                className="ml-3 p-1 border rounded"
                style={{ background: backgroundColor }}
              >
                {inclusaoAlimentacaoCei.status}
              </span>
            </div>
            <div className="icon-draft-card">
              Criado em: {inclusaoAlimentacaoCei.criado_em}
              <span
                onClick={() =>
                  this.removerRascunho(
                    id_externo,
                    uuid,
                    TIPO_SOLICITACAO.SOLICITACAO_CEI
                  )
                }
              >
                <i className="fas fa-trash" />
              </span>
              <span
                onClick={() =>
                  carregarRascunho({
                    inclusaoAlimentacaoCei
                  })
                }
              >
                <i className="fas fa-edit" />
              </span>
            </div>
          </div>
        );
      }
    );
    return <div>{cardsInclusoesCei}</div>;
  }
}
