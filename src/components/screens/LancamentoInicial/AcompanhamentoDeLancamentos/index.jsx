import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getDashboardMedicaoInicial } from "services/medicaoInicial/dashboard.service";
import { CardMedicaoPorStatus } from "./components/CardMedicaoPorStatus";
import "./style.scss";
import { MEDICAO_CARD_NOME_POR_STATUS_DRE } from "./constants";
import { Spin } from "antd";

export const AcompanhamentoDeLancamentos = () => {
  const [dadosDashboard, setDadosDashboard] = useState(null);
  const [erroAPI, setErroAPI] = useState("");
  const [loading, setLoading] = useState(true);

  const getDashboardMedicaoInicialAsync = async (params = null) => {
    const response = await getDashboardMedicaoInicial(params);
    if (response.status === HTTP_STATUS.OK) {
      setDadosDashboard(response.data.results);
    } else {
      setErroAPI(
        "Erro ao carregados dashboard de medição inicial. Tente novamente mais tarde."
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardMedicaoInicialAsync();
  }, []);

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
            </div>
          </div>
        )}
      </Spin>
    </div>
  );
};
