import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getInclusaoCEMEI } from "services/inclusaoDeAlimentacao";
import { CorpoRelatorio } from "./componentes/CorpoRelatorio";

export const RelatorioInclusaoDeAlimentacaoCEMEI = () => {
  const [, setUuid] = useState(null);
  const [solicitacao, setSolicitacao] = useState(null);

  const getInclusaoCEMEIAsync = async uuid_ => {
    const response = await getInclusaoCEMEI(uuid_);
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacao(response.data);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUuid(urlParams.get("uuid"));
    getInclusaoCEMEIAsync(urlParams.get("uuid"));
  }, []);

  return (
    <Spin tip="Carregando..." spinning={!solicitacao}>
      {solicitacao && (
        <div className="report">
          <span className="page-title">{`Inclusão de Alimentação - Solicitação # ${
            solicitacao.id_externo
          }`}</span>
          <div className="card mt-3">
            <div className="card-body">
              <CorpoRelatorio solicitacao={solicitacao} />
            </div>
          </div>
        </div>
      )}
    </Spin>
  );
};
