import React from "react";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";
import {
  fluxoDietaEspecialPartindoEscola,
  formatarFluxoDietaEspecial
} from "components/Shareable/FluxoDeStatus/helper";

const FluxoDeStatusDieta = ({ logs, eh_importado = false }) => {
  return (
    <div className="row mb-3">
      <div className="col-12">
        <FluxoDeStatus
          listaDeStatus={logs}
          fluxo={
            logs.find(
              log =>
                log.status_evento_explicacao === "Escola solicitou inativação"
            ) !== undefined
              ? formatarFluxoDietaEspecial()
              : fluxoDietaEspecialPartindoEscola
          }
          eh_importado={eh_importado}
        />
      </div>
    </div>
  );
};

export default FluxoDeStatusDieta;
