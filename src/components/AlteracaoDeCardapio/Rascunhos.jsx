import React, { Component } from "react";

export class Rascunhos extends Component {
  render() {
    const {
      alteracaoCardapioList,
      OnDeleteButtonClicked,
      OnEditButtonClicked
    } = this.props;
    const cardsRascunhos = alteracaoCardapioList.map(
      (alteracaoDeCardapio, key) => {
        const { uuid, id_externo } = alteracaoDeCardapio;
        let backgroundColor =
          alteracaoDeCardapio.status === "SALVO" ? "#82B7E8" : "#DADADA";
        return (
          <div key={key} className="bg-white border rounded mt-3">
            <div className="mt-2">
              <label className="bold ml-3">
                {`Alteração do Tipo de Alimentação # ${id_externo}`}
              </label>
              <span
                className="ml-3 p-1 border rounded"
                style={{ background: backgroundColor }}
              >
                {alteracaoDeCardapio.status}
              </span>
            </div>
            <div className="icon-draft-card float-right">
              Salvo em: {alteracaoDeCardapio.criado_em}
              <span onClick={() => OnDeleteButtonClicked(id_externo, uuid)}>
                <i className="fas fa-trash" />
              </span>
              <span
                onClick={() =>
                  OnEditButtonClicked({
                    alteracaoDeCardapio
                  })
                }
              >
                <i className="fas fa-edit" />
              </span>
            </div>
            <div className="ml-3">
              <p>
                {alteracaoDeCardapio.data
                  ? `Dia: ${alteracaoDeCardapio.data}`
                  : alteracaoDeCardapio.data_inicial ===
                    alteracaoDeCardapio.data_final
                  ? `Dia: ${alteracaoDeCardapio.data_inicial ||
                      alteracaoDeCardapio.alterar_dia}`
                  : `De ${alteracaoDeCardapio.data_inicial} a ${
                      alteracaoDeCardapio.data_final
                    }`}
              </p>
            </div>
          </div>
        );
      }
    );
    return <div>{cardsRascunhos}</div>;
  }
}
