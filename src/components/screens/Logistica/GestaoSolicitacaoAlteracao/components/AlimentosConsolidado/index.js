import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { getConsolidadoAlimentos } from "services/logistica.service";
import TabelaAlimentoConsolidado from "components/Logistica/TabelaAlimentoConsolidado";

export default ({ solicitacao }) => {
  const [alimentosConsolidado, setAlimentosConsolidado] = useState();

  const getAlimentos = () => {
    getConsolidadoAlimentos(solicitacao.requisicao.uuid).then(res => {
      setAlimentosConsolidado(res.data);
    });
  };

  useEffect(() => {
    if (!alimentosConsolidado) {
      getAlimentos();
    }
  }, []);

  return (
    <>
      <div className="text-center">
        <Spin tip="Carregando alimentos..." spinning={!alimentosConsolidado} />
      </div>
      {alimentosConsolidado && (
        <TabelaAlimentoConsolidado
          className="table-sm"
          alimentosConsolidado={alimentosConsolidado}
        />
      )}
    </>
  );
};
