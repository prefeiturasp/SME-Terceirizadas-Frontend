import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
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
import "./style.scss";
import { DashboardSupervisaoInterface } from "./interfaces";
import { FormApi } from "final-form";

export const PainelRelatorios = () => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState<FiltrosRelatoriosVisitasInterface>({});
  const [page, setPage] = useState<number>(1);
  const [totalResultados, setTotalResultados] = useState(0);
  const [consultaRealizada, setConsultaRealizada] = useState(false);
  const [relatoriosVisita, setRelatoriosVisita] = useState<
    RelatorioVisitaItemListagem[]
  >([]);
  const [dashboard, setDashboard] =
    useState<Array<DashboardSupervisaoInterface>>();
  const [statusSelecionado, setStatusSelecionado] = useState<string>("");

  const [carregandoTabela, setCarregandoTabela] = useState(false);
  const [form, setForm] = useState<FormApi>();

  const buscarResultados = async (
    filtros_: FiltrosRelatoriosVisitasInterface,
    pageNumber: number
  ) => {
    setCarregandoTabela(true);

    try {
      const params: URLSearchParams = gerarParametrosConsulta({
        page: pageNumber,
        ...filtros_,
      });
      const response = await listRelatoriosVisitaSupervisao(params);

      if (response.status === HTTP_STATUS.OK) {
        setRelatoriosVisita(response.data.results);
        setTotalResultados(response.data.count);
        setConsultaRealizada(true);
      }
    } finally {
      setCarregandoTabela(false);
    }
  };

  const getDashboardPainelGerencialSupervisaoAsync = async () => {
    const response = await getDashboardPainelGerencialSupervisao(filtros);
    if (response.status === HTTP_STATUS.OK) {
      setDashboard(response.data.results);
    }
  };

  const proximaPagina = (page: number) => {
    buscarResultados(filtros, page);
    setPage(page);
  };

  useEffect(() => {
    getDashboardPainelGerencialSupervisaoAsync();
  }, []);

  const goToFormularioSupervisao = (uuid) => {
    navigate(
      `/supervisao/terceirizadas/relatorio-fiscalizacao-terceirizadas/novo-relatorio-visitas/${uuid}/editar`,
      { state: { uuid: uuid } }
    );
  };

  return (
    <Spin tip="Carregando..." spinning={!dashboard}>
      <div className="card painel-acompanhamento-supervisao mt-3">
        <div className="card-body">
          {dashboard && (
            <>
              <div className="d-flex row row-cols-1">
                {dashboard.map((cardStatus, index) => {
                  return (
                    <CardPorStatus
                      cardStatus={cardStatus}
                      form={form}
                      key={index}
                      setConsultaRealizada={setConsultaRealizada}
                      setFiltros={setFiltros}
                      setPage={setPage}
                      setRelatoriosVisita={setRelatoriosVisita}
                      setStatusSelecionado={setStatusSelecionado}
                      statusSelecionado={statusSelecionado}
                    />
                  );
                })}
              </div>
              <div className="mt-3 text-center">
                Selecione um dos status acima para visualizar a listagem de
                relatórios
              </div>
              {statusSelecionado && (
                <Filtros
                  filtros={filtros}
                  setFiltros={setFiltros}
                  setRelatoriosVisita={setRelatoriosVisita}
                  setConsultaRealizada={setConsultaRealizada}
                  buscarResultados={buscarResultados}
                  form_={form}
                  setForm={setForm}
                />
              )}
              <Spin tip="Carregando..." spinning={carregandoTabela}>
                {consultaRealizada &&
                  (relatoriosVisita.length === 0 ? (
                    <div className="text-center mt-4 mb-4">
                      Nenhum resultado encontrado
                    </div>
                  ) : (
                    <>
                      <Listagem
                        objetos={relatoriosVisita}
                        handleEditAction={goToFormularioSupervisao}
                      />
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
              </Spin>
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
