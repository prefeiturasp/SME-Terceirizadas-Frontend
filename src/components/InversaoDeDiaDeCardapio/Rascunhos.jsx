import React, { Component } from "react";

export class Rascunhos extends Component {
  render() {
    const {
      rascunhosInversoes,
      removerRascunho,
      carregarRascunho
    } = this.props;
    if (rascunhosInversoes && rascunhosInversoes.length) {
      const cardsInversoes = rascunhosInversoes.map(inversaoDeDiaDeCardapio => {
        const { uuid, id_externo } = inversaoDeDiaDeCardapio;
        let backgroundColor = "#DADADA";
        return (
          <div className="draft bg-white border rounded mt-1 p-2">
            <div className="mt-2">
              <label className="bold ml-3">
                Inversão de dia de Cardápio {`# ${id_externo}`}
              </label>
              <span
                className="ml-3 p-1 border rounded"
                style={{ background: backgroundColor }}
              >
                {"RASCUNHO"}
              </span>
            </div>
            <div className="icon-draft-card float-right">
              Criado em: {inversaoDeDiaDeCardapio.criado_em}
              <span onClick={() => removerRascunho(id_externo, uuid)}>
                <i className="fas fa-trash" />
              </span>
              <span
                onClick={() =>
                  carregarRascunho({
                    inversaoDeDiaDeCardapio
                  })
                }
              >
                <i className="fas fa-edit" />
              </span>
            </div>
            <div className="ml-3">
              <p>
                Substituição do dia:{" "}
                <b>{inversaoDeDiaDeCardapio.cardapio_de.data}</b>{" "}
                <i
                  className={"fa fa-arrow-right ml-2 mr-2"}
                  style={{ color: "#2881BB" }}
                />{" "}
                para o dia:
                <b> {inversaoDeDiaDeCardapio.cardapio_para.data}</b>
              </p>
            </div>
          </div>
        );
      });
      return <div>{cardsInversoes}</div>;
    } else {
      return <div />;
    }
  }
}
