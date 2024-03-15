import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { GraficoBarra } from "./components/GraficoBarra";
import { Filtros } from "./components/Filtros";
import dresAPI from "./mock/filtros/dres.json";
import escolasAPI from "./mock/filtros/escolas.json";
import tiposGestaoAPI from "./mock/filtros/tipos_de_gestao.json";
import tiposUnidadeAPI from "./mock/filtros/tipos_unidade.json";
import { CORES } from "./constants.js";
import { api } from "./mock/api";
import { Spin } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

type ResponseDREs = {
  results: {
    id: number;
    dre: string;
  }[];
};

type ResponseEscolas = {
  results: {
    id: number;
    unidade_educacional: string;
  }[];
};

type ResponseTiposGestao = {
  results: {
    id: number;
    tipo_gestao: string;
  }[];
};

type ResponseTiposUnidade = {
  results: {
    id: number;
    tipo_unidade: string;
  }[];
};

type TypeFIltros = {
  tipo_gestao?: string;
  tipo_unidade?: string[];
  dre?: string;
  unidade_educacional?: string;
};

type ChartData =
  | {
      labels: string[];
      datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
      }[];
    }
  | {};

export function RelatorioDietasAutorizadas() {
  const [chartData, setChartData] = useState<ChartData>({});
  const [dres, setDres] = useState([]);
  const [escolas, setEscolas] = useState([]);
  const [tiposGestao, setTiposGestao] = useState([]);
  const [tiposUnidade, setTiposUnidade] = useState([]);
  const [filtros, setFiltros] = useState<TypeFIltros>({});

  const getDres = () => {
    const response = (dresAPI as ResponseDREs).results;
    setDres(response);
  };

  const getEscolas = () => {
    const response = (escolasAPI as ResponseEscolas).results;
    setEscolas(response);
  };

  const getTiposGestao = () => {
    const response = (tiposGestaoAPI as ResponseTiposGestao).results;
    setTiposGestao(response);
  };

  const getTiposUnidade = () => {
    const response = (tiposUnidadeAPI as ResponseTiposUnidade).results;
    setTiposUnidade(response);
  };

  const getChartData = async () => {
    setChartData({});
    const { data } = await api(filtros);

    let dataLength = 0;

    const datasets = data.map((dre, index) => {
      if (dataLength < dre.datasets.length) {
        dataLength = dre.datasets.length;
      }

      return {
        label: dre.titulo,
        data: dre.datasets.map((item) => item.total_dietas),
        maxBarThickness: 80,
        backgroundColor: CORES[index],
      };
    });

    const [labels] = data.map((data) => data.datasets.map((item) => item.dre));

    const labelsGreatherThanZero = labels.filter((_, index) => {
      return datasets.some((dataset) => dataset.data[index] > 0);
    });

    const datasetsGreatherThanZero = datasets.map((dataset) => {
      return {
        ...dataset,
        data: dataset.data.filter((value) => value > 0),
      };
    });

    setChartData({
      labels: labelsGreatherThanZero,
      datasets: datasetsGreatherThanZero,
    });
  };

  useEffect(() => {
    getDres();
    getEscolas();
    getTiposGestao();
    getTiposUnidade();
  }, []);

  useEffect(() => {
    getChartData();
  }, [filtros]);

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

  const temChartData = "labels" in chartData;

  return (
    <div className="card mt-3">
      <div className="card-body">
        <Filtros
          onSubmit={async (values) => {
            setFiltros(values);
          }}
          onClear={() => {
            setFiltros({});
          }}
          dres={dres}
          escolas={escolas}
          tiposGestao={tiposGestao}
          tiposUnidade={tiposUnidade}
        />

        <div className="py-5">
          <Spin tip="Carregando..." spinning={!temChartData}>
            {temChartData ? (
              <GraficoBarra
                chartData={chartData}
                plugins={[ChartDataLabels, plugin]}
              />
            ) : null}
          </Spin>
        </div>
      </div>
    </div>
  );
}
