import React from "react";

import { Filtros } from "../../types";

type Props = {
  filtros: Filtros;
};

export default (props: Props) => {
  const { filtros } = props;

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-start texto-simples-verde">
        <strong>Adesão das Alimentações Servidas</strong>
        {filtros && (
          <>
            <strong className="mx-2">-</strong>
            <strong className="text-dark">{filtros.mes}</strong>
            {filtros.dre && (
              <strong className="text-dark"> | {filtros.dre}</strong>
            )}
            {filtros.lotes && (
              <strong className="text-dark">
                {" "}
                | {filtros.lotes.join(", ")}
              </strong>
            )}
            {filtros.unidade_educacional && (
              <strong className="text-dark">
                {" "}
                | {filtros.unidade_educacional}
              </strong>
            )}
          </>
        )}
      </h2>
    </div>
  );
};
