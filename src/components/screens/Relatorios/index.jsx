import React, { Component, Fragment } from "react";
import GraficoEvolucao from "./components/GraficoEvolucao";
import BuscaPorPeriodo from "./components/BuscaPorPeriodo";
import ResultadoFiltro from "./components/ResultadoFiltro";
import CardsComBandeira from "./components/CardsComBandeira";

class Relatorios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderizaConteudoPadrao: true,
      resultadosFiltro: null,
      limpaForm: false,
      values: null,
      paginacao: []
    };
    this.renderizarRelatorio = this.renderizarRelatorio.bind(this);
    this.setaFalseLimpaForm = this.setaFalseLimpaForm.bind(this);
    this.setaValuesForm = this.setaValuesForm.bind(this);
    this.setaPaginacao = this.setaPaginacao.bind(this);
  }

  setaFalseLimpaForm() {
    this.setState({
      limpaForm: false
    });
  }

  setaValuesForm = values => {
    this.setState({ values });
  };

  setaPaginacao = quantidade => {
    let paginacao = this.state.paginacao;
    for (let i = 0; i < quantidade; i++) {
      if (i % 100 === 0) {
        paginacao.push(i);
      }
    }
    this.setState({ paginacao });
  };

  renderizarRelatorio = resultado => {
    let renderizaConteudoPadrao = this.state.renderizaConteudoPadrao;
    if (resultado === "sair") {
      this.setState({
        renderizaConteudoPadrao: !this.state.renderizaConteudoPadrao,
        resultadosFiltro: [],
        limpaForm: true
      });
    } else {
      renderizaConteudoPadrao &&
        (renderizaConteudoPadrao = resultado.length <= 0);
      this.setState({
        renderizaConteudoPadrao,
        resultadosFiltro: resultado
      });
    }
  };

  render() {
    const {
      renderizaConteudoPadrao,
      resultadosFiltro,
      limpaForm,
      values,
      paginacao
    } = this.state;
    return (
      <Fragment>
        <BuscaPorPeriodo
          renderizarRelatorio={this.renderizarRelatorio}
          limpaForm={limpaForm}
          setaFalseLimpaForm={this.setaFalseLimpaForm}
          setaValuesForm={this.setaValuesForm}
          setaPaginacao={this.setaPaginacao}
        />
        {renderizaConteudoPadrao ? (
          <div className="card">
            <CardsComBandeira {...this.props} />
            <GraficoEvolucao {...this.props} />
          </div>
        ) : (
          <ResultadoFiltro
            values={values}
            paginacao={paginacao}
            resultadosFiltro={resultadosFiltro}
            renderizarRelatorio={this.renderizarRelatorio}
          />
        )}
      </Fragment>
    );
  }
}

export default Relatorios;
