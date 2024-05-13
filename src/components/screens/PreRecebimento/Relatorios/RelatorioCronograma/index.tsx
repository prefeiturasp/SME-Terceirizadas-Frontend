import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Filtros from "./components/Filtros";
import { CronogramaRelatorio, FiltrosRelatorioCronograma } from "./interfaces";
import { gerarParametrosConsulta } from "helpers/utilities";
import {
  getListagemRelatorioCronogramas,
  baixarRelatorioCronogramasExcel,
} from "../../../../../services/cronograma.service.js";
import { Paginacao } from "components/Shareable/Paginacao";
import Listagem from "./components/Listagem";
import "./styles.scss";
import moment from "moment";

import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE,
} from "components/Shareable/Botao/constants";
import { toastError } from "components/Shareable/Toast/dialogs";
import ModalSolicitacaoDownload from "components/Shareable/ModalSolicitacaoDownload";

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
  const [totalizadores, setTotalizadores] = useState<Record<string, number>>();
  const [enviandoArquivo, setEnviandoArquivo] = useState(false);
  const [exibirModalCentralDownloads, setExibirModalCentralDownloads] =
    useState(false);

  const buscarResultados = async (page) => {
    setCarregando(true);
    const params = gerarParametrosConsulta({ page: page, ...filtros });
    const response = await getListagemRelatorioCronogramas(params);
    setAtivos([]);
    if (response.data.count) {
      setCronogramas(response.data.results);
      setTotalizadores({
        Total: response.data.count,
        ...response.data.totalizadores,
      });
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

  const baixarRelatorioExcel = async () => {
    setEnviandoArquivo(true);

    try {
      const params = gerarParametrosConsulta(filtros);
      const response = await baixarRelatorioCronogramasExcel(params);

      if (response.status === 200) {
        setExibirModalCentralDownloads(true);
      } else {
        toastError("Erro ao exportar xlsx. Tente novamente mais tarde.");
      }
    } finally {
      setEnviandoArquivo(false);
    }
  };

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-relatorio-cronograma">
        <div className="card-body relatorio-cronograma">
          <Filtros
            setFiltros={setFiltros}
            setCarregando={setCarregando}
            setCronogramas={setCronogramas}
            setConsultaRealizada={setConsultaRealizada}
          />

          {consultaRealizada && (
            <>
              {totalizadores && (
                <div className="row mt-4">
                  <div className="col-12 titulo-cards">
                    TOTAL DE CRONOGRAMAS DE ENTREGAS - ATÉ{" "}
                    {moment(new Date()).format("DD/MM/YYYY")}
                  </div>
                  {Object.keys(totalizadores).map((totalizador, key) => {
                    return (
                      <div key={key} className="col-4 mt-3">
                        <div className="totalizador ps-3 pe-3">
                          <div className="d-flex justify-content-between">
                            <div className="titulo">{totalizador}</div>
                            <div className="valor">
                              {totalizadores[totalizador]}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {cronogramas.length === 0 ? (
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
                  <div className="row mt-4 mb-2">
                    <div className="col p-0">
                      <Botao
                        texto="Baixar em Excel"
                        style={BUTTON_STYLE.GREEN_OUTLINE}
                        icon={BUTTON_ICON.FILE_EXCEL}
                        type={BUTTON_TYPE.BUTTON}
                        disabled={enviandoArquivo}
                        onClick={baixarRelatorioExcel}
                        className="float-end"
                      />
                      {exibirModalCentralDownloads && (
                        <ModalSolicitacaoDownload
                          show={exibirModalCentralDownloads}
                          setShow={setExibirModalCentralDownloads}
                        />
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Spin>
  );
};
