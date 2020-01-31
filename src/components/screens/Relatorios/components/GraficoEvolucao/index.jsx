import React, { Component } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { TIPOS_SOLICITACAO_LISTA } from "../../../../../constants";
import { chartData, DATA_DEFAULT_SOLICITACAO, OPTIONS } from "../../constants";
import "./style.scss";

class GraficoEvolucao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      data: chartData(),
      legend: null
    };
  }

  componentDidMount() {
    this.props.getEvolucaoSolicitacoes().then(response => {
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
    const { graficoEvolucao, data } = this.state;
    return (
      <div className="evolution">
        {this.graficoEcolucao(data, graficoEvolucao)}
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
