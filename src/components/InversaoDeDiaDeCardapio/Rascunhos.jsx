import React, { Component } from "react";

export class Rascunhos extends Component {
  render() {
    const { rascunhosInversoes } = this.props;
    if (rascunhosInversoes && rascunhosInversoes.length) {
      const allDaysInfo = rascunhosInversoes.map(inversaoDeDiaDeCardapio => {
        const { uuid, id_externo } = inversaoDeDiaDeCardapio;
        let backgroundColor = "#DADADA";
        return (
          <div className="card border rounded mt-3 p-2">
            <div className="mt-2 row">
              <div className="col-sm">
                <label className="bold ml-3">
                  Alteração de Dia de cardápio {`# ${id_externo}`}
                </label>
                <span
                  className="ml-3 p-1 border rounded"
                  style={{ background: backgroundColor }}
                >
                  {"SALVO"}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
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
              <div className="icon-draft-card float-right">
                Salvo em: {inversaoDeDiaDeCardapio.criado_em}
                <span
                  onClick={() => this.props.removerRascunho(id_externo, uuid)}
                >
                  <i className="fas fa-trash" />
                </span>
                <span
                  onClick={() =>
                    this.props.carregarRascunho({
                      inversaoDeDiaDeCardapio
                    })
                  }
                >
                  <i className="fas fa-edit" />
                </span>
              </div>
            </div>
          </div>
        );
      });
      return <div>{allDaysInfo}</div>;
    } else {
      return <div />;
    }
  }
}
