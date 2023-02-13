import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getDashboardMedicaoInicial } from "services/medicaoInicial/dashboard.service";
import { CardMedicaoPorStatus } from "./components/CardMedicaoPorStatus";
import "./style.scss";
import { MEDICAO_CARD_NOME_POR_STATUS_DRE } from "./constants";
import { Spin } from "antd";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_ICON,
  BUTTON_STYLE,
  BUTTON_TYPE
} from "components/Shareable/Botao/constants";
import { Paginacao } from "components/Shareable/Paginacao";

export const AcompanhamentoDeLancamentos = () => {
  const [dadosDashboard, setDadosDashboard] = useState(null);
  const [statusSelecionado, setStatusSelecionado] = useState(null);
  const [resultados, setResultados] = useState(null);
  const [erroAPI, setErroAPI] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 10;

  const getDashboardMedicaoInicialAsync = async (params = null) => {
    const response = await getDashboardMedicaoInicial(params);
    if (response.status === HTTP_STATUS.OK) {
      setDadosDashboard(response.data.results);
      if (statusSelecionado) {
        setResultados(
          response.data.results.find(res => res.status === statusSelecionado)
        );
      }
    } else {
      setErroAPI(
        "Erro ao carregados dashboard de medição inicial. Tente novamente mais tarde."
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardMedicaoInicialAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageChanged = async page => {
    setLoading(true);
    const params = { limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE };
    setCurrentPage(page);
    await getDashboardMedicaoInicialAsync(params);
    setLoading(false);
  };

  return (
    <div className="acompanhamento-de-lancamentos">
      {erroAPI && <div>{erroAPI}</div>}
      <Spin tip="Carregando..." spinning={loading}>
        {!erroAPI && !loading && (
          <div className="card mt-3">
            <div className="card-body">
              <div className="d-flex">
                {dadosDashboard.map((dadosPorStatus, key) => {
                  return (
                    <CardMedicaoPorStatus
                      key={key}
                      dados={dadosPorStatus}
                      page={currentPage}
                      onPageChanged={onPageChanged}
                      setResultados={setResultados}
                      setStatusSelecionado={setStatusSelecionado}
                      total={dadosPorStatus.total}
                      classeCor={
                        dadosPorStatus.total
                          ? MEDICAO_CARD_NOME_POR_STATUS_DRE[
                              dadosPorStatus.status
                            ].cor
                          : "cinza"
                      }
                    >
                      {
                        MEDICAO_CARD_NOME_POR_STATUS_DRE[dadosPorStatus.status]
                          .nome
                      }
                    </CardMedicaoPorStatus>
                  );
                })}
              </div>
              <div className="text-center mt-3">
                Selecione os status acima para visualizar a listagem detalhada
              </div>
              <hr />
              {resultados && (
                <>
                  <table className="resultados">
                    <thead>
                      <tr className="row">
                        <th className="col-6">Nome da UE</th>
                        <th className="col-2 text-center">Status</th>
                        <th className="col-2 text-center">
                          Última atualização
                        </th>
                        <th className="col-2 text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resultados.dados.map((dado, key) => {
                        return (
                          <tr key={key} className="row">
                            <td className="col-6 pt-3">{dado.escola}</td>
                            <td className="col-2 text-center pt-3">
                              {dado.status}
                            </td>
                            <td className="col-2 text-center pt-3">
                              {dado.log_mais_recente}
                            </td>
                            <td className="col-2 text-center">
                              <Botao
                                type={BUTTON_TYPE.BUTTON}
                                style={`${
                                  BUTTON_STYLE.GREEN_OUTLINE
                                } no-border`}
                                icon={BUTTON_ICON.EYE}
                              />
                              <Botao
                                type={BUTTON_TYPE.BUTTON}
                                style={`${
                                  BUTTON_STYLE.GREEN_OUTLINE
                                } no-border`}
                                icon={BUTTON_ICON.DOWNLOAD}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Paginacao
                    onChange={page => onPageChanged(page)}
                    total={resultados.total}
                    pageSize={PAGE_SIZE}
                    current={currentPage}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </Spin>
    </div>
  );
};
