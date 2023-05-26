import React from "react";
import { FluxoDeStatus } from "components/Shareable/FluxoDeStatus";
import { fluxoMedicaoInicial } from "components/Shareable/FluxoDeStatus/helper";

export default ({ solicitacaoMedicaoInicial }) => {
  const logs = () => {
    if (solicitacaoMedicaoInicial && solicitacaoMedicaoInicial.logs.length) {
      if (
        solicitacaoMedicaoInicial.logs.find(
          log => log.status_evento_explicacao === "Aprovado pela DRE"
        )
      ) {
        return solicitacaoMedicaoInicial.logs.slice(1);
      }
      return solicitacaoMedicaoInicial.logs;
    } else {
      return fluxoMedicaoInicial;
    }
  };

  return (
    <>
      <div className="row mb-3">
        <div className="col-12">
          <b className="section-title">
            Progresso de validação das refeições informadas
          </b>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <FluxoDeStatus
            listaDeStatus={logs()}
            fluxo={fluxoMedicaoInicial}
            eh_medicao_inicial={true}
          />
        </div>
      </div>
    </>
  );
};
