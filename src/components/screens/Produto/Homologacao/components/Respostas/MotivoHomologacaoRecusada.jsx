import React from "react";
import * as R from "ramda";

export const MotivoHomologacaoRecusada = ({ logs }) => {
  const getRecusa = (logs) => {
    const arr = R.filter(
      R.propEq("status_evento_explicacao", "CODAE não homologou"),
      logs
    );
    return arr[0];
  };

  const recusa = getRecusa(logs);

  return (
    <div className="row">
      <div className="col-12">
        <label className="col-form-label ">{`Motivo da recusa de homologação (Data: ${
          recusa.criado_em.split(" ")[0]
        })`}</label>
      </div>
      <div className="col-12">
        <p
          className="justificativa-ficha-produto no-margin"
          dangerouslySetInnerHTML={{
            __html: recusa.justificativa,
          }}
        />
      </div>
      <div className="col-12">
        <hr />
      </div>
    </div>
  );
};
export default MotivoHomologacaoRecusada;
