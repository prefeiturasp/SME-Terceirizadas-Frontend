import React, { Component, Fragment } from "react";

class StepMatutino extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dadosAlimentacao } = this.props;
    return (
      <Fragment>
        <div className="section">
          <span className="titulo-card">Tipo de alimentos atuais</span>
          <div className="tipos-alimentacao">
            {dadosAlimentacao.tipoAlimentos.map((alimento, indice) => {
              return indice === 0 ? (
                dadosAlimentacao.tipoAlimentos[indice].combinacoes.length >
                0 ? (
                  <a className="passou" key={indice} href={`#${indice}`}>
                    <span>
                      {alimento.nome} <i className="fas fa-check" />
                    </span>
                  </a>
                ) : (
                  <a className="ativo" key={indice} href={`#${indice}`}>
                    <span>{alimento.nome}</span>
                  </a>
                )
              ) : dadosAlimentacao.tipoAlimentos[indice - 1].combinacoes
                  .length === 0 ? (
                <a className="inativo" key={indice} href={`#${indice}`}>
                  <span>{alimento.nome}</span>
                </a>
              ) : dadosAlimentacao.tipoAlimentos[indice].combinacoes.length >
                0 ? (
                <a className="passou" key={indice} href={`#${indice}`}>
                  <span>
                    {alimento.nome} <i className="fas fa-check" />
                  </span>
                </a>
              ) : (
                <a className="ativo" key={indice} href={`#${indice}`}>
                  <span>{alimento.nome}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="section-escolhas">
          <span className="titulo-card">Possibilidade</span>
          <div />
          <span className="titulo-card">Combinação</span>
          <div className="possibilidades" />

          <div className="funcoes">
            <a href="#0">
              <i className="fas fa-chevron-right" />
            </a>
            <a href="#1">
              <i className="fas fa-chevron-left" />
            </a>
          </div>

          <div className="combinacoes" />
        </div>
      </Fragment>
    );
  }
}

export default StepMatutino;
