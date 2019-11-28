import React, { Component } from "react";
import { Botao } from "../../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_TYPE
} from "../../../../Shareable/Botao/constants";

class ResultadoFiltro extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="card">
        <section className="card-body realtorio-filtro">
          <header>Resultado</header>
          <section className="cabecalho">
            <div className="cabecalho-esquerdo">Solicitações por status</div>
            <div className="cabecalho-direito">
              <section>
                <Botao
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  texto={"Exportar Planilha"}
                  type={BUTTON_TYPE.BUTTON}
                />
                <Botao
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  texto={"Imprimir"}
                  type={BUTTON_TYPE.BUTTON}
                />
              </section>
            </div>
          </section>
        </section>
      </section>
    );
  }
}

export default ResultadoFiltro;
