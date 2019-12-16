import React, { Component } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { TIPOS_SOLICITACAO_LISTA } from "../../../../constants/tiposSolicitacao.constants";
import {
  getEvolucaoSolicitacoes,
  getResumoTotaisPorMesEscola
} from "../../../../services/relatorios.service";
import { chartData, DATA_DEFAULT_SOLICITACAO, OPTIONS } from "../constants";
import "./style.scss";
import Botao from "../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_ICON,
  BUTTON_TYPE
} from "../../../Shareable/Botao/constants";

export const ICON_CARD_TYPE_ENUM = {
  CANCELADO: "fa-times-circle",
  PENDENTE: "fa-exclamation-triangle",
  AUTORIZADO: "fa-check",
  NEGADO: "fa-ban"
};

const TIPO_CARD = {
  CANCELADO: 0,
  PENDENTE: 1,
  AUTORIZADO: 2,
  NEGADO: 3
};

function CardTotalSolicitacaoPorStatus(props) {
  const { quantidade, quantidadeMesPassado, tipo } = props;
  let texto = "Autorizadas";
  let icon = ICON_CARD_TYPE_ENUM.AUTORIZADO;
  let cardClass = "";
  switch (tipo) {
    case TIPO_CARD.AUTORIZADO:
      texto = "Autorizadas";
      icon = ICON_CARD_TYPE_ENUM.AUTORIZADO;
      cardClass = "card-authorized";
      break;
    case TIPO_CARD.NEGADO:
      texto = "Negadas";
      icon = ICON_CARD_TYPE_ENUM.NEGADO;
      cardClass = "card-denied";
      break;
    case TIPO_CARD.PENDENTE:
      texto = "Pendentes de aprovação";
      icon = ICON_CARD_TYPE_ENUM.PENDENTE;
      cardClass = "card-pending";
      break;
    case TIPO_CARD.CANCELADO:
      texto = "Canceladas";
      icon = ICON_CARD_TYPE_ENUM.CANCELADO;
      cardClass = "card-cancelled";
      break;

    default:
      texto = "Autorizadas";
      icon = ICON_CARD_TYPE_ENUM.AUTORIZADO;
      break;
  }
  return (
    <section className="card-solicitacoes">
      <div className="header-card">
        <i className={`fas ${icon} ${cardClass}`} />{" "}
        <nav className="titulo-texto">{texto}</nav>{" "}
        <div className="bandeira">{quantidade - quantidadeMesPassado}</div>
      </div>
      <div className="fonte-grande">{quantidade} pedidos.</div>
      <a href="#" className="card-link alinha-centro">
        Ver mais
      </a>
    </section>
  );
}

class GraficoEvolucao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      data: chartData(),
      legend: null,
      totais_tipo_solicitacao: {
        total_autorizados: "...",
        total_cancelados: "...",
        total_negados: "...",
        total_pendentes: "...",
        total_autorizados_mes_passado: "...",
        total_negados_mes_passado: "...",
        total_cancelados_mes_passado: "...",
        total_pendentes_mes_passado: "..."
      }
    };
  }

  componentDidMount() {
    getResumoTotaisPorMesEscola().then(totais => {
      this.setState({ totais_tipo_solicitacao: totais.data });
    });

    getEvolucaoSolicitacoes().then(response => {
      const results = response.data.results;
      let dataSet = [];
      TIPOS_SOLICITACAO_LISTA.forEach(tipoSolicitacao => {
        if (results[tipoSolicitacao.titulo]) {
          const data = {
            label: tipoSolicitacao.titulo,
            backgroundColor: tipoSolicitacao.cor,
            borderColor: tipoSolicitacao.cor,
            pointBorderColor: tipoSolicitacao.cor,
            data: results[tipoSolicitacao.titulo].quantidades,
            pointHoverBackgroundColor: tipoSolicitacao.cor,
            pointHoverBorderColor: tipoSolicitacao.cor,
            ...DATA_DEFAULT_SOLICITACAO
          };
          dataSet.push(data);
        }
        this.setState({
          dataSet,
          data: chartData(dataSet),
          graficoEvolucao: results,
          legend: this.refs.chart.chartInstance.legend.legendItems
        });
      });
    });
  }

  render() {
    const { graficoEvolucao, data, totais_tipo_solicitacao } = this.state;
    return (
      <div className="evolution">
        <div className="card">
          <div className="row p-4">
            <div className="col-12">
              <p className="float-right">
                <Botao
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  texto={"Exportar Planilha"}
                  icon={BUTTON_ICON.FILE_PDF}
                  type={BUTTON_TYPE.BUTTON}
                />
                <Botao
                  className="ml-2"
                  style={BUTTON_STYLE.BLUE_OUTLINE}
                  icon={BUTTON_ICON.PRINT}
                  texto={"Imprimir"}
                  type={BUTTON_TYPE.BUTTON}
                />
              </p>
            </div>
            <div className="col-12">
              <p className="fonte-titulo">Solicitações por status</p>
            </div>
            <div className="col-4">
              <CardTotalSolicitacaoPorStatus
                quantidade={totais_tipo_solicitacao.total_autorizados}
                quantidadeMesPassado={
                  totais_tipo_solicitacao.total_autorizados_mes_passado
                }
                tipo={TIPO_CARD.AUTORIZADO}
              />
            </div>
            <div className="col-4">
              <CardTotalSolicitacaoPorStatus
                quantidade={totais_tipo_solicitacao.total_negados}
                quantidadeMesPassado={
                  totais_tipo_solicitacao.total_negados_mes_passado
                }
                tipo={TIPO_CARD.NEGADO}
              />
            </div>
            <div className="col-4">
              <CardTotalSolicitacaoPorStatus
                quantidade={totais_tipo_solicitacao.total_pendentes}
                quantidadeMesPassado={
                  totais_tipo_solicitacao.total_pendentes_mes_passado
                }
                tipo={TIPO_CARD.PENDENTE}
              />
            </div>
            <div className="col-4 pt-4">
              <CardTotalSolicitacaoPorStatus
                quantidade={totais_tipo_solicitacao.total_cancelados}
                quantidadeMesPassado={
                  totais_tipo_solicitacao.total_cancelados_mes_passado
                }
                tipo={TIPO_CARD.CANCELADO}
              />
            </div>
          </div>
          {this.graficoEcolucao(data, graficoEvolucao)}
        </div>
      </div>
    );
  }

  graficoEcolucao(data, graficoEvolucao) {
    return (
      <div className="card-body">
        <h2>Evolução das solicitações por tipo</h2>
        <div className="row graph-and-legend">
          <div className="col-8 graph">
            <LineChart
              data={data}
              ref="chart"
              options={OPTIONS}
              width="600"
              height="250"
            />
          </div>
          {graficoEvolucao && (
            <div className="col-4">
              {TIPOS_SOLICITACAO_LISTA.map(tipoSolicitacao => {
                return (
                  graficoEvolucao[tipoSolicitacao.titulo] && (
                    <div className="legend-unit">
                      <div className="title">
                        <div
                          className="circle"
                          style={{ backgroundColor: tipoSolicitacao.cor }}
                        />
                        <div>Total de {tipoSolicitacao.titulo}</div>
                      </div>
                      <div className="total">
                        {graficoEvolucao[tipoSolicitacao.titulo].total}
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          )}
          {graficoEvolucao && (
            <div className="row">
              <div className="col-8 legend">
                <div className="row">
                  {TIPOS_SOLICITACAO_LISTA.map(tipoSolicitacao => {
                    return (
                      graficoEvolucao[tipoSolicitacao.titulo] && (
                        <div className="col-4">
                          <div className="legend-unit">
                            <div className="title small">
                              <div
                                className="circle"
                                style={{
                                  backgroundColor: tipoSolicitacao.cor
                                }}
                              />
                              <div className="text">
                                {tipoSolicitacao.titulo}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default GraficoEvolucao;
