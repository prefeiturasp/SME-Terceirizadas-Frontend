import React, { Component } from "react";
import { removerInclusaoDeAlimentacaoNormal } from "../../services/inclusaoDeAlimentacaoAvulsa.service";
import { removerInclusaoDeAlimentacaoContinua } from "../../services/inclusaoDeAlimentacaoContinua.service";
import "../Shareable/style.scss";

export class Rascunhos extends Component {
  removerRascunho(id, uuid, ehInclusaoContinua) {
    const removerRascunhoEndpointCorreto = ehInclusaoContinua
      ? removerInclusaoDeAlimentacaoContinua
      : removerInclusaoDeAlimentacaoNormal;
    this.props.removerRascunho(id, uuid, removerRascunhoEndpointCorreto);
    this.props.resetForm();
  }

  render() {
    const { rascunhosInclusaoDeAlimentacao, carregarRascunho } = this.props;
    const cardsInclusoes = rascunhosInclusaoDeAlimentacao.map(
      inclusaoDeAlimentacao => {
        const { id_externo, uuid } = inclusaoDeAlimentacao;
        const ehInclusaoContinua = inclusaoDeAlimentacao.data_final;
        let backgroundColor = "#DADADA";
        return (
          <div className="draft bg-white border rounded mt-1">
            <div className="mt-2">
              <label className="bold ml-3">
                {`Inclusão de Alimentação # ${id_externo}`}
              </label>
              <span
                className="ml-3 p-1 border rounded"
                style={{ background: backgroundColor }}
              >
                {inclusaoDeAlimentacao.status}
              </span>
            </div>
            <div className="icon-draft-card float-right">
              Salvo em: {inclusaoDeAlimentacao.created_at}
              <span
                onClick={p =>
                  this.removerRascunho(id_externo, uuid, ehInclusaoContinua)
                }
              >
                <i className="fas fa-trash" />
              </span>
              <span
                onClick={() =>
                  carregarRascunho({
                    inclusaoDeAlimentacao
                  })
                }
              >
                <i className="fas fa-edit" />
              </span>
            </div>
            <div className="ml-3">
              <p>
                {ehInclusaoContinua
                  ? `${inclusaoDeAlimentacao.motivo.nome} -
                    (${inclusaoDeAlimentacao.data_inicial} - ${
                      inclusaoDeAlimentacao.data_final
                    })`
                  : `Inclusão de Alimentação - ${
                      inclusaoDeAlimentacao.inclusoes.length
                    } dia(s)`}
              </p>
            </div>
          </div>
        );
      }
    );
    return <div>{cardsInclusoes}</div>;
  }
}
