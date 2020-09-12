import React, { Component } from "react";
import { Link } from "react-router-dom";

import Botao from "../../../Shareable/Botao";
import { BUTTON_STYLE, BUTTON_ICON } from "../../../Shareable/Botao/constants";

import "./Painel.scss";
import { TIPO_PERFIL } from "../../../../constants/shared";

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

const TabelaDietas = ({ solicitacoes }) => {
  if (solicitacoes === undefined || solicitacoes.length === 0) {
    return <div>Carregando...</div>;
  }
  const tipoPerfil = localStorage.getItem("tipo_perfil");
  return (
    <div className="row">
      <div className="col-12">
        <table className="table">
          <thead>
            <tr>
              {tipoPerfil === TIPO_PERFIL.DIETA_ESPECIAL ? (
                <th scope="col">DRE</th>
              ) : (
                ""
              )}
              {tipoPerfil !== TIPO_PERFIL.ESCOLA ? (
                <th scope="col">Unidade Escolar</th>
              ) : (
                ""
              )}
              <th scope="col">Cód. EOL</th>
              <th scope="col">Nome do Aluno</th>
              <th scope="col">Qtde Ativas</th>
              <th scope="col">Qtde Inativas</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {solicitacoes.map((dados, key) => {
              return (
                <tr key={key}>
                  {tipoPerfil === TIPO_PERFIL.DIETA_ESPECIAL ? (
                    <td>{dados.dre}</td>
                  ) : (
                    ""
                  )}
                  {tipoPerfil !== TIPO_PERFIL.ESCOLA ? (
                    <td>{dados.escola}</td>
                  ) : (
                    ""
                  )}
                  <td>{dados.codigo_eol}</td>
                  <td>{dados.nome}</td>
                  <td>{dados.ativas}</td>
                  <td>{dados.inativas}</td>
                  <td>
                    <Link
                      to={`/aluno/dieta-especial?codigo_eol=${
                        dados.codigo_eol
                      }`}
                    >
                      <Botao
                        texto="Visualizar"
                        icon={undefined}
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default class Painel extends Component {
  render() {
    const { dadosDietaPorAluno } = this.props;
    const { total_ativas, total_inativas, solicitacoes } = dadosDietaPorAluno;
    if (solicitacoes === undefined || solicitacoes.length === 0) {
      return <div>Não há dados para os filtros utilizados</div>;
    }
    return (
      <div className="card mt-3">
        <div className="card-body">
          <form>
            <CabecalhoPainel
              totalDietasAtivas={total_ativas}
              totalDietasInativas={total_inativas}
            />
            <hr />
            <div className="row">
              <div className="col-12">
                <p>Unidade Escolar</p>
                <p>000108 EMEF JOSÉ ERMIRIO DE MORAIS, SEN</p>
              </div>
            </div>
            <TabelaDietas solicitacoes={solicitacoes} />
          </form>
        </div>
      </div>
    );
  }
}
