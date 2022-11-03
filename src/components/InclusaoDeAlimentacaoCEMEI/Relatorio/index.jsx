import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getInclusaoCEMEI } from "services/inclusaoDeAlimentacao";
import { CorpoRelatorio } from "./componentes/CorpoRelatorio";
import { getVinculosTipoAlimentacaoPorEscola } from "services/cadastroTipoAlimentacao.service";

export const RelatorioInclusaoDeAlimentacaoCEMEI = () => {
  const [, setUuid] = useState(null);
  const [solicitacao, setSolicitacao] = useState(null);
  const [vinculos, setVinculos] = useState(null);

  const getVinculosTipoAlimentacaoPorEscolaAsync = async escola => {
    const response = await getVinculosTipoAlimentacaoPorEscola(escola.uuid);
    if (response.status === HTTP_STATUS.OK) {
      setVinculos(response.data.results);
    }
  };

  const getInclusaoCEMEIAsync = async uuid_ => {
    const response = await getInclusaoCEMEI(uuid_);
    if (response.status === HTTP_STATUS.OK) {
      setSolicitacao(response.data);
      if (!vinculos) {
        getVinculosTipoAlimentacaoPorEscolaAsync(response.data.escola);
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUuid(urlParams.get("uuid"));
    getInclusaoCEMEIAsync(urlParams.get("uuid"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin tip="Carregando..." spinning={!solicitacao || !vinculos}>
      {solicitacao && vinculos && (
        <div className="report">
          <span className="page-title">{`Inclusão de Alimentação - Solicitação # ${
            solicitacao.id_externo
          }`}</span>
          <div className="card mt-3">
            <div className="card-body">
              <CorpoRelatorio solicitacao={solicitacao} vinculos={vinculos} />
            </div>
          </div>
        </div>
      )}
    </Spin>
  );
};
