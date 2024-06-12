import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Spin } from "antd";

import { gerarParametrosConsulta } from "helpers/utilities";
import { listRelatoriosVisitaSupervisao } from "services/imr/relatorioFiscalizacaoTerceirizadas";
import { Paginacao } from "components/Shareable/Paginacao";

import { Filtros } from "./components/Filtros";
import {
  FiltrosRelatoriosVisitasInterface,
  RelatorioVisitaItemListagem,
} from "interfaces/imr.interface";
import { Listagem } from "./components/Listagem";
import { getDashboardPainelGerencialSupervisao } from "services/imr/painelGerencial";
import { CardPorStatus } from "./components/CardPorStatus";

export const PainelRelatorios = () => {
  const [carregando, setCarregando] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosRelatoriosVisitasInterface>({});
  const [page, setPage] = useState<number>(1);
  const [totalResultados, setTotalResultados] = useState(0);
  const [consultaRealizada, setConsultaRealizada] = useState(false);
  const [relatoriosVisita, setRelatoriosVisita] = useState<
    RelatorioVisitaItemListagem[]
  >([]);
  const [dashboard, setDashboard] =
    useState<Array<{ status: string; label: string; total: number }>>();

  const buscarResultados = async (pageNumber: number) => {
    setCarregando(true);

    try {
      const params: URLSearchParams = gerarParametrosConsulta({
        page: pageNumber,
        ...filtros,
      });
      const response = await listRelatoriosVisitaSupervisao(params);

      if (response.status === HTTP_STATUS.OK) {
        setRelatoriosVisita(response.data.results);
        setTotalResultados(response.data.count);
        setConsultaRealizada(true);
      }
    } finally {
      setCarregando(false);
    }
  };

  const getDashboardPainelGerencialSupervisaoAsync = async () => {
    const response = await getDashboardPainelGerencialSupervisao(filtros);
    if (response.status === HTTP_STATUS.OK) {
      setDashboard(response.data.results);
    }
  };

  const proximaPagina = (page: number) => {
    buscarResultados(page);
    setPage(page);
  };

  useEffect(() => {
    buscarResultados(1);
    setPage(1);
    getDashboardPainelGerencialSupervisaoAsync();
  }, [filtros]);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-documentos-recebimento">
        <div className="card-body documentos-recebimento">
          <div className="d-flex row row-cols-1">
            {dashboard &&
              dashboard.map((cardStatus, index) => {
                return <CardPorStatus cardStatus={cardStatus} key={index} />;
              })}
          </div>
          <Filtros
            setFiltros={setFiltros}
            setRelatoriosVisita={setRelatoriosVisita}
            setConsultaRealizada={setConsultaRealizada}
          />
          {consultaRealizada &&
            (relatoriosVisita.length === 0 ? (
              <div className="text-center mt-4 mb-4">
                Nenhum resultado encontrado
              </div>
            ) : (
              <>
                <Listagem objetos={relatoriosVisita} />
                <div className="row">
                  <div className="col">
                    <Paginacao
                      current={page}
                      total={totalResultados}
                      onChange={proximaPagina}
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
