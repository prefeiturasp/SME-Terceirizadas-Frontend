import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Filtros from "./components/Filtros";
import { CronogramaRelatorio, FiltrosRelatorioCronograma } from "./interfaces";
import { gerarParametrosConsulta } from "helpers/utilities";
import { getListagemRelatorioCronogramas } from "../../../../../services/cronograma.service.js";
import { Paginacao } from "components/Shareable/Paginacao";
import Listagem from "./components/Listagem";

export default () => {
  const [carregando, setCarregando] = useState<boolean>(false);
  const [filtros, setFiltros] = useState<FiltrosRelatorioCronograma>();
  const [page, setPage] = useState<number>(1);
  const [totalResultados, setTotalResultados] = useState<number>(0);
  const [consultaRealizada, setConsultaRealizada] = useState<boolean>(false);
  const [ativos, setAtivos] = useState<string[]>([]);
  const [cronogramas, setCronogramas] = useState<Array<CronogramaRelatorio>>(
    []
  );

  const buscarResultados = async (page) => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getListagemRelatorioCronogramas(params);
    setAtivos([]);
    if (response.data.count) {
      setCronogramas(response.data.results);
      setTotalResultados(response.data.count);
      setConsultaRealizada(true);
    } else {
      setTotalResultados(response.data.count);
      setCronogramas([]);
    }
    setCarregando(false);
  };

  const nextPage = (page: number) => {
    buscarResultados(page);
    setPage(page);
  };

  useEffect(() => {
    if (filtros) {
      buscarResultados(1);
      setPage(1);
    }
  }, [filtros]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-relatorio-cronograma">
        <div className="card-body relatorio-cronograma">
          <Filtros
            setFiltros={setFiltros}
            setCronogramas={setCronogramas}
            setConsultaRealizada={setConsultaRealizada}
          />
          {consultaRealizada &&
            (cronogramas.length === 0 ? (
              <div className="text-center mt-4 mb-4">
                Nenhum resultado encontrado
              </div>
            ) : (
              <>
                <Listagem
                  objetos={cronogramas}
                  ativos={ativos}
                  setAtivos={setAtivos}
                />
                <div className="row">
                  <div className="col">
                    <Paginacao
                      current={page}
                      total={totalResultados}
                      onChange={nextPage}
                    />
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </Spin>
  );
};
