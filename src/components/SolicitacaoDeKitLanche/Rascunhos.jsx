import React, { Component } from "react";

export class Rascunhos extends Component {
  render() {
    const {
      rascunhosSolicitacoesKitLanche,
      OnDeleteButtonClicked,
      OnEditButtonClicked
    } = this.props;
    const cardsRascunhos = rascunhosSolicitacoesKitLanche.map(
      solicitacaoKitLanche => {
        const {
          uuid,
          id_externo,
          local,
          quantidade_alunos
        } = solicitacaoKitLanche;
        let backgroundColor = "#DADADA";
        return (
          <div className="card border rounded mt-3 p-3" key={id_externo}>
            <div className="mt-2">
              <label className="bold ml-3">
                {`Solicitação de Kit Lanche # ${id_externo}`}
              </label>
              <span
                className="ml-3 p-1 border rounded"
                style={{ background: backgroundColor }}
              >
                RASCUNHO
              </span>
              <div className="ml-3">
                <div>
                  <label>
                    Data do evento:{" "}
                    <b>{solicitacaoKitLanche.solicitacao_kit_lanche.data}</b>{" "}
                    Local do passeio: <b>{local}</b>
                  </label>
                  <div className="icon-draft-card float-right">
                    Salvo em:{" "}
                    {solicitacaoKitLanche.solicitacao_kit_lanche.criado_em}
                    <span
                      onClick={() => OnDeleteButtonClicked(id_externo, uuid)}
                    >
                      <i className="fas fa-trash" />
                    </span>
                    <span
                      onClick={() => OnEditButtonClicked(solicitacaoKitLanche)}
                    >
                      <i className="fas fa-edit" />
                    </span>
                  </div>
                </div>
                <label>
                  Nº de Alunos participantes: <b>{quantidade_alunos}</b>
                </label>
              </div>
            </div>
          </div>
        );
      }
    );
    return <div>{cardsRascunhos}</div>;
  }
}
