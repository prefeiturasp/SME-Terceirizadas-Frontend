import React from "react";

import TabelaResultadoPeriodo from "./components/TabelaResultadoPeriodo";
import { TotalAlimentacao } from "./components/TabelaResultadoPeriodo/types";

import { Props } from "./types";

export default (props: Props) => {
  const { filtros, resultado } = props;

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-start texto-simples-verde">
        <b>Adesão das Alimentações Servidas</b>
        {filtros && (
          <>
            <b className="mx-2">-</b>
            <b className="text-dark">{filtros.mes}</b>
            {filtros.dre && <b className="text-dark"> | {filtros.dre}</b>}
            {filtros.lotes && (
              <b className="text-dark"> | {filtros.lotes.join(", ")}</b>
            )}
            {filtros.unidade_educacional && (
              <b className="text-dark"> | {filtros.unidade_educacional}</b>
            )}
          </>
        )}
      </h2>
      {filtros && (
        <div>
          {Object.entries(resultado).map(([periodo, dados], index) => (
            <TabelaResultadoPeriodo
              className="mt-4"
              key={index}
              periodo={periodo}
              dados={Object.entries(dados).map(
                ([tipoAlimentacao, d]): TotalAlimentacao => ({
                  tipo_alimentacao: tipoAlimentacao,
                  total_servido: d.total_servido,
                  total_frequencia: d.total_frequencia,
                  total_adesao: d.total_adesao,
                })
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
