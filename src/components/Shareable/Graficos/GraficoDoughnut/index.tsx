import React from "react";
import { Doughnut } from "react-chartjs-2";

export const GraficoDoughnut = ({ chartData, plugins }) => {
  return (
    <div className="mt-2">
      <Doughnut
        data={chartData}
        plugins={plugins}
        options={{
          layout: {
            padding: 20,
          },
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
