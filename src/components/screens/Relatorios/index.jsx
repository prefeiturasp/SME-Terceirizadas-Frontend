import React, { Component, Fragment } from "react";
import GraficoEvolucao from "./components/GraficoEvolucao";
import BuscaPorPeriodo from "./components/BuscaPorPeriodo";
import ResultadoFiltro from "./components/ResultadoFiltro";
import "./style.scss";

class Relatorios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderizaConteudoPadrao: true,
      resultadosFiltro: null
    };
    this.renderizarRelatorio = this.renderizarRelatorio.bind(this);
  }

  renderizarRelatorio = resultado => {
    this.setState({
      renderizaConteudoPadrao: false,
      resultadosFiltro: resultado
    });
  };

  render() {
    const { renderizaConteudoPadrao } = this.state;
    return (
      <Fragment>
        <BuscaPorPeriodo renderizarRelatorio={this.renderizarRelatorio} />
        {renderizaConteudoPadrao ? <GraficoEvolucao /> : <ResultadoFiltro />}
      </Fragment>
    );
  }
}

export default Relatorios;
