import React, { Component } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { reduxForm } from "redux-form";
import { LABELS, DATA_DEFAULT_SOLICITACAO } from "./constants";
import { getEvolucaoSolicitacoes } from "../../../services/relatorios.service";
import { TIPOS_SOLICITACAO_LISTA } from "../../../constants/tiposSolicitacao.constants";
import "./style.scss";
import { mesInteiro, anoCorrente } from "./helper";

function chartData(dataset) {
  return {
    labels: LABELS,
    graficoEvolucao: null,
    datasets: dataset || []
  };
}

const options = {
  scaleShowGridLines: true,
  scaleGridLineColor: "rgba(0,0,0,.05)",
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: true,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#273142",
    displayColors: false,
    callbacks: {
      title: function(tooltipItem, data) {
        return (
          mesInteiro(data["labels"][tooltipItem[0]["index"]]) +
          " de " +
          anoCorrente()
        );
      }
    }
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: "rgba(0, 0, 0, 0)"
        },
        ticks: {
          fontStyle: "bold",
          fontColor: "#000"
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          color: "rgba(0, 0, 0, 0)"
        },
        ticks: {
          fontStyle: "bold",
          fontColor: "#000"
        }
      }
    ]
  }
};

class Relatorios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      data: chartData(),
      legend: null
    };
  }

  componentDidMount() {
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
    const { data, graficoEvolucao } = this.state;
    return (
      <div className="evolution">
        <div className="card">
          <div className="card-body">
            <h2>Evolução das solicitações por tipo</h2>
            <div className="row graph-and-legend">
              <div className="col-8 graph">
                <LineChart
                  data={data}
                  ref="chart"
                  options={options}
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
        </div>
      </div>
    );
  }
}

const RelatoriosForm = reduxForm({
  form: "relatorios",
  enableReinitialize: true
})(Relatorios);

export default RelatoriosForm;
