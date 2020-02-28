import React, { Component } from "react";
import "./style.scss";

export default class Rascunhos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { meusRascunhos } = this.props;
    const cardsInclusoesCei = meusRascunhos.map(
      (inclusaoAlimentacaoCei, indice) => {
        const { id_externo } = inclusaoAlimentacaoCei;
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
              <span>
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
