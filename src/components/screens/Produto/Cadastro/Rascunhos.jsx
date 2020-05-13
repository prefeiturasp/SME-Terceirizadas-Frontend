import React, { Component } from "react";

export class Rascunhos extends Component {
  render() {
    const { rascunhos, removerRascunho, carregarRascunho } = this.props;
    if (rascunhos && rascunhos.length) {
      const cardsProdutos = rascunhos.map((rascunho, key) => {
        const { produto } = rascunho;
        let backgroundColor = "#DADADA";
        return (
          <div key={key} className="draft bg-white border rounded mt-1 p-2">
            <div className="mt-2">
              <label className="bold ml-3">
                Produto {`# ${produto.id_externo}`}
              </label>
              <span
                className="ml-3 p-1 border rounded"
                style={{ background: backgroundColor }}
              >
                {"RASCUNHO"}
              </span>
            </div>
            <div className="icon-draft-card float-right">
              Criado em: {produto.criado_em}
              <span
                onClick={() =>
                  removerRascunho(produto.id_externo, rascunho.uuid)
                }
              >
                <i className="fas fa-trash" />
              </span>
              <span
                onClick={() =>
                  carregarRascunho({
                    produto
                  })
                }
              >
                <i className="fas fa-edit" />
              </span>
            </div>
            <div className="ml-3">
              <p>Nome do produto: {produto.nome}</p>
            </div>
          </div>
        );
      });
      return <div>{cardsProdutos}</div>;
    } else {
      return <div />;
    }
  }
}
