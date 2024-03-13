import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { GraficoBarra } from "components/Shareable/Graficos/GraficoBarra";
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const GraficoSolicitacoesAutorizadasDRELote = ({ ...props }) => {
  const { chartData } = props;

  const plugin = {
    id: "increase-legend-spacing",
    beforeInit(chart: any) {
      const originalFit = chart.legend.fit;

      chart.legend.fit = function fit() {
        originalFit.bind(chart.legend)();
        this.height += 20;
      };
    },
  };

  return (
    <GraficoBarra chartData={chartData} plugins={[ChartDataLabels, plugin]} />
  );
};
