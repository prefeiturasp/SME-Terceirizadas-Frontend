import React, { Component } from "react";

import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_ICON } from "../../../Shareable/Botao/constants";

import { Paginacao } from "../../../Shareable/Paginacao";

import "./Painel.scss";

const CabecalhoPainel = ({ totalDietasAtivas, totalDietasInativas }) => (
  <div className="row cabecalho-painel">
    <div className="col-4">
      <i className="fas fa-check-circle" />
      <span>Total de Dietas Ativas: {totalDietasAtivas}</span>
    </div>
    <div className="col-4">
      <i className="fas fa-times-circle" />
      <span>Total de Dietas Inativas: {totalDietasInativas}</span>
    </div>
    <div className="col-4">
      <Botao
        texto="Imprimir"
        icon={BUTTON_ICON.PRINT}
        style={BUTTON_STYLE.BLUE_OUTLINE}
      />
    </div>
  </div>
);

const TabelaDietas = () => (
  <div className="row">
    <div className="col-12">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Código EOL</th>
            <th scope="col">Nome do Aluno</th>
            <th scope="col">Qtde. Ativas</th>
            <th scope="col">Qtde. Inativas</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>094633</td>
            <td>Ricardo Albuquerque de Oliveira Prado</td>
            <td>3</td>
            <td>2</td>
            <td>
              <Botao
                texto="Visualizar"
                icon={undefined}
                style={BUTTON_STYLE.GREEN_OUTLINE}
              />
            </td>
          </tr>
          <tr>
            <td>094633</td>
            <td>Ricardo Albuquerque de Oliveira Prado</td>
            <td>3</td>
            <td>2</td>
            <td>
              <Botao
                texto="Visualizar"
                icon={undefined}
                style={BUTTON_STYLE.GREEN_OUTLINE}
              />
            </td>
          </tr>
          <tr>
            <td>094633</td>
            <td>Ricardo Albuquerque de Oliveira Prado</td>
            <td>3</td>
            <td>2</td>
            <td>
              <Botao
                texto="Visualizar"
                icon={undefined}
                style={BUTTON_STYLE.GREEN_OUTLINE}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default class Painel extends Component {
  render() {
    const { totalDietasAtivas, totalDietasInativas, count } = this.props;
    return (
      <div className="card mt-3">
        <div className="card-body">
          <form>
            <CabecalhoPainel
              totalDietasAtivas={totalDietasAtivas}
              totalDietasInativas={totalDietasInativas}
            />
            <hr />
            <div className="row">
              <div className="col-12">
                <p>Unidade Escolar</p>
                <p>000108 EMEF JOSÉ ERMIRIO DE MORAIS, SEN</p>
              </div>
            </div>
            <TabelaDietas />
            <Paginacao total={count} />
          </form>
        </div>
      </div>
    );
  }
}
