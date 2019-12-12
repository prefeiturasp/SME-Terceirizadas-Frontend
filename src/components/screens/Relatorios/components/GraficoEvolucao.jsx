import React, { Component } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { TIPOS_SOLICITACAO_LISTA } from "../../../../constants/tiposSolicitacao.constants";
import {
  getEvolucaoSolicitacoes,
  getResumoTotaisPorMesEscola
} from "../../../../services/relatorios.service";
import { chartData, DATA_DEFAULT_SOLICITACAO, OPTIONS } from "../constants";
import "./style.scss";

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
  const { quantidade, tipo } = props;
  let texto = "Autorizadas";
  let icon = ICON_CARD_TYPE_ENUM.AUTORIZADO;
  let color = "";
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

    default:
      texto = "Autorizadas";
      icon = ICON_CARD_TYPE_ENUM.AUTORIZADO;
      break;
  }
  return (
    <div className={`card col-4 ${cardClass}`}>
      <div className="card-body">
        <div className="row">
          <i className={`fas ${icon} ${color}`} />
          <p className="ml-2">{texto}</p>
        </div>

        <p className="card-text fonte-grande">{quantidade} pedidos.</p>
        <a href="#" className="card-link alinha-centro">
          Ver mais
        </a>
      </div>
    </div>
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
        total_pendentes: "..."
      }
    };
  }

  componentDidMount() {
    getResumoTotaisPorMesEscola().then(totais => {
      console.log(totais);
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
          <CardTotalSolicitacaoPorStatus
            quantidade={totais_tipo_solicitacao.total_autorizados}
            tipo={TIPO_CARD.AUTORIZADO}
          />
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
