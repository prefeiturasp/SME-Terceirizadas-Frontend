import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getDatasetsGraficosRelatorioSolicitacoesAlimentacao } from "services/relatorios.service";
import { GraficoSolicitacoesAutorizadasDRELote } from "./components/GraficoSolicitacoesAutorizadasDRELote";
import { Spin } from "antd";
import "./style.scss";

export const Graficos = ({ ...props }) => {
  const { values } = props;

  const [datasGraficos, setDatasGraficos] = useState(undefined);

  const getDatasetsGraficosRelatorioSolicitacoesAlimentacaoAsync = async (
    values
  ) => {
    const response = await getDatasetsGraficosRelatorioSolicitacoesAlimentacao(
      values
    );
    if (response.status === HTTP_STATUS.OK) {
      setDatasGraficos(response.data);
    }
  };

  useEffect(() => {
    getDatasetsGraficosRelatorioSolicitacoesAlimentacaoAsync(values);
  }, []);

  const graficoTotalPorDRELote = () => {
    return (
      datasGraficos &&
      datasGraficos.find((datagrafico) =>
        datagrafico.datasets.find((dataset) =>
          dataset.label.includes("por DRE e Lote")
        )
      )
    );
  };

  return (
    <div className="graficos-relatorio-ga text-center">
      <Spin tip="Carregando gráficos..." spinning={!datasGraficos}>
        {graficoTotalPorDRELote() && (
          <div className="row">
            <div className="col-12">
              <GraficoSolicitacoesAutorizadasDRELote
                chartData={graficoTotalPorDRELote()}
              />
            </div>
          </div>
        )}
      </Spin>
    </div>
  );
};
