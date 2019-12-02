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
      resultadosFiltro: null,
      limpaForm: false
    };
    this.renderizarRelatorio = this.renderizarRelatorio.bind(this);
    this.setaFalseLimpaForm = this.setaFalseLimpaForm.bind(this);
  }

  setaFalseLimpaForm() {
    this.setState({
      limpaForm: false
    });
  }

  renderizarRelatorio = resultado => {
    if (resultado === "sair") {
      this.setState({
        renderizaConteudoPadrao: !this.state.renderizaConteudoPadrao,
        resultadosFiltro: [],
        limpaForm: true
      });
    } else {
      this.setState({
        renderizaConteudoPadrao: false,
        resultadosFiltro: resultado
      });
    }
  };

  render() {
    const { renderizaConteudoPadrao, resultadosFiltro, limpaForm } = this.state;
    return (
      <Fragment>
        <BuscaPorPeriodo
          renderizarRelatorio={this.renderizarRelatorio}
          limpaForm={limpaForm}
          setaFalseLimpaForm={this.setaFalseLimpaForm}
        />
        {renderizaConteudoPadrao ? (
          <GraficoEvolucao />
        ) : (
          <ResultadoFiltro
            resultadosFiltro={resultadosFiltro}
            renderizarRelatorio={this.renderizarRelatorio}
          />
        )}
      </Fragment>
    );
  }
}

export default Relatorios;
